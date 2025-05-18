"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Leaf, ShoppingCart, Truck } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState(searchParams.get("role") || "farmer")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step < 3) {
      setStep(step + 1)
      return
    }

    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-agro-accent/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>Join AgroConnect to connect with farmers, buyers, and transporters</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-4">
                  <Label>I am a:</Label>
                  <RadioGroup value={userType} onValueChange={setUserType} className="grid grid-cols-3 gap-4">
                    <Label
                      htmlFor="farmer"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-green-400 "
                    >
                      <RadioGroupItem value="farmer" id="farmer" className="sr-only" />
                      <Leaf className="mb-3 h-6 w-6" />
                      <span className="text-center text-sm font-medium">Farmer</span>
                    </Label>
                    <Label
                      htmlFor="buyer"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-green-400 "
                    >
                      <RadioGroupItem value="buyer" id="buyer" className="sr-only" />
                      <ShoppingCart className="mb-3 h-6 w-6" />
                      <span className="text-center text-sm font-medium">Buyer</span>
                    </Label>
                    <Label
                      htmlFor="transporter"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-green-400 "
                    >
                      <RadioGroupItem value="transporter" id="transporter" className="sr-only" />
                      <Truck className="mb-3 h-6 w-6" />
                      <span className="text-center text-sm font-medium">Transporter</span>
                    </Label>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" required />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Farm Road" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Farmville" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input id="zip" placeholder="12345" required />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                {userType === "farmer" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="farm-name">Farm Name</Label>
                      <Input id="farm-name" placeholder="Green Acres Farm" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="farm-size">Farm Size (acres)</Label>
                      <Input id="farm-size" type="number" placeholder="100" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="crops">Primary Crops (comma separated)</Label>
                      <Input id="crops" placeholder="Corn, Wheat, Soybeans" required />
                    </div>
                  </>
                )}

                {userType === "buyer" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" placeholder="FoodCorp Inc." required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business-type">Business Type</Label>
                      <Input id="business-type" placeholder="Food Processing" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="purchase-interests">Purchase Interests (comma separated)</Label>
                      <Input id="purchase-interests" placeholder="Grains, Vegetables, Fruits" required />
                    </div>
                  </>
                )}

                {userType === "transporter" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" placeholder="FastHaul Logistics" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicle-types">Vehicle Types (comma separated)</Label>
                      <Input id="vehicle-types" placeholder="Truck, Van, Refrigerated" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service-area">Service Area (radius in km)</Label>
                      <Input id="service-area" type="number" placeholder="50" required />
                    </div>
                  </>
                )}
              </>
            )}

            <Button type="submit" className="w-full bg-green-800 hover:bg-green-700/90" disabled={isLoading}>
              {step < 3 ? "Continue" : isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-agro-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          <div className="flex gap-1">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-2 w-2 rounded-full ${s === step ? "bg-agro-primary" : "bg-gray-300"}`} />
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
