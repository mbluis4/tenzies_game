export default function Dice(props) {
  console.log(props.freezeDice);
  return (
    <div
      className={props.isFreezed ? "dice freezed" : "dice"}
      onClick={props.freezeDice}
    >
      {props.value}
    </div>
  );
}
