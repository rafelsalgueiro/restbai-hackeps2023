import { PropertyType } from '@/enums/PropertyType.enum'
import { PropertyTypeApi } from '@/enums/PropertyTypeApi.enum'

export interface UserInput {
  street: string
  zipcode: number
  squareFeets: number
  city: string
  state: string
  country: string
  propertyType: PropertyType
  propertyTypeApi: PropertyTypeApi
  garageSpaces?: number
  yearBuilt?: number
  images: string[]
}
