import React from 'react'

interface PokemonData {
    id: number
    name: string
    height: number
    weight: number
    types: {
        slot: number
        type: {
        name: string
        url: string
        }
    }[]
    sprites: {
        front_default: string
    }
}

interface PokemonListProps {
    pokemonFiltered: PokemonData[]
    lastElementRef: (node: HTMLElement | null) => void
}

const PokemonList: React.FC<PokemonListProps> = ({pokemonFiltered, lastElementRef}) => {
  return (
    <>
        {
          pokemonFiltered && pokemonFiltered.sort((a, b) => a.id - b.id).map((data, index) => (
            <li
              ref={index === pokemonFiltered.length - 1 ? lastElementRef : null}
              key={data.name}
              className='card'
            >
              <div className='pokemon-id'>#{data.id}</div>
              <picture>
                <img src={data.sprites.front_default} alt={data.name} />
              </picture>
              <div className='types'>
                {
                  data.types.map((type) => (
                    <div className={`type ${type.type.name}`}>{type.type.name}</div>
                  )
              )}
              </div>
              <section className='details'>
                <div><p>Name: </p><p>{data.name}</p></div>
                <div><p>Height: </p><p>{data.height}</p></div>
                <div><p>Weight: </p><p>{data.weight}</p></div>
              </section>
            </li>
          )) 
        }
    </>
  )}

export default PokemonList