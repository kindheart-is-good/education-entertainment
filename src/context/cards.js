import { createContext, useCallback, useState } from "react";
import axios from "axios";

const CardsContext = createContext();

function Provider({ children }) {
  const [cards, setCards] = useState([]);

  const fetchCards = useCallback(async () => {
    const response = await axios.get(
      process.env.REACT_APP_JSON_SERVER_URL + "/cards"
    );
    setCards(response.data);
  }, []);

  const createCard = async (title) => {
    //console.log('Need to add card with:', title);

    const response = await axios.post(
      process.env.REACT_APP_JSON_SERVER_URL + "/cards",
      {
        title,
      }
    );
    //console.log(response);

    const updatedCards = [
      ...cards,
      /*{
          id: Math.round(Math.random() * 9999),
          title
        },*/
      response.data,
    ];
    setCards(updatedCards);
  };

  const editCardById = async (id, newTitle) => {
    const response = await axios.put(
      process.env.REACT_APP_JSON_SERVER_URL + `/cards/${id}`,
      {
        title: newTitle,
      }
    );
    //console.log(response);

    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, ...response.data };
      }
      return card;
    });
    setCards(updatedCards);
  };

  const deleteCardById = async (id) => {
    await axios.delete(process.env.REACT_APP_JSON_SERVER_URL + `/cards/${id}`);

    const updatedCards = cards.filter((card) => {
      return card.id !== id;
    });
    setCards(updatedCards);
  };

  const valueToShare = {
    cards,
    fetchCards,
    createCard,
    editCardById,
    deleteCardById,
  };

  return (
    <CardsContext.Provider value={valueToShare}>
      {children}
    </CardsContext.Provider>
  );
}

export { Provider };
export default CardsContext;
