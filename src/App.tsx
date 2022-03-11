import Die from "./components/Die";

const App = () => {
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
              <Die value={1} />
              <Die value={3} />
              <Die value={4} />
              <Die value={6} />
              <Die value={2} />
              <Die value={4} />
              <Die value={3} />
              <Die value={4} />
              <Die value={6} />
              <Die value={4} />
            </div>
          </div>
          <button className="btn-main">ROLL</button>
        </div>
      </div>
    </main>
  );
};

export default App;
