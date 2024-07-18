import { useEffect, useState } from 'react'
import './App.css'

interface Pokemons {
  name: string
  url: string
}

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

function App() {
  const [pokemons, setPokemons] = useState<Pokemons[]>([])
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then((response) => response.json())
      .then((data) => setPokemons(data.results))
  }, [])
  useEffect(() => {
    pokemons.map((pokemon) => {
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((poke) => setPokemonData(pokemonData => [...pokemonData, poke]))
    })
  }, [pokemons])
  return (
    <>
      <h1>Pokemon</h1>
      <h2>List of Pokemons</h2>
      <header>
        Filter: 
        <button 
          className="button grass" 
          onClick={() => setPokemonData([])}
        >
          Grass
        </button>
        <button 
          className="button fire" 
          onClick={() => setPokemonData([])}
        >
          Fire
        </button>
        <button 
          className="button water" 
          onClick={() => setPokemonData([])}
        >
          Water
        </button>
      </header>
      <ul className='container'>
        {
          pokemonData && pokemonData.sort((a, b) => a.id - b.id).map((data) => (
            <li key={data.name} className='card'>
              <picture>
                <img src={data.sprites.front_default} alt={data.name} />
              </picture>
              <section>
                <p>Name: {data.name}</p>
                <p>Height: {data.height}</p>
                <p>Weight: {data.weight}</p>
                <p>Types: {data.types.map((type) => type.type.name).join(', ')}</p>
              </section>
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default App
