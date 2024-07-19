import React from 'react'
import pokeball from '../assets/img/pokemon_loading.gif'

const Loading = () => {
  return (
    <img
        src={pokeball}
        alt='loading'
        className='loading-image'
    />
  )
}

export default Loading