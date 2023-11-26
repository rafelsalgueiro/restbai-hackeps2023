'use client'

import UserForm from '@/app/components/UserForm'
import { UserInput } from '@/interfaces/UserInput'
import { useState } from 'react'
import Results from './results/[uuid]/page'

export default function Home() {
  // State for storing the user uuid and the user input
  const [userUuid, setUserUuid] = useState<string | undefined>()
  const [userInput, setUserInput] = useState<UserInput>()

  return (
    <div>
      {!userUuid && !userInput && (
        <div className='flex flex-col items-center justify-center h-screen'>
          <h1 className='grid justify-center text-4xl font-bold mb-8'>
            ReAI Estate 2.0
          </h1>
          <h2 className='grid justify-center text-2xl font-normal mb-6'>
            Automatically generate your Real Estate advertisement
          </h2>

          <div className='card w-100 bg-primary-500 shadow-xl'>
            <div className='card-body'>
              <h3 className='text-xl'>
                Fill in the form below to generate your advertisement.
              </h3>
              <UserForm
                setUserUuidGlobal={setUserUuid}
                setUserInputGlobal={setUserInput}
              />
            </div>
          </div>
        </div>
      )}
      {userUuid && userInput && (
        <Results params={{ uuid: userUuid, userInput: userInput }} />
      )}
    </div>
  )
}
