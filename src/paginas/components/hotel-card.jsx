// import React from "react";

// export default function HotelCard({ hotel, onEdit, onDelete, onFavorite }) {
//   return (
//     <div className="hotel-card">
//       <img src={hotel.imagem} alt={hotel.nome} className="hotel-image" />
//       <div className="hotel-card-texts">
//         <h2>{hotel.nome}</h2>
//         <p>{"⭐".repeat(hotel.classificacao)}</p>
//         <p>
//           <strong> {hotel.cidade}</strong>
//         </p>
//         <div className="price-div">
//         <p>
//           <strong> Diárias a partir de <span className="price-span">{hotel.preco}</span></strong>
//         </p>
//         </div>
//       </div>


//       <div className="btn-div">
//         <button onClick={onEdit} className="edit-btn">
//           Editar ✏️
//         </button>
//         <button onClick={onDelete} className="delete-btn">
//           Deletar 🗑️
//         </button>
//         <button
//           className={`favorite-btn ${hotel.isFavorito ? "favorited" : ""}`}
//           onClick={onFavorite}
//         >
//           {hotel.isFavorito ? "Favorito ❤️" : "Favoritar"}
//         </button>
//       </div>
//     </div>
//   );
// }
//ACIMA ANTES DO ROUTER, ESTÁ TUDO CORRETO 
//ABAIXO, AJUSTANDO A TELA DE DETALHES 
// HotelCard.jsx

// import React from "react";
// import { useNavigate } from "react-router-dom"; // Importar o hook de navegação

// export default function HotelCard({ hotel, onEdit, onDelete, onFavorite }) {
//   const navigate = useNavigate(); // Inicializar a navegação

//   const handleCardClick = () => {
//     navigate(`/hotel/${hotel.id}`); // Redirecionar para a página de detalhes do hotel
//   };

//   return (
//     <div className="hotel-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
//       <img src={hotel.imagem} alt={hotel.nome} className="hotel-image" />
//       <div className="hotel-card-texts">
//         <h2>{hotel.nome}</h2>
//         <p>{"⭐".repeat(hotel.classificacao)}</p>
//         <p>
//           <strong> {hotel.cidade}</strong>
//         </p>
//         <div className="price-div">
//           <p>
//             <strong> Diárias a partir de <span className="price-span">{hotel.preco}</span></strong>
//           </p>
//         </div>
//       </div>

//       <div className="btn-div">
//         <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="edit-btn">
//           Editar ✏️
//         </button>
//         <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="delete-btn">
//           Deletar 🗑️
//         </button>
//         <button
//           className={`favorite-btn ${hotel.isFavorito ? "favorited" : ""}`}
//           onClick={(e) => { e.stopPropagation(); onFavorite(); }}
//         >
//           {hotel.isFavorito ? "Favorito ❤️" : "Favoritar"}
//         </button>
//       </div>
//     </div>
//   );
// }




// HotelCard.jsx

import React from "react";
import { useNavigate } from "react-router-dom"; // Importar o hook de navegação

export default function HotelCard({ hotel, onEdit, onDelete, onFavorite }) {
  const navigate = useNavigate(); // Inicializar a navegação

  const handleCardClick = () => {
    // Armazena o hotel selecionado no localStorage
    localStorage.setItem("selectedHotel", JSON.stringify(hotel));
    navigate(`/hotel/${hotel.id}`); // Redirecionar para a página de detalhes do hotel
  };

  return (
    <div className="hotel-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <img src={hotel.imagem} alt={hotel.nome} className="hotel-image" />
      <div className="hotel-card-texts">
        <h2>{hotel.nome}</h2>
        <p>{"⭐".repeat(hotel.classificacao)}</p>
        <p>
          <strong> {hotel.cidade}</strong>
        </p>
        <div className="price-div">
          <p>
            <strong> Diárias a partir de <span className="price-span">R${hotel.preco}</span></strong>
          </p>
        </div>
      </div>

      <div className="btn-div">
        <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="edit-btn">
          Editar ✏️
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="delete-btn">
          Deletar 🗑️
        </button>
        <button
          className={`favorite-btn ${hotel.isFavorito ? "favorited" : ""}`}
          onClick={(e) => { e.stopPropagation(); onFavorite(); }}
        >
          {hotel.isFavorito ? "Favorito ❤️" : "Favoritar"}
        </button>
      </div>
    </div>
  );
}
