import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

function App() {
  const API_ID = "38515c6b";
  const API_KEY = "58870541d04873b2cf9f2591c86a6c08";

  const [allRecipe, setRecipe] = useState([]);
  const[search,setSearch]=useState("");
  const [query, setQuery]=useState('chicken');
  useEffect(() => {
    getRecipe();
  }, [query]);

  const getRecipe = async () => {
    const getData = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`
    );
    const finalData = await getData.json();
    setRecipe(finalData.hits);
    
  };
  const updateSearch = e =>{
    setSearch(e.target.value)
  };
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };
  return (
    <div className="App">
    <h4 className="text-center mt-5">Search For Recipe</h4>
      <form onSubmit={getSearch} className="form">
        <input type="text" className="input" value={search} onChange={updateSearch}></input>
        <button type="submit" className="search">Search</button>
      </form>
      <h4 className="text-center mt-5 mb-3">Recipe List</h4>
      <div className="d-flex justify-content-around flex-wrap">
      {allRecipe.map((r) => (
        <Recipe
          key={r.recipe.label}
          title={r.recipe.label}
          label={r.recipe.label}
          calory={r.recipe.calories}
          image={r.recipe.image}
          ingredients={r.recipe.ingredients}
          url={r.recipe.url}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
