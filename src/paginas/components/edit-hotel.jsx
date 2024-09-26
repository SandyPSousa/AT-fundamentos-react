
import React, { useState, useEffect } from "react";
import { editarHotel } from "../../controller";

const EditHotelForm = ({ hotel, onClose }) => {
  const [formData, setFormData] = useState(hotel);

  useEffect(() => {
    setFormData(hotel);
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resposta = editarHotel(formData);
    if (resposta.sucesso) {
      alert(resposta.mensagem);
      onClose(); 
    } else {
      alert(resposta.mensagem); 
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Hotel</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Classificação:
            <input
              type="number"
              name="classificacao"
              value={formData.classificacao}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Cidade:
            <input
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Preço:
            <input
              type="text"
              name="preco"
              value={formData.preco}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Imagem:
            <input
              type="text"
              name="imagem"
              value={formData.imagem}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default EditHotelForm;
