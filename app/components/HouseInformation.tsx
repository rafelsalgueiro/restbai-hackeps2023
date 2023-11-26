interface HouseInformationProps {
  squareFeet: number
  garageSpaces: number
  score: number
  bathrooms: number
}

const HouseInformation: React.FC<HouseInformationProps> = ({
  squareFeet,
  garageSpaces,
  score,
  bathrooms,
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
    </div>
  )
}

export default HouseInformation
