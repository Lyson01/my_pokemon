import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pokedex from "../src/components/pokedexjsx/Pokedex";
import Propokemonov from "../src/components/pokedexjsx/Propokemonov";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokedex/:id" element={<Propokemonov />} />
      </Routes>
    </Router>
  );
}

export default App;
