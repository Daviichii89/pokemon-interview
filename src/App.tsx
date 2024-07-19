import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import PokemonList from './components/PokemonList'
import FilterNav from './components/FilterNav'
import Loading from './components/Loading'

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
  const [pokemonFiltered, setPokemonFiltered] = useState<PokemonData[]>([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [filterType, setFilterType] = useState<string>('')
  const observer = useRef<IntersectionObserver | null>(null)
  useEffect(() => {
    setLoading(true)
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`)
      .then((response) => response.json())
      .then((data) => setPokemons(data.results))
  }, [offset])
  useEffect(() => {
    setTimeout(() => {
      pokemons.forEach((pokemon) => {
        fetch(pokemon.url)
          .then((response) => response.json())
          .then((poke) => {
            setPokemonData(prevData => {
              const newData = [...prevData, poke]
              setPokemonFiltered(
                filterType
                  ? newData.filter((data) =>
                    data.types.some((t:any) => t.type.name === filterType)
                  )
                  : newData
              )
              return newData
            })
          })
          .finally(() => setLoading(false))
      })
    }, 500)
  }, [pokemons, filterType])
  const loadMore = useCallback(() => {
    if (!loading) {
      setOffset(prevOffset => prevOffset + 10)
    }
  }, [loading])
  const lastElementRef = useCallback((node: any) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    })
    if (node) observer.current.observe(node)
  }
  , [loading, loadMore])
  const filterPokemonByType = (type: string) => {
    setFilterType(type);
  }
  return (
    <div className='main-container'>
      <h1>Pokemon</h1>
      <FilterNav 
        filterPokemonByType={filterPokemonByType}
        setPokemonFiltered={setPokemonFiltered}
        pokemonData={pokemonData}
      />
      <ul className='container'>
        <PokemonList pokemonFiltered={pokemonFiltered} lastElementRef={lastElementRef} />
      </ul>
      {loading && <Loading />}
    </div>
  )
}

export default App
