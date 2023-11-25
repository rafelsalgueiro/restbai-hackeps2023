import { PropertyType } from '@/enums/PropertyType.enum'

export interface UserInput {
  street: string
  zipcode: number
  squareFeets: number
  city: string
  state: string
  country: string
  propertyType: PropertyType
  garageSpaces?: number
  yearBuilt?: number
  images: FileList[]
}
