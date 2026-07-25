import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState("start");
  const [selectedMission, setSelectedMission] = useState(null);
  const [coins, setCoins] = useState(3500);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectMenuItem = (id) => setSelectedMenuItem(id);

  const selectMission = (mission) => {
    if (mission.locked) {
      alert("This mission is locked! Complete previous missions first.");
      return;
    }
    setSelectedMission(mission);
  };

  const playGame = () => {
    if (!selectedMission) {
      alert("Please select a mission first!");
      return;
    }
    if (isPlaying) {
      alert("Game already in progress!");
      return;
    }

    setIsPlaying(true);
    setCoins((prev) => {
      const updated = prev + 100;
      alert(
        `Starting mission: ${selectedMission.title}!\n\nCoins earned: 100\nTotal Coins: ${updated}`,
      );
      return updated;
    });

    setTimeout(() => setIsPlaying(false), 1000);
  };

  const value = {
    selectedMenuItem,
    selectedMission,
    coins,
    isPlaying,
    selectMenuItem,
    selectMission,
    playGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  return useContext(GameContext);
}
