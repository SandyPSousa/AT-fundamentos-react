import React, { useState } from "react";
import "./modal.css";

export function listarHoteis() {
  try {
    const listaDeHoteis = localStorage.getItem("hotels"); 

    if (listaDeHoteis === null) throw new Error("chave [hotels] não existe!"); 

    const listaConvertida = converterParaObjeto(listaDeHoteis);

    return {
      sucesso: true,
      mensagem: "lista [hotels] retornada com sucesso!", 
      dados: listaConvertida,
    };
  } catch (error) {
    return {
      sucesso: false,
      mensagem: error.message,
      dados: [],
    };
  }
}

export function criarHotel(hotel) {
  try {
    if (!hotel) throw new Error("[hotel] não encontrado!");

    hotel.id = new Date().getTime(); 

    const listaDeHoteisResposta = listarHoteis();
    const listaDeHoteis = listaDeHoteisResposta.dados || [];

   
    const hotelJaExistente = listaDeHoteis.some(h => h.nome === hotel.nome); 
    if (hotelJaExistente) throw new Error("[hotel] com este nome já existente!"); 


    listaDeHoteis.push(hotel);

    const listaConvertida = converterParaString(listaDeHoteis);
    localStorage.setItem("hotels", listaConvertida); 

    return {
      sucesso: true,
      mensagem: "[hotel] criado com sucesso!",
      dados: hotel,
    };
  } catch (error) {
    return {
      sucesso: false,
      mensagem: error.message,
      dados: null,
    };
  }
}

export function detalharHotel(hotel) {
  try {
    const [hotelIndex, hotelEncontrado] = encontrarHotel(hotel?.id);

    if (!hotelEncontrado) throw new Error("[hotel] não encontado!");

    return {
      sucesso: true,
      mensagem: "hotel encontrado com sucesso",
      dados: hotelEncontrado,
    };
  } catch (error) {
    return {
      sucesso: false,
      mensagem: error.message,
      dados: null,
    };
  }
}

export function editarHotel(hotel) {
  try {
    const listaDeHoteisResposta = listarHoteis();
    const listaDeHoteis = listaDeHoteisResposta?.dados || [];

    if (!hotel.id) throw new Error("[hotel] ID inválido ou não fornecido!");

    const [hotelIndex, hotelEncontrado] = encontrarHotel(hotel.id);

    if (!hotelEncontrado) throw new Error("[hotel] não encontrado!");


    const nomeJaExistente = listaDeHoteis.some(h => h.nome === hotel.nome && h.id !== hotel.id);
    if (nomeJaExistente) throw new Error("[hotel] com este nome já existente!");

    listaDeHoteis[hotelIndex] = hotel;

    const listaConvertida = converterParaString(listaDeHoteis);
    localStorage.setItem("hotels", listaConvertida);

    return {
      sucesso: true,
      mensagem: "[hotel] editado com sucesso",
      dados: hotel,
    };
  } catch (error) {
    return {
      sucesso: false,
      mensagem: error.message,
      dados: null,
    };
  }
}

export function deletarHotel(hotel) {
  try {
    const resposta = listarHoteis();

    const listaDeHoteis = resposta.dados;

    const hoteisFiltrados = listaDeHoteis.filter((value, index) => {
      if (value.id != hotel.id) {
        return true;
      }
    });

    const listaConvertida = converterParaString(hoteisFiltrados);

    localStorage.setItem("hotels", listaConvertida);

    return {
      sucesso: true,
      mensagem: "Hotel deletado com sucesso!",
      dados: hoteisFiltrados,
    };
  } catch (error) {
    return {
      sucesso: false,
      mensagem: "Hotel não foi deletado",
      dados: null,
    };
  }
}

function converterParaString(objeto) {
  const stringConvertida = JSON.stringify(objeto);
  return stringConvertida;
}

function converterParaObjeto(hoteis) {
  const objetoConvertido = JSON.parse(hoteis);
  return objetoConvertido;
}

function encontrarHotel(hotelId) {
  try {
    if (!hotelId) throw new Error("[hotel] id não existente!");

    const resposta = listarHoteis();
    const hoteis = resposta.dados;

    let hotelIndex = null;

    const hotelEncontrado = hoteis.find((hotel, index) => {
   
      if (hotel.id === hotelId) {
        hotelIndex = index;
        return true;
      }
    
    });

    if (!hotelEncontrado) throw new Error("[hotel] não encontrado!");

    return [hotelIndex, hotelEncontrado];
  } catch (error) {
    console.error(error?.message || error);
    return [null, null];
  }
}
