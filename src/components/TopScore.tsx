type Props = { bestRoll: number; bestTime: number };

function TopScore({ bestRoll, bestTime }: Props) {
  return (
    <div className="bg-[#2B283A] p-5 mt-5">
      <div className="bg-[#F0F0F0] p-2 rounded-lg text-center">
        <h2 className="text-xl font-bold">TOP SCORE</h2>
        <p className="text-md">Roll: {bestRoll} times</p>
        <p className="text-md">Time: {bestTime} seconds</p>
      </div>
    </div>
  );
}

export default TopScore;
