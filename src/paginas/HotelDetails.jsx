// // HotelDetails.jsx

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { listarHoteis } from "../controller.jsx"; // Importe sua função de listagem aqui

// export default function HotelDetails() {
//   const { id } = useParams(); // Captura o ID passado pela URL
//   const [hotel, setHotel] = useState(null);

//   useEffect(() => {
//     const resposta = listarHoteis();
//     if (resposta.sucesso) {
//       const hotelSelecionado = resposta.dados.find((hotel) => hotel.id === parseInt(id, 10));
//       setHotel(hotelSelecionado);
//     }
//   }, [id]);

//   if (!hotel) {
//     return <div>Carregando detalhes do hotel...</div>;
//   }

//   return (
//     <div>
//       <h1>Detalhes do Hotel: {hotel.nome}</h1>
//       <img src={hotel.imagem} alt={hotel.nome} />
//       <p>Localização: {hotel.localizacao}</p>
//       <p>Preço: {hotel.preco}</p>
//       <p>Classificação: {hotel.classificacao}</p>
//       <p>Descrição: {hotel.descricao}</p>
//     </div>
//   );
// }

// HotelDetails.jsx

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./HotelDetails.css"; // Adicione estilos personalizados conforme necessário

// export default function HotelDetails() {
//   const [hotel, setHotel] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Recupera os detalhes do hotel armazenado no localStorage
//     const storedHotel = localStorage.getItem("selectedHotel");
//     if (storedHotel) {
//       setHotel(JSON.parse(storedHotel));
//     } else {
//       // Caso não encontre detalhes, redireciona para a listagem
//       navigate("/");
//     }
//   }, [navigate]);

//   if (!hotel) {
//     return <div>Carregando detalhes do hotel...</div>;
//   }

//   return (
//     <div className="hotel-details">
//       <h1>Página de Detalhes</h1>
//       <button onClick={() => navigate("/")} className="back-btn">
//         {"⬅️ Voltar"}
//       </button>
//       <div className="hotel-info">
//         <h2>{hotel.nome}</h2>
//         <img src={hotel.imagem} alt={hotel.nome} className="main-image" />
//         <div className="text-info">
//           <p>
//             <strong>Localização:</strong> {hotel.cidade}, {hotel.estado}
//           </p>
//           <p>
//             <strong>Preço da Diária:</strong> {hotel.preco}
//           </p>
//           <p>
//             <strong>Classificação:</strong> {"⭐".repeat(hotel.classificacao)}
//           </p>
//           <p>
//             <strong>Descrição:</strong> {hotel.detalhes.descricao}
//           </p>
//         </div>
//       </div>

//       <div className="additional-images">
//         <h2>Imagens Adicionais</h2>
//         <div className="image-grid">
//           {hotel.detalhes.imagens.map((img, index) => (
//             <img
//               key={index}
//               src={img}
//               alt={`Imagem ${index + 1}`}
//               className="additional-image"
//             />
//           ))}
//         </div>
//       </div>

//       <div className="services">
//         <h2>Serviços Oferecidos</h2>
//         <ul>
//           {hotel.detalhes.servicos.map((servico, index) => (
//             <li key={index}>
//               <strong>{servico.nome}:</strong> {servico.descricao}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

//ajuste para imagens gird

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HotelDetails.css"; // Adicione estilos personalizados conforme necessário

export default function HotelDetails() {
  const [hotel, setHotel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHotel = localStorage.getItem("selectedHotel");
    if (storedHotel) {
      setHotel(JSON.parse(storedHotel));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!hotel) {
    return <div>Carregando detalhes do hotel...</div>;
  }

  return (
    <div className="hotel-details">
      <div className="header">
        <h1>Página de Detalhes</h1>
      </div>
      <button onClick={() => navigate("/")} className="back-btn">
        {"⬅️ Voltar"}
      </button>
      <h2>{hotel.nome}</h2>
      <div className="hotel-info-div">
        <div className="images-div">
          <div className="main-image-div">
            <img src={hotel.imagem} alt={hotel.nome} className="main-image" />
          </div>
          <div className="extra-images-div">
            {hotel.detalhes.imagens.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Imagem ${index + 1}`}
                className="extra-images"
              />
            ))}
          </div>
        </div>
        <div className="text-info">
          <p>
            <strong>Localização:</strong> {hotel.cidade}, {hotel.estado}
          </p>
          <p>
            <strong>Classificação:</strong> {"⭐".repeat(hotel.classificacao)}
          </p>
          <p>
            <strong>Descrição:</strong> {hotel.detalhes.descricao}
          </p>
          <p className="price-text">
            Diárias por<strong> R$ {hotel.preco}</strong>
          </p>
          <div className="services">
            <h2 className="services-h2">Serviços Oferecidos</h2>
            <ul>
              {hotel.detalhes.servicos.map((servico, index) => (
                <li key={index}>
                  <strong>{servico.nome}:</strong> {servico.descricao}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <p> 2024 Sistema de Hotéis. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
