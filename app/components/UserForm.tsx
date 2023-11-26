'use client'

import React, { useState } from 'react'
import { UserInput } from '@/interfaces/UserInput'
import { PropertyType } from '@/enums/PropertyType.enum'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface UserFormProps {
  setUserUuidGlobal: React.Dispatch<React.SetStateAction<string | undefined>>
  setUserInputGlobal: React.Dispatch<
    React.SetStateAction<UserInput | undefined>
  >
}

const UserForm: React.FC<UserFormProps> = ({
  setUserUuidGlobal,
  setUserInputGlobal,
}) => {
  const router = useRouter()

  // State to handle the user uuid
  const [userUuid, setUserUuid] = useState('')

  // Loading state
  const [loading, setLoading] = useState(false)

  // State to handle the images upload
  const [images, setImages] = useState<File[]>([])

  // State to handle the form inputs
  const [userInput, setUserInput] = useState<UserInput>({
    city: '',
    country: '',
    images: [],
    squareFeets: -1,
    propertyType: PropertyType.apartment,
    state: '',
    street: '',
    zipcode: -1,
    garageSpaces: -1,
    yearBuilt: -1,
  })

  // State to check for form errors
  const [formErrors, setFormErrors] = useState({
    houseImages: false,
    street: false,
    zipcode: false,
    city: false,
    state: false,
    country: false,
    propertyType: false,
    garageSpaces: false,
  })

  // State to check the interacted form fields
  const [touchedFields, setTouchedFields] = useState({
    images: false,
    street: false,
    zipcode: false,
    city: false,
    state: false,
    country: false,
    propertyType: true,
    garageSpaces: false,
  })

  // Function to handle the form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // Check for errors
    const hasErrors = Object.values(formErrors).some((error) => error)

    const allFieldsTouched = Object.values(touchedFields).every(
      (touched) => touched
    )

    // if (hasErrors || !allFieldsTouched) {
    //   console.log(touchedFields)
    //   alert('Please fill in all required values')
    //   return
    // }

    setLoading(true)

    const formData = new FormData()
    images.forEach((image) => {
      formData.append('files', image)
    })

    const imagesUrls = await axios.post(
      'http://localhost:5000/images',
      formData
    )

    const userUuid = imagesUrls.data[0].split('/')[0]
    setUserUuid(userUuid)
    setUserUuidGlobal(userUuid)
    setUserInputGlobal(userInput)
    setLoading(false)
  }

  const handleImageChange = (value: FileList | null) => {
    if (value) {
      const _files = Array.from(value)
      setImages(_files)
    }

    setTouchedFields((prevTouchedFields) => ({
      ...prevTouchedFields,
      images: true,
    }))
  }

  const handleInputChange = (
    field: keyof UserInput,
    value: string | FileList
  ) => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [field]: value,
    }))

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: value === '' || value === null,
    }))

    setTouchedFields((prevTouchedFields) => ({
      ...prevTouchedFields,
      [field]: true,
    }))
  }

  const propertyTypeOptions = Object.values(PropertyType).filter(
    (value) => typeof value === 'string'
  )

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full mt-4'>
      <label className='mb-4 flex justify-between items-center'>
        Upload house images:
        <input
          type='file'
          accept='image/jpg, image/jpeg, image/png'
          multiple
          className='file-input file-input-bordered w-full max-w-xs'
          onChange={(e) => handleImageChange(e.target.files)}
        />
        {formErrors.houseImages && (
          <span className='text-error-500'>Please upload images</span>
        )}
      </label>

      <label className='mb-4 flex justify-between items-center'>
        House street:
        <input
          type='text'
          placeholder='Street'
          className='input input-bordered w-full max-w-xs'
          onChange={(e) => handleInputChange('street', e.target.value)}
        />
        {formErrors.street && (
          <span className='text-error-500'>Please input house street</span>
        )}
      </label>

      <label className='mb-4 flex justify-between items-center'>
        House Zip Code:
        <input
          type='number'
          placeholder='Zip code'
          className='input input-bordered w-full max-w-xs'
          onChange={(e) => handleInputChange('zipcode', e.target.value)}
        />
        {formErrors.zipcode && (
          <span className='text-error-500'>Please input house zip code</span>
        )}
      </label>

      <label className='mb-4 flex justify-between items-center'>
        House city:
        <input
          type='text'
          placeholder='City'
          className='input input-bordered w-full max-w-xs'
          onChange={(e) => handleInputChange('city', e.target.value)}
        />
        {formErrors.city && (
          <span className='text-error-500'>Please input house city</span>
        )}
      </label>

      <label className='mb-4 flex justify-between items-center'>
        House state:
        <input
          type='text'
          placeholder='State'
          className='input input-bordered w-full max-w-xs'
          onChange={(e) => handleInputChange('state', e.target.value)}
        />
        {formErrors.state && (
          <span className='text-error-500'>Please input house state</span>
        )}
      </label>

      <label className='mb-4 flex justify-between items-center'>
        House country:
        <input
          type='text'
          placeholder='Country'
          className='input input-bordered w-full max-w-xs'
          onChange={(e) => handleInputChange('country', e.target.value)}
        />
        {formErrors.country && (
          <span className='text-error-500'>Please input house country</span>
        )}
      </label>

      <label className='mb-4 flex justify-between items-center'>
        Property type:
        <select
          className='select select-bordered w-full max-w-xs'
          value={userInput.propertyType}
          onChange={(e) => handleInputChange('propertyType', e.target.value)}
        >
          {propertyTypeOptions.map((propertyType) => (
            <option key={propertyType} value={propertyType}>
              {propertyType}
            </option>
          ))}
        </select>
        {formErrors.propertyType && (
          <span className='text-error-500'>Please input property type</span>
        )}
      </label>

      <label className='mb-4 flex justify-between items-center'>
        House garage spaces:
        <input
          type='number'
          placeholder='Garage spaces'
          className='input input-bordered w-full max-w-xs'
          onChange={(e) => handleInputChange('garageSpaces', e.target.value)}
        />
        {formErrors.garageSpaces && (
          <span className='text-error-500'>
            Please input house garage spaces
          </span>
        )}
      </label>

      <button
        type='submit'
        className='btn bg-orange-400 text-xl'
        disabled={loading}
      >
        Submit
      </button>
      {loading && (
        <div className='card-actions grid justify-center mt-6'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      )}
    </form>
  )
}

export default UserForm
