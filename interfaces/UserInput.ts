import { PropertyType } from '@/enums/PropertyType.enum'

export interface UserInput {
  street: string
  zipcode: number
  m2: number
  city: string
  state: string
  country: string
  propertyType: PropertyType
  garageSpaces?: number
  yearBuilt?: number
  tone: 'professional'
  images: string[]
}
