import React, { useState } from "react";
import { deletarHotel } from "../../controller";

const DeleteHotelForm = ({ hotel, onClose }) => {
  const [formData, setFormData] = useState(hotel);

  const handleDelete = (e) => {
    e.preventDefault();
    const resposta = deletarHotel(formData);
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
        <h2>Deletar Hotel</h2>
        <p>
          Tem certeza que deseja deletar o hotel{" "}
          <strong>{formData.nome}</strong>?
        </p>
        <form onSubmit={handleDelete}>
          <button type="submit">Confirmar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteHotelForm;
