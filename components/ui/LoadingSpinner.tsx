import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SpinnerContainer = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
  display: inline-block;
  width: ${props => {
    switch (props.size) {
      case 'small': return '16px'
      case 'large': return '48px'
      default: return '32px'
    }
  }};
  height: ${props => {
    switch (props.size) {
      case 'small': return '16px'
      case 'large': return '48px'
      default: return '32px'
    }
  }};
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 10px;
`

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  message?: string
  fullPage?: boolean
}

export default function LoadingSpinner({ 
  size = 'medium', 
  message,
  fullPage = false
}: LoadingSpinnerProps) {
  const content = (
    <LoadingContainer>
      <SpinnerContainer size={size} />
      {message && <p>{message}</p>}
    </LoadingContainer>
  )

  if (fullPage) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {content}
      </div>
    )
  }

  return content
}