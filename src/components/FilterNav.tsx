import React from 'react'

interface FilterNavProps {
    filterPokemonByType: (type: string) => void
    setPokemonFiltered: (data: any) => void
    pokemonData: any
}

const FilterNav: React.FC<FilterNavProps> = ({filterPokemonByType, setPokemonFiltered, pokemonData}) => {
  return (
    <header className='nav'>
        <span className='filter-text'>Filter:</span>
        <section>

          <button 
            className="button grass" 
            onClick={() => filterPokemonByType('grass')}
          >
            Grass
          </button>
          <button 
            className="button fire" 
            onClick={() => filterPokemonByType('fire')}
          >
            Fire
          </button>
          <button 
            className="button water" 
            onClick={() => filterPokemonByType('water')}
          >
            Water
          </button>
          <button
            className="button all"
            onClick={() => setPokemonFiltered(pokemonData)}
          >
            All
          </button>
        </section>
      </header>
  )
}

export default FilterNav