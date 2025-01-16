import { date } from "./data";
import { useApp } from "./useApp";

function App() {
  const { cards, shuffleCards, handleSelect, score, firstCard, secondCard } =
    useApp({ initialCards: date });

  return (
    <section className="container">
      <button
        onClick={shuffleCards}
        className="mx-auto mt-10 flex items-center justify-center rounded-2xl bg-[#09814A] px-10 py-2 text-2xl font-bold text-white"
      >
        Start
      </button>
      <div className="mx-auto my-8 grid max-w-xl grid-cols-5 gap-4">
        {cards.map((card) => (
          <div
            className={`relative flex aspect-square cursor-pointer items-center justify-center rounded-2xl shadow-2xl duration-300 ${
              card.matched || firstCard === card || secondCard === card
                ? "bg-[#56a867]"
                : "bg-gradient-to-r from-[#775B59] to-[#32161F]"
            }`}
            key={card.id}
            onClick={() => {
              if (!card.matched && firstCard !== card && secondCard !== card) {
                handleSelect(card);
              }
            }}
          >
            <img
              className={`h-full w-full object-contain ${
                card.matched || firstCard === card || secondCard === card
                  ? "opacity-100"
                  : "opacity-0"
              } transition-opacity duration-300`}
              src={card.imgUrl}
              alt={card.label}
            />
          </div>
        ))}
      </div>
      <h1 className="text-center text-4xl font-bold">Score: {score}</h1>
    </section>
  );
}

export default App;
