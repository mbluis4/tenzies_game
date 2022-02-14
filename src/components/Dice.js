export default function Dice(props) {
  return (
    <div
      className={props.isFreezed ? "dice freezed" : "dice"}
      onClick={props.freezeDice}
    >
      {props.value}
    </div>
  );
}
