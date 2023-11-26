interface PriceProps {
  price: number
}

const Price: React.FC<PriceProps> = ({ price }) => {
  return (
    <div className='stat'>
      <div className='stat-title'>Predicted price</div>
      <div className='stat-value text-orange-400'>$ {price}</div>
    </div>
  )
}

export default Price
