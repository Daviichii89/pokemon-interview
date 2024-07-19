import pokeball from '../assets/img/pokemon_loading.gif'

const Loading = () => {
  return (
    <>
      <h1>Loading...</h1>
      <img
          src={pokeball}
          alt='loading'
          className='loading-image'
      />
    </>
  )
}

export default Loading