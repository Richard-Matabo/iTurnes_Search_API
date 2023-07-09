import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Searchbar from "./Components/Searchbar";
import SearchResults from "./Components/searchresults";
import FavouriteList from "./Components/favourites";
import Axios from "axios";

let arrFavourites = [];
  const App = () => {
  const [searchterm, setSearchterm] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchCriteria, setsearchCriteria] = useState();
  const [update, setUpdate] = useState();

  const searchTermChange = (e) => {
    setSearchterm(e.target.value);
    console.log(searchterm);
  };

  const removeItem = (event) => {
    let arrFavourites = JSON.parse(sessionStorage.getItem("favourites"));
      setUpdate(Math.random());
    let removeIndex = Number(event.target.value);
    arrFavourites = arrFavourites.filter((item, index) => {
      return item.trackId !== removeIndex;
    });

    setFavourites(arrFavourites);
    localStorage.setItem("favourites", JSON.stringify(arrFavourites));
  };

  const getsearchCriteria = (event) => {
    setsearchCriteria(event.target.value);
    
  };
   
  const getResults = async () => {
    await Axios.get("/search/", {
      params: { term: searchterm, entity: searchCriteria },
    }).then(async function (response) {
      await setSearchResults(response.data);
    });
  };

    const addFavourite = (event) => {
        setUpdate(Math.random()); 
    let index = Number(event.target.value);
    arrFavourites.push(searchResults[index]);
    if (sessionStorage.getItem("favourites") === null) {
      sessionStorage.setItem("favourites", JSON.stringify(arrFavourites));
    } else {
      sessionStorage.setItem("favourites", JSON.stringify(arrFavourites));
      setFavourites(arrFavourites);     
    }
  };

  useEffect(() => {
    setsearchCriteria("all");
  }, []);

  return (
    <div className="App">
      <h1> iTunes Search API </h1>
      <hr /><br />
      <Searchbar
        initialValue={searchCriteria}
        criteria={getsearchCriteria}
        getResults={getResults}
        search={searchTermChange}
      />
      <SearchResults addFavourite={addFavourite} results={searchResults} />
      <section>
        <h2> Favourite List</h2>
              <FavouriteList
          remove={removeItem}
          favourites={favourites}
          update={update}
        />
      </section>
    </div>
  );
};

export default App;