import React, { useState, useEffect } from "react";
import "./modal.css";

const Modal = ({ show, onClose, onSubmit }) => {
  const [hotelData, setHotelData] = useState({
    nome: "",
    imagem: "",
    classificacao: 0,
    cidade: "",
    estado: "",
    preco: "",
    detalhes: {
      descricao: "",
      imagens: ["", "", "", ""],
      servicos: [
        { nome: "", descricao: "" },
        { nome: "", descricao: "" },
      ],
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDetailsChange = (e, fieldName, index = null) => {
    if (index === null) {
      setHotelData((prevData) => ({
        ...prevData,
        detalhes: {
          ...prevData.detalhes,
          [fieldName]: e.target.value,
        },
      }));
    } else {
      const updatedImages = [...hotelData.detalhes.imagens];
      updatedImages[index] = e.target.value;

      setHotelData((prevData) => ({
        ...prevData,
        detalhes: {
          ...prevData.detalhes,
          imagens: updatedImages,
        },
      }));
    }
  };

  const handleServiceChange = (e, index, fieldName) => {
    const updatedServices = [...hotelData.detalhes.servicos];
    updatedServices[index][fieldName] = e.target.value;

    setHotelData((prevData) => ({
      ...prevData,
      detalhes: {
        ...prevData.detalhes,
        servicos: updatedServices,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    hotelData.id = new Date().getTime();
    onSubmit(hotelData);
    const existingHotels = JSON.parse(localStorage.getItem("hotels")) || [];
    const updatedHotels = [...existingHotels, hotelData];
    localStorage.setItem("hotels", JSON.stringify(updatedHotels));
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Criar Hotel</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome do hotel:
            <input
              type="text"
              name="nome"
              value={hotelData.nome}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Imagem (URL):
            <input
              type="text"
              name="imagem"
              value={hotelData.imagem}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Classificação (1 a 5):
            <input
              type="number"
              name="classificacao"
              value={hotelData.classificacao}
              onChange={handleChange}
              min="1"
              max="5"
              required
            />
          </label>
          <label>
            Cidade:
            <input
              type="text"
              name="cidade"
              value={hotelData.cidade}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Estado:
            <input
              type="text"
              name="estado"
              value={hotelData.estado}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Preço da diária:
            <input
              type="text"
              name="preco"
              value={hotelData.preco}
              onChange={handleChange}
              required
            />
          </label>

          <fieldset>
            <legend>Detalhes</legend>
            <label>
              Detalhes do Hotel:
              <textarea
                name="descricao"
                value={hotelData.detalhes.descricao}
                onChange={(e) => handleDetailsChange(e, "descricao")}
                required
              />
            </label>

            <fieldset>
              <legend>Imagens</legend>
              {hotelData.detalhes.imagens.map((imagem, index) => (
                <label key={index}>
                  Imagem {index + 1} (URL):
                  <input
                    type="text"
                    value={imagem}
                    onChange={(e) => handleDetailsChange(e, "imagens", index)}
                    required
                  />
                </label>
              ))}
            </fieldset>

            <fieldset>
              <legend>Serviços</legend>
              {hotelData.detalhes.servicos.map((servico, index) => (
                <div key={index}>
                  <label>
                    Serviço:
                    <input
                      type="text"
                      value={servico.nome}
                      onChange={(e) => handleServiceChange(e, index, "nome")}
                      required
                    />
                  </label>
                  <label>
                    Descrição:
                    <input
                      type="text"
                      value={servico.descricao}
                      onChange={(e) =>
                        handleServiceChange(e, index, "descricao")
                      }
                      required
                    />
                  </label>
                </div>
              ))}
            </fieldset>
          </fieldset>

          <button type="submit">Criar Hotel</button>

          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

const Formulario = ({ triggerRender }) => {
  const [showModal, setShowModal] = useState(false);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem("hotels")) || [];

    if (storedHotels.length === 0) {
      const fakeHotels = [
        {
          nome: "Hotel Aurora",
          imagem:
            "https://img.freepik.com/fotos-gratis/projeto-interior-de-resort-de-luxo_23-2150497283.jpg?uid=R160877444&ga=GA1.1.GA1.1.839107090.1725559554&semt=ais_hybrid",
          classificacao: 5,
          cidade: "Rio de Janeiro",
          estado: "RJ",
          preco: "550",
          detalhes: {
            descricao:
              "Hotel de luxo com vista deslumbrante para o mar, perfeito para uma estadia relaxante e sofisticada.",
            imagens: [
              "https://img.freepik.com/fotos-gratis/vista-da-luxuosa-piscina-do-hotel_23-2150683399.jpg?uid=R160877444&ga=GA1.1.GA1.1.839107090.1725559554&semt=ais_hybrid",
              "https://img.freepik.com/fotos-gratis/arranjo-de-macarons-delicioso_23-2150684126.jpg?uid=R160877444&ga=GA1.1.GA1.1.839107090.1725559554&semt=ais_hybrid",
              "https://img.freepik.com/fotos-gratis/vista-da-sala-de-ginastica-para-treinamento-e-esportes_23-2151699509.jpg?uid=R160877444&ga=GA1.1.GA1.1.839107090.1725559554&semt=ais_hybridg",
              "https://img.freepik.com/fotos-gratis/vista-da-piscina-do-hotel_23-2150683417.jpg?uid=R160877444&ga=GA1.1.GA1.1.839107090.1725559554&semt=ais_hybrid",
            ],
            servicos: [
              { nome: "Wi-Fi", descricao: "Grátis em todas as áreas" },
              { nome: "Piscina", descricao: "Infinita com vista panorâmica" },
              { nome: "Estacionamento", descricao: "Grátis para hóspedes" },
              { nome: "Spa", descricao: "Completo com massagens relaxantes" },
            ],
          },
          id: 1,
        },
        {
          nome: "Hotel Serenidade",
          imagem:
            "https://img.freepik.com/fotos-gratis/design-de-interiores-aconchegantes-e-animados_23-2151118955.jpg?uid=R160877444&ga=GA1.1.GA1.1.839107090.1725559554&semt=ais_hybrid",
          classificacao: 4,
          cidade: "Florianópolis",
          estado: "SC",
          preco: "420",
          detalhes: {
            descricao:
              "Refúgio à beira-mar com ambiente tranquilo, ideal para quem busca descanso e conforto.",
            imagens: [
              "https://img.freepik.com/fotos-gratis/vista-da-luxuosa-piscina-do-hotel_23-2150683399.jpg?uid=R160877444&ga=GA1.1.GA1.1.839107090.1725559554&semt=ais_hybrid",
              "https://img.freepik.com/fotos-gratis/arranjo-de-macarons-delicioso_23-2150684126.jpg?uid=R160877444&ga=GA1.1.GA1.1.839107090.1725559554&semt=ais_hybrid",
              "https://img.freepik.com/fotos-gratis/vista-da-sala-de-ginastica-para-treinamento-e-esportes_23-2151699509.jpg?uid=R160877444&ga=GA1.1.GA1.1.839107090.1725559554&semt=ais_hybridg",
              "https://img.freepik.com/fotos-gratis/vista-da-piscina-do-hotel_23-2150683417.jpg?uid=R160877444&ga=GA1.1.GA1.1.839107090.1725559554&semt=ais_hybrid",
            ],
            servicos: [
              {
                nome: "Café da manhã",
                descricao: "Incluso com opções regionais",
              },
              { nome: "Piscina", descricao: "Aquecida com bar molhado" },
              { nome: "Sauna", descricao: "Completa e relaxante" },
              { nome: "Academia", descricao: "Moderna e equipada" },
            ],
          },
          id: 2,
        },
        {
          nome: "Hotel Montanha Verde",
          imagem:
            "https://img.freepik.com/fotos-gratis/design-de-interiores-aconchegantes-e-animados_23-2151118953.jpg?uid=R160877444&ga=GA1.1.GA1.1.839107090.1725559554&semt=ais_hybrid",
          classificacao: 3,
          cidade: "Campos do Jordão",
          estado: "SP",
          preco: "310",
          detalhes: {
            descricao:
              "Acomodações confortáveis em meio à natureza, ideal para quem aprecia tranquilidade e paisagens montanhosas.",
            imagens: [
              "https://img.freepik.com/fotos-gratis/vista-da-luxuosa-piscina-do-hotel_23-2150683399.jpg?uid=R160877444&ga=GA1.1.GA1.1.839107090.1725559554&semt=ais_hybrid",
              "https://img.freepik.com/fotos-gratis/arranjo-de-macarons-delicioso_23-2150684126.jpg?uid=R160877444&ga=GA1.1.GA1.1.839107090.1725559554&semt=ais_hybrid",
              "https://img.freepik.com/fotos-gratis/vista-da-sala-de-ginastica-para-treinamento-e-esportes_23-2151699509.jpg?uid=R160877444&ga=GA1.1.GA1.1.839107090.1725559554&semt=ais_hybridg",
              "https://img.freepik.com/fotos-gratis/vista-da-piscina-do-hotel_23-2150683417.jpg?uid=R160877444&ga=GA1.1.GA1.1.839107090.1725559554&semt=ais_hybrid",
            ],
            servicos: [
              { nome: "Lareira", descricao: "Em todos os quartos" },
              { nome: "Trilhas", descricao: "Guiadas pela montanha" },
              { nome: "Café colonial", descricao: "Com comidas típicas" },
              { nome: "Estacionamento", descricao: "Grátis para hóspedes" },
            ],
          },
          id: 3,
        },
      ];

      localStorage.setItem("hotels", JSON.stringify(fakeHotels));
      setHotels(fakeHotels);
    } else {
      setHotels(storedHotels);
    }
  }, []);

  const handleAddHotel = (newHotel) => {
    setHotels((prevHotels) => [...prevHotels, newHotel]);
    triggerRender((state) => state + 1);
    alert("Hotel adicionado com sucesso.")
  };

  return (
    <div>
      <button className="new-hotel-btn" onClick={() => setShowModal(true)}>
        Adicionar Novo Hotel
      </button>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddHotel}
      />
    </div>
  );
};

export default Formulario;
