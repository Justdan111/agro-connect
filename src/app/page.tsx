import { redirect } from "next/navigation"

export default function Home() {
  redirect("/dashboard/farmer") // Redirect to the farmer dashboard
}

