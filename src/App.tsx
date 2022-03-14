import { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const { width, height } = useWindowSize();

  useEffect((): any => {
    const allIsHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allIsSame = dice.every((die) => die.value === firstValue);

    if (allIsHeld && allIsSame) {
      setTenzies(true);
    } else {
      setTenzies(false);
    }
  }, [dice]);

  function generateNewDie() {
    const randomNumber = Math.ceil(Math.random() * 6);
    return { value: randomNumber, isHeld: false, id: nanoid(5) };
  }

  function allNewDice() {
    let newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }

    return newDice;
  }

  function rollDice() {
    setDice((oldDice: any) => {
      return oldDice.map((die: any) => {
        return die.isHeld ? die : generateNewDie();
      });
    });
  }

  function holdDice(id: string) {
    setDice((prevDice: any): any => {
      return prevDice.map((die: any) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  function resetDice() {
    return setDice(allNewDice());
  }

  const diceElements = dice.map((die, index) => {
    return (
      <Die
        key={index}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    );
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
          {tenzies ? (
            <>
              <Confetti width={width} height={height} />
              <p>CONGRATULATIONS, YOU WON!</p>
              <button className="btn-main btn-reset" onClick={resetDice}>
                NEW GAME
              </button>
            </>
          ) : (
            <button className="btn-main" onClick={rollDice}>
              ROLL
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
