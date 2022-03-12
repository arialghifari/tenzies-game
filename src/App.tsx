import { useState } from "react";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    let newDice = [];

    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.ceil(Math.random() * 6);

      newDice.push({ value: randomNumber, isHeld: false });
    }

    return newDice;
  }

  function rollDice() {
    return setDice(allNewDice);
  }

  const diceElements = dice.map((die, index) => {
    return <Die key={index} value={die.value} />;
  });

  return (
    <main className="w-fit mx-auto mt-10 max-w-[22.5rem]">
      <div className="container bg-[#2B283A] p-5">
        <div className="content bg-[#F0F0F0] p-5 text-center rounded-lg">
          <h1 className="font-bold text-[1.75rem] text-[#2B283A]">
            Tenzies Game
          </h1>
          <p className="mt-2 text-[#2B283A]">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>

          <div className="dice-container my-6 flex flex-col gap-4 text-xl sm:my-8">
            <div className="grid gap-3 grid-cols-2 sm:gap-4 sm:grid-cols-5">
              {diceElements}
            </div>
          </div>
          <button className="btn-main" onClick={rollDice}>
            ROLL
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
