import { useEffect, useState } from "react";

export const useApp = ({ initialCards }) => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [score, setScore] = useState(0);
  const [waiting, setWaiting] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...initialCards, ...initialCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id: Math.random(),
        matched: false,
      }));

    setCards(shuffledCards);
    setScore(0);
    setFirstCard(null);
    setSecondCard(null);
    setWaiting(false);
  };

  const handleSelect = (card) => {
    if (!waiting) {
      firstCard ? setSecondCard(card) : setFirstCard(card);
    }
  };

  const resetSelection = () => {
    setFirstCard(null);
    setSecondCard(null);
    setWaiting(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (firstCard && secondCard) {
      setWaiting(true);

      if (firstCard.label === secondCard.label) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.label === firstCard.label ? { ...card, matched: true } : card,
          ),
        );
        setScore((prevScore) => prevScore + 1);
        setTimeout(resetSelection, 500);
      } else {
        setTimeout(resetSelection, 1000);
      }
    }
  }, [firstCard, secondCard]);

  return {
    cards,
    score,
    shuffleCards,
    handleSelect,
    firstCard,
    secondCard,
  };
};
