"use client";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <div>
      <main>
        <Button onClick={() => console.log("Hello World!")}>
          Aixo com va?
        </Button>
      </main>
    </div>
  );
}
