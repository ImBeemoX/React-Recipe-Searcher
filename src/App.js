import React, { useEffect, useState} from 'react';
import Recipe from './Recipe'
import './App.css';

const App = () => {

  const APP_ID = "55810db7"
  const APP_KEY = "3b759bf9832b2e2f2e72d827ea4b26ff"

  const [search, setSearch] = useState("")
  const [recipes, setRecpies] = useState([])
  const [query, setQuery] = useState('chicken')

  useEffect(() =>{getRecipes()}, [query])

  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    setRecpies(data.hits)
 }

  const getSearch = e => {
      e.preventDefault()
      setQuery(search)
      setSearch("")
  }
  
  return(
      <div className="App">
        <form onSubmit={getSearch} className="search-form">
          <input className="search-bar" type="text" value={search} onChange={(newValue) => {setSearch(newValue.target.value)}}/>
         <button className="search-button" type="submit">Search</button>
        </form>
      <div className="recipes">
      {recipes.map(recipe => (
         <Recipe key={recipe.recipe.label} title={recipe.recipe.label}
          calories={recipe.recipe.calories} image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />
       ))}
      </div>
      </div>
  )
}

export default App;
