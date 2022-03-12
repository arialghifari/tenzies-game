interface Props {
  value: number;
}

function Die(props: Props) {
  return <button className="btn-number">{props.value}</button>;
}

export default Die;
