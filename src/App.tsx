import { useEffect, useState } from "react";
import Die from "./components/Die";
import TopScore from "./components/TopScore";
import { nanoid } from "nanoid";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const { width, height } = useWindowSize();
  const [time, setTime] = useState(0);
  const [bestRoll, setBestRoll] = useState(
    localStorage.getItem("bestRoll") || 0
  );
  const [bestTime, setBestTime] = useState(
    localStorage.getItem("bestTime") || 0
  );

  // On dice change
  useEffect(() => {
    const allIsHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allIsSame = dice.every((die) => die.value === firstValue);

    if (allIsHeld && allIsSame) {
      setTenzies(true);
    } else {
      setTenzies(false);
    }
  }, [dice]);

  // Timer, set bestRoll, and set bestTime
  useEffect(() => {
    if (gameStarted) {
      if (tenzies) {
        setBestRoll(
          bestRoll === 0
            ? rollCount
            : bestRoll > rollCount
            ? rollCount
            : bestRoll
        );
        setBestTime(bestTime === 0 ? time : bestTime > time ? time : bestTime);
      } else {
        var fun = setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000);
      }

      return () => clearInterval(fun);
    }
  }, [tenzies, gameStarted]);

  // Set local storage
  useEffect(() => {
    localStorage.setItem("bestRoll", bestRoll.toString());
    localStorage.setItem("bestTime", bestTime.toString());
  }, [bestRoll, bestTime]);

  function startGame() {
    setGameStarted(true);
    setDice(allNewDice());
  }

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
    const allIsHeld = dice.every((die) => die.isHeld);

    if (!allIsHeld) {
      setDice((prevDice) => {
        return prevDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        });
      });

      setRollCount((prevRollCount) => prevRollCount + 1);
    }
  }

  function holdDice(id: string) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  function resetDice() {
    setDice(allNewDice());
    setTenzies(false);
    setRollCount(0);
    setTime(0);
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
    <main className="w-fit mx-auto my-10 max-w-[22.5rem]">
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
            <div className="grid gap-3 grid-cols-2 sm:gap-4 sm:grid-cols-5 relative">
              {diceElements}
              {gameStarted ? "" : (
                <div className="blur absolute w-full h-full"></div>
              )}
            </div>
          </div>
          {gameStarted ? (
            tenzies ? (
              <>
                <Confetti width={width} height={height} />
                <p>CONGRATULATIONS, YOU WON!</p>
                <button className="btn-main btn-reset" onClick={resetDice}>
                  START NEW GAME
                </button>
              </>
            ) : (
              <button className="btn-main" onClick={rollDice}>
                ROLL
              </button>
            )
          ) : (
            <button className="btn-main" onClick={startGame}>
              START
            </button>
          )}
          <div className="flex justify-between">
            <p className="text-left">Roll count: {rollCount}</p>
            <p className="text-right">Time: {time} seconds</p>
          </div>
        </div>
      </div>
      <TopScore bestRoll={+bestRoll} bestTime={+bestTime} />
    </main>
  );
}

export default App;
