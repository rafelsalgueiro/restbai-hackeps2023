'use client'
import { centralAPI } from '@/api/centralAPI'
import Carousel from '@/app/components/Carousel'
import CustomMap from '@/app/components/CustomMap'
import HouseInformation from '@/app/components/HouseInformation'
import Price from '@/app/components/Price'
import Chart from '@/app/components/chart'
import { PropertyType } from '@/enums/PropertyType.enum'
import { UserInput } from '@/interfaces/UserInput'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Results({
  params,
}: {
  params: { uuid: string; userInput: UserInput }
}) {
  if (!params.uuid || !params.userInput) {
    return <div>Invalid parameters</div>
  }

  const [loading, setLoading] = useState(true)
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [score, setScore] = useState(0)
  const [bathrooms, setBathrooms] = useState(0)
  const [addressString, setAddress] = useState(
    `${params.userInput.street}, ${params.userInput.city}, ${params.userInput.country} ${params.userInput.zipcode}`
  )

  useEffect(() => {
    const fetchData = async () => {
      const imageUris = params.userInput.images.map(
        (elem) => `${process.env.PUBLIC_URL}${elem}`
      )
      params.userInput.images = imageUris
      console.log(params.userInput.images)
      console.log(process.env.PUBLIC_URL)
      const userInput: UserInput = {
        ...params.userInput,
        images: imageUris,
      }
      const result = await centralAPI(userInput)
      console.log(result)

      if (result?.price) {
        setPrice(result.price)
      }
      let description = ''
      if (result?.descriptions[0]?.description) {
        description += result.descriptions[0].description
      }
      if (result?.descriptions[1]?.description) {
        description += result.descriptions[1].description
      }
      if (result?.descriptions[2]?.description) {
        description += result.descriptions[2].description
      }
      if (result?.descriptions[3]?.description) {
        description += result.descriptions[3].description
      }
      if (result?.descriptions[4]?.description) {
        description += result.descriptions[4].description
      }
      if (result?.descriptions[5]?.description) {
        description += result.descriptions[5].description
      }
      setDescription(description)
      if (result?.images_info?.r1r6?.property?.score) {
        setScore(result.images_info.r1r6.property.score)
      }
      if (result?.images_info?.r1r6?.summary?.count?.bathrooms) {
        setBathrooms(result.images_info.r1r6.summary.count.bathrooms)
      }

      setLoading(false)
    }
    setLoading(true)
    fetchData()
  }, [])

  return (
    <div className='flex align-middle justify-center mt-20 ml-20 mr-20 mb-20'>
      <div className='card w-2/4 bg-base-100 shadow-xl'>
        <div className='card-title'>Your automatic generated ad</div>
        <div className='card-body'>
          <Carousel images={params.userInput.images} />
          {loading && (
            <span className='loading loading-spinner loading-lg'>
              Generating ad
            </span>
          )}
          {!loading && (
            <div>
              <div className='flex flex-row items-center'>
                <div className='stats shadow'>
                  <Price price={price} />
                  <HouseInformation
                    squareFeet={params.userInput.squareFeets}
                    garageSpaces={params.userInput.garageSpaces!}
                    score={score}
                    bathrooms={bathrooms}
                  />
                </div>
              </div>
              <p>Description</p>
              <p className='text-xl text-left'>
                {description ? description : 'Error generating description'}
              </p>
              <Chart address={addressString} />
              <CustomMap address={addressString} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
