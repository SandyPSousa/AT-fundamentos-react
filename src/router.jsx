// import { createBrowserRouter } from "react-router-dom";
// import Inicio from "./paginas/Inicio";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Inicio />,
//   },
// ]);

// export { router };

//ORIGINAL ACIMA 

// router.jsx

import { createBrowserRouter } from "react-router-dom";
import Inicio from "./paginas/Inicio"; // Ajuste o caminho conforme necessário
import HotelDetails from "./paginas/HotelDetails"; // Criar este componente a seguir

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "/hotel/:id", // Definir a rota para detalhes do hotel
    element: <HotelDetails />,
  },
]);

