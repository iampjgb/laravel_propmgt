import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Building2, MapPin, Phone, Mail, Globe, Users, Home, DollarSign } from "lucide-react"
// import type { SharedData } from '@/types'


interface Property {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  totalUnits: number;
  occupiedUnits: number;
  monthlyRevenue?: number;
  code: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  telephone?: string;
  sec_no?: string;
  hlurb_no?: string;
  rdo?: string;
  tin_no?: string;
}

interface PropertyOverviewProps {
  property: Property | null
}

export function PropertyOverview({ property }: PropertyOverviewProps) {
  if (!property) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Property Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {property.name}
          </CardTitle>
          <CardDescription>Property Information</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{property.address || "No address provided"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{property.phone || "No phone provided"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{property.email || "No email provided"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>{property.website || "No website provided"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{property.totalUnits || 0}</div>
            <p className="text-xs text-muted-foreground">
              {property.occupiedUnits || 0} units occupied
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {property.totalUnits && property.occupiedUnits
                ? `${Math.round((property.occupiedUnits / property.totalUnits) * 100)}%`
                : "0%"}
            </div>
            <p className="text-xs text-muted-foreground">
              Current occupancy rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${property.monthlyRevenue?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Total monthly revenue
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Profiling Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Profiling: {property.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div><strong>Code:</strong> {property.code}</div>
            <div><strong>Address 1:</strong> {property.address1}</div>
            <div><strong>Address 2:</strong> {property.address2 || '-'}</div>
            <div><strong>City:</strong> {property.city}</div>
            <div><strong>Province:</strong> {property.province}</div>
            <div><strong>Country:</strong> {property.country}</div>
            <div><strong>Telephone:</strong> {property.telephone || '-'}</div>
            <div><strong>Website:</strong> {property.website || '-'}</div>
            <div><strong>SEC No.:</strong> {property.sec_no || '-'}</div>
            <div><strong>HLURB No.:</strong> {property.hlurb_no || '-'}</div>
            <div><strong>RDO:</strong> {property.rdo || '-'}</div>
            <div><strong>TIN No.:</strong> {property.tin_no || '-'}</div>
          </div>
        </CardContent>
      </Card>

      {/* Add more sections as needed */}
    </div>
  )
}