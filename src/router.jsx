import { createBrowserRouter } from "react-router-dom";
import Inicio from "./paginas/Inicio"; 
import HotelDetails from "./paginas/HotelDetails"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "/hotel/:id", 
    element: <HotelDetails />,
  },
]);

