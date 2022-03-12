interface Props {
  value: number;
  isHeld: boolean;
  holdDice: any;
}

function Die(props: Props) {
  return (
    <button
      className={`btn-number ${props.isHeld ? "held" : ""}`}
      onClick={props.holdDice}
    >
      {props.value}
    </button>
  );
}

export default Die;
