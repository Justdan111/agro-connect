import { Loader2 } from "lucide-react"

export default function CreateListingLoading() {
  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg font-medium">Loading form...</p>
      </div>
    </div>
  )
}
