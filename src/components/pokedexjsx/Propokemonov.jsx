import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Spin, Tabs } from "antd";

import "../style/Propokemonov.css";

const Propokemonov = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    id: "",
    name: "",
    statsName: [],
    statsRes: [],
    types: [],
    moves: [],
    abilities: [],
    height: "",
    weight: "",
    exp: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const pokedexData = response.data;

        const statsName = pokedexData.stats.map((stat) => stat.stat.name);
        const statsRes = pokedexData.stats.map((stat) => stat.base_stat);
        const types = pokedexData.types.map((type) => type.type.name);
        const moves = pokedexData.moves.map((move) => move.move.name);
        const abilities = pokedexData.abilities.map(
          (ability) => ability.ability.name
        );

        setData({
          id: pokedexData.id,
          name: pokedexData.name,
          statsName,
          statsRes,
          types,
          moves,
          abilities,
          height: pokedexData.height,
          weight: pokedexData.weight,
          exp: pokedexData.base_experience,
          image: getPokemonImage(pokedexData),
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
    <section className="pokemon-about">
      {loading ? (
        <div className="loading-spinner-about">
          <Spin size="large" />
        </div>
      ) : (
        <div className="about-pokemon-cards">
          <div className="about-pokemon-card-left">
            <div className="about-left container">
              <img src={data.image} alt={data.name} />
              <h2>{data.name}</h2>
              <Link to="/">
                <h4>Back Home</h4>
              </Link>
            </div>
          </div>
          <div className="pokemon_character">
            <Tabs defaultActiveKey="1">
              <div tab="Pokemon Character">
                <span className="stats">
                  Stats Name:</span> 
                  
                  {data.statsName.join(", ")} <br />
                
                <span className="types"><br />
                  Types: </span> 
                  
                  {data.types.join(", ")} <br />
                  
                <span className="moves"><br />
                  Moves: </span> 
                  
                  {data.moves.join(", ")} <br />
                 
                <span className="abilities"><br />
                  Abilities: </span> 
                  
                  {data.abilities.join(", ")} <br />
                  
                <span className="stats_res"> <br />
                Stats Res: </span> 
                
                {data.statsRes.join(", ")}
                   <br />
                
              </div>

            </Tabs>
          </div>
        </div>
      )}
      
    </section>
  );
};

export default Propokemonov;
