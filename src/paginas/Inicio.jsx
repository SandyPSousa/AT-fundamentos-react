import React, { useEffect, useState } from "react";
import HotelCard from "./components/hotel-card";
import EditHotelForm from "./components/edit-hotel.jsx";
import { listarHoteis, deletarHotel } from "../controller.jsx";
import "./components/hotel-card.css";
import "./Inicio.css";
import Formulario from "../form.jsx";

export default function Inicio() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [render, setRender] = useState(0);
  
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme";
    localStorage.setItem("theme", JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  useEffect(() => {
    const resposta = listarHoteis();
    if (resposta.sucesso) {
      const dados = resposta.dados.map((hotel) => ({
        ...hotel,
        isFavorito: JSON.parse(localStorage.getItem("favoritos") || "[]").includes(hotel.id),
      }));
      setHotels(dados);
      setFilteredHotels(dados);
    }
  }, [render]);

  const handleEditClick = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleFormClose = () => {
    setSelectedHotel(null);
    const resposta = listarHoteis();
    if (resposta.sucesso) {
      setHotels(resposta.dados);
      setFilteredHotels(resposta.dados);
    }
  };

  const handleDeleteClick = (hotelId) => {
    const confirmDelete = window.confirm("Deseja realmente excluir este hotel?");
    if (confirmDelete) {
      const resposta = deletarHotel({ id: hotelId });
      if (resposta.sucesso) {
        alert(resposta.mensagem);
        setHotels(hotels.filter((hotel) => hotel.id !== hotelId));
        setFilteredHotels(hotels.filter((hotel) => hotel.id !== hotelId));
      } else {
        alert(resposta.mensagem);
      }
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = hotels.filter((hotel) =>
      hotel.nome.toLowerCase().includes(term)
    );
    setFilteredHotels(filtered);
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sortedHotels = [...filteredHotels];
    if (option === "preco") {
      sortedHotels.sort((a, b) => {
        const precoA = parseFloat(a.preco.replace(/[^\d.-]/g, ""));
        const precoB = parseFloat(b.preco.replace(/[^\d.-]/g, ""));
        return precoA - precoB;
      });
    } else if (option === "classificacao") {
      sortedHotels.sort((a, b) => b.classificacao - a.classificacao);
    }
    setFilteredHotels(sortedHotels);
  };

  const handleFavoriteClick = (hotelId) => {
    const updatedHotels = hotels.map((hotel) =>
      hotel.id === hotelId ? { ...hotel, isFavorito: !hotel.isFavorito } : hotel
    );
    setHotels(updatedHotels);

    const favoritos = updatedHotels
      .filter((hotel) => hotel.isFavorito)
      .map((hotel) => hotel.id);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    if (showFavorites) {
      setFilteredHotels(updatedHotels.filter((hotel) => hotel.isFavorito));
    } else {
      setFilteredHotels(updatedHotels);
    }
  };

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
    if (!showFavorites) {
      setFilteredHotels(hotels.filter((hotel) => hotel.isFavorito));
    } else {
      setFilteredHotels(hotels);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <main>
      <header className="header">
        <nav className="navbar">
          <h1 className="site-title">Sistema de Hotéis</h1>
          <button onClick={toggleTheme} className="theme-toggle">
            {isDarkTheme ? "Tema Claro" : "Tema Escuro"}
          </button>
          <ul className="nav-links">
            <li>
              <a href="#">Início</a>
            </li>
            <li>
              <a href="#">Sobre</a>
            </li>
            <li>
              <a href="#">Contato</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="div-search-options">
        <input
          type="text"
          placeholder="🔍Pesquisar hotéis pelo nome:"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <div className="div-options">
          <Formulario triggerRender={setRender} />
          <button onClick={toggleShowFavorites} className="favorites-btn">
            {showFavorites ? "Todos os Hotéis" : "Favoritos ❤️"}
          </button>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="">Ordenar por...</option>
            <option value="preco">Preço (Menor para Maior)</option>
            <option value="classificacao">
              Classificação (Maior para Menor)
            </option>
          </select>
        </div>
      </div>
      <div className="hotel-list">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onEdit={() => handleEditClick(hotel)}
              onDelete={() => handleDeleteClick(hotel.id)}
              onFavorite={() => handleFavoriteClick(hotel.id)}
            />
          ))
        ) : (
          <p className="not-found">Nenhum Hotel encontrado.</p>
        )}
      </div>

      {selectedHotel && (
        <EditHotelForm hotel={selectedHotel} onClose={handleFormClose} />
      )}
      <footer className="footer">
        <div className="footer-content">
          <p>2024 Sistema de Hotéis. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
