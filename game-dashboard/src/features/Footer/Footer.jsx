import { useGame } from "../../context/GameContext";
import "./Footer.css";

export default function Footer() {
  const { coins, playGame } = useGame();

  return (
    <div className="footer">
      <span>Coins: {coins}</span>
      <button className="btn" onClick={playGame}>
        Play Now
      </button>
    </div>
  );
}
