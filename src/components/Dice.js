export default function Dice({ value, isFreezed, freezeDice }) {
  return (
    <div className={isFreezed ? "dice freezed" : "dice"} onClick={freezeDice}>
      {value}
    </div>
  );
}
