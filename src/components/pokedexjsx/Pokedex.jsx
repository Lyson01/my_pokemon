import React, { useState, useEffect, container} from "react";
import axios from "axios";
import { Pagination, Spin, Empty } from "antd";
import "../style/Pokedex.css";
import { Link } from "react-router-dom";

const Pokedex = () => {
  const [pokedexList, setPokedexList] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    const offset = (page - 1) * 10;
    const limit = 6;

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
      .then(async (response) => {
        const updatedPokedexList = await Promise.all(
          response.data.results.map(async (pokedex) => {
            const pokedexResponse = await axios.get(pokedex.url);
            return pokedexResponse.data;
          })
        );

        const filteredPokedexList = updatedPokedexList.filter((pokedex) =>
          pokedex.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setPokedexList(filteredPokedexList);
        setNextPageUrl(response.data.next);
        setLoading(false);
      });
  }, [page, searchTerm]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getPokemonImage = (pokedex) => {
    if (pokedex.sprites.other.dream_world.front_default) {
      return pokedex.sprites.other.dream_world.front_default;
    } else if (pokedex.sprites.other["dream_world"].front_default) {
      return pokedex.sprites.other["dream_world"].front_default;
    } else {
      return "fallback-image-url.jpg";
    }
  };

  return (
    <container>
      <header>
        <div className="container">
          <div className="pokemon-search">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
              alt=""
            />
            <input
              placeholder="Search Pokemon"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn">Search</button>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="pokemon-cards">
            {loading ? (
              <div className="loading-spinner">
                <Spin size="large" />
              </div>
            ) : pokedexList.length > 0 ? (
              pokedexList.map((pokedex, index) => (
                <Link to={`/pokedex/${pokedex.id}`}>
                  <div className="pokemon-card" key={index}>
                    <div>
                      <h3>{pokedex.name}</h3>
                      <div>
                        {pokedex.types.map((t, index) => (
                          <button key={index}>{t.type.name}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <img src={getPokemonImage(pokedex)} alt="" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <Empty className="empty-antd" description="No Pokemon" />
            )}
          </div>

          {pokedexList.length > 0 && (
             <div className="planning">
              <Pagination
               current={page}
               total={300}
               pageSize={5}
               onChange={handlePageChange}
              />
            </div> 
          )}
        </div>
      </main>
    </container>
  );
};

export default Pokedex;
