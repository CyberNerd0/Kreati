import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LandingPage
})

function LandingPage() {
  return (
    <div>
      this is the landing page
    </div>
  )
}
