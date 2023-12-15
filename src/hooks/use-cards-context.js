import { useContext } from "react";
import CardsContext from "../context/cards";

function useCardsContext() {
  return useContext(CardsContext);
}

export default useCardsContext;
