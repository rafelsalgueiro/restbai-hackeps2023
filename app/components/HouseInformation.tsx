interface HouseInformationProps {
  squareFeet: number
  garageSpaces: number
  score: number
  bathrooms: number
  bedrooms: number
  kitchens: number
}

const HouseInformation: React.FC<HouseInformationProps> = ({
  squareFeet,
  garageSpaces,
  score,
  bathrooms,
  bedrooms,
  kitchens,
}) => {
  return (
    <div className='flex flex-row'>
      <div className='stat'>
        <div className='stat-title'>Square feet</div>
        <div className='stat-value'>{squareFeet}</div>
      </div>

      <div className='stat'>
        <div className='stat-title'>Garage spaces</div>
        <div className='stat-value'>{garageSpaces}</div>
      </div>

      <div className='stat'>
        <div className='stat-title'>Score</div>
        <div className='stat-value'>{score}</div>
      </div>

      <div className='stat'>
        <div className='stat-title'>Bathroom number</div>
        <div className='stat-value'>{bathrooms}</div>
      </div>

      <div className='stat'>
        <div className='stat-title'>Bedroom number</div>
        <div className='stat-value'>{bedrooms}</div>
      </div>

      <div className='stat'>
        <div className='stat-title'>Kitchen number</div>
        <div className='stat-value'>{kitchens}</div>
      </div>
    </div>
  )
}

export default HouseInformation
