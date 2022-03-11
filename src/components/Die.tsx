interface Props {
  value: number;
}

const Die = (props: Props) => {
  return <button className="btn-number">{props.value}</button>;
};

export default Die;
