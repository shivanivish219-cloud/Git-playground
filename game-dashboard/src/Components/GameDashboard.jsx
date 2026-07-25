import { GameProvider } from "../context/GameContext";
import Header from "../features/header/Header";
import Sidebar from "../features/sidebar/Sidebar";
import GameArea from "../features/missions/GameArea";
import Footer from "../features/footer/Footer";
import "./GameDashboard.css";

export default function GameDashboard() {
  return (
    <GameProvider>
      <div className="game-ui">
        <Header />
        <div className="main">
          <Sidebar />
          <GameArea />
        </div>
        <Footer />
      </div>
    </GameProvider>
  );
}
