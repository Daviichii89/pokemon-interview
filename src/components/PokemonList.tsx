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
}

const PokemonList: React.FC<PokemonListProps> = ({pokemonFiltered}) => {
  return (
    <>
        {
          pokemonFiltered && pokemonFiltered.sort((a, b) => a.id - b.id).map((data) => (
            <li key={data.name} className='card'>
              <picture>
                <img src={data.sprites.front_default} alt={data.name} />
                <p>{data.types.map((type) => type.type.name).join(' ')}</p>
              </picture>
              <section>
                <p>Name: {data.name}</p>
                <p>Height: {data.height}</p>
                <p>Weight: {data.weight}</p>
              </section>
            </li>
          ))
        }
    </>
  )}

export default PokemonList