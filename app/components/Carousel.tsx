interface CarouselProps {
  images: string[]
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <div className='carousel ml-6 mr-6 h-60'>
      {images.map((imageUri, index) => (
        <div
          id={`slide${index + 1}`}
          key={index}
          className={`carousel-item relative w-full`}
        >
          <img src={imageUri} alt={`Slide ${index + 1}`} className='w-full' />
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a
              href={`#slide${index === 0 ? images.length : index}`}
              className='btn btn-circle'
            >
              ❮
            </a>
            <a
              href={`#slide${index === images.length - 1 ? 1 : index + 2}`}
              className='btn btn-circle'
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Carousel
