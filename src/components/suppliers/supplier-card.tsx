import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, MapPin, Phone, Star } from "lucide-react"
import type { Supplier } from "@/types/supplier"

interface SupplierCardProps {
  supplier: Supplier
}

export function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={supplier.image || "/placeholder.svg"}
            alt={supplier.name}
            width={100}
            height={100}
            className="rounded-full border-4 border-white shadow-md"
          />
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              {supplier.name}
              {supplier.verified && (
                <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                  <Check className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1 text-gray-500" />
              {supplier.location}
            </CardDescription>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 font-medium">{supplier.rating}</span>
            <span className="ml-1 text-sm text-gray-500">({supplier.reviews})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1">
          {supplier.specialties.map((specialty, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-100">
              {specialty}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{supplier.description}</p>

        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
            <span className="text-gray-500">Products</span>
            <span className="font-medium">{supplier.products}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
            <span className="text-gray-500">Delivery</span>
            <span className="font-medium">{supplier.deliveryTime}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
            <span className="text-gray-500">Min Order</span>
            <span className="font-medium">{supplier.minOrder}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Phone className="h-4 w-4 mr-2" />
          Contact
        </Button>
        <Button size="sm">View Products</Button>
      </CardFooter>
    </Card>
  )
}
