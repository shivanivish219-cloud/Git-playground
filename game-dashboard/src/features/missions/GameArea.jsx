import { useGame } from "../../context/GameContext";
import { missions } from "./missionsData";
import MissionCard from "./MissionCard";
import "./Missions.css";

export default function GameArea() {
  const { selectedMission, selectMission } = useGame();

  return (
    <div className="game-area">
      {missions.map((mission) => (
        <MissionCard
          key={mission.id}
          mission={mission}
          isSelected={selectedMission?.id === mission.id}
          onClick={selectMission}
        />
      ))}
    </div>
  );
}
