import { NextRequest, NextResponse } from 'next/server'

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  uptime: number
  version: string
  services: {
    strapi: 'up' | 'down' | 'unknown'
    database: 'up' | 'down' | 'unknown'
  }
  memory: {
    used: number
    total: number
    percentage: number
  }
}

async function checkStrapiHealth(): Promise<'up' | 'down' | 'unknown'> {
  try {
    const strapiBaseUrl = process.env.STRAPI_BASE_URL
    if (!strapiBaseUrl) return 'unknown'

    const response = await fetch(`${strapiBaseUrl}/_health`, {
      method: 'HEAD',
      timeout: 5000,
    } as any)

    return response.ok ? 'up' : 'down'
  } catch {
    return 'down'
  }
}

function getMemoryUsage() {
  if (typeof process !== 'undefined' && process.memoryUsage) {
    const usage = process.memoryUsage()
    const total = usage.heapTotal
    const used = usage.heapUsed
    return {
      used: Math.round(used / 1024 / 1024), // MB
      total: Math.round(total / 1024 / 1024), // MB
      percentage: Math.round((used / total) * 100)
    }
  }
  return { used: 0, total: 0, percentage: 0 }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest): Promise<NextResponse<HealthStatus>> {
  const startTime = Date.now()
  
  try {
    // Check Strapi health
    const strapiStatus = await checkStrapiHealth()
    
    // Get memory usage
    const memory = getMemoryUsage()
    
    // Calculate uptime (approximate)
    const uptime = process.uptime ? process.uptime() : 0
    
    // Determine overall health
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy'
    
    if (strapiStatus === 'down') {
      status = 'degraded'
    }
    
    if (memory.percentage > 90) {
      status = status === 'degraded' ? 'unhealthy' : 'degraded'
    }

    const healthStatus: HealthStatus = {
      status,
      timestamp: new Date().toISOString(),
      uptime: Math.round(uptime),
      version: process.env.npm_package_version || '1.0.0',
      services: {
        strapi: strapiStatus,
        database: strapiStatus, // Since we're using Strapi's database
      },
      memory,
    }

    const responseTime = Date.now() - startTime
    
    return NextResponse.json(healthStatus, {
      status: status === 'unhealthy' ? 503 : 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Response-Time': `${responseTime}ms`,
      },
    })
  } catch (error) {
    console.error('Health check error:', error)
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: 0,
      version: '1.0.0',
      services: {
        strapi: 'unknown',
        database: 'unknown',
      },
      memory: { used: 0, total: 0, percentage: 0 },
    }, {
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  }
}