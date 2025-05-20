"use client"

import type React from "react"
import { useRef } from "react"
import { Upload, X } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface ImageUploadProps {
  urls: string[]
  onChange: (urls: string[]) => void
  maxFiles: number
  className?: string
  defaultImage?: string
}

export function ImageUpload({ urls, onChange, maxFiles, className = "" }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    if (files.length + urls.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} images allowed`)
      return
    }

    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        onChange([...urls, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveImage = (index: number) => {
    const newUrls = urls.filter((_, i) => i !== index)
    onChange(newUrls)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {urls.map((url, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={url} 
              alt={`Image ${index + 1}`} 
              className="w-full h-full object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        
        {urls.length < maxFiles && (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center aspect-square border-2 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <Upload className="w-8 h-8 mb-2 text-gray-500" />
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Upload image</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {maxFiles - urls.length} remaining
              </p>
            </div>
          </label>
        )}
      </div>

      <input
        type="file"
        id="image-upload"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        multiple
      />
    </div>
  )
}