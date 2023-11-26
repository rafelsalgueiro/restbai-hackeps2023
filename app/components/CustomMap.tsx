import { useState } from 'react'

interface MapProps {
  address: string
}

const CustomMap: React.FC<MapProps> = ({ address }) => {
  const [placeId, setPlaceId] = useState('')
  const [loading, setLoading] = useState(true)

  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setPlaceId(data.results[0].place_id)
      setLoading(false)
    })

  return (
    <div>
      {loading && <span className='loading loading-spinner loading-lg'></span>}
      {!loading && (
        <iframe
          width='100%'
          height='450'
          frameBorder='0'
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=place_id:${placeId}`}
          allowFullScreen
        ></iframe>
      )}
    </div>
  )
}

export default CustomMap
