const App = () => {
  return (
    <main className="w-fit mx-auto mt-10 max-w-[22.5rem]">
      <div className="container bg-[#2B283A] p-5">
        <div className="content bg-[#F0F0F0] p-5 text-center rounded-lg">
          <h1 className="font-bold text-[1.75rem] text-[#2B283A]">Tenzies</h1>
          <p className="mt-2 text-[#2B283A]">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>

          <div className="btn my-6 sm:my-8 flex flex-col gap-4 text-xl">
            <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-5">
              <button className="btn-number">1</button>
              <button className="btn-number">2</button>
              <button className="btn-number">3</button>
              <button className="btn-number">4</button>
              <button className="btn-number">5</button>
              <button className="btn-number">6</button>
              <button className="btn-number">7</button>
              <button className="btn-number">8</button>
              <button className="btn-number">9</button>
              <button className="btn-number">0</button>
            </div>
          </div>
          <button className="btn-main">ROLL</button>
        </div>
      </div>
    </main>
  );
};

export default App;
