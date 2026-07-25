import { useGame } from "../../context/GameContext";
import MenuItem from "./MenuItem";
import "./Sidebar.css";

const menuItems = [
  { id: "start", label: "Start Game", icon: "🎮" },
  { id: "characters", label: "Characters", icon: "🧙" },
  { id: "maps", label: "Maps", icon: "🗺" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

export default function Sidebar() {
  const { selectedMenuItem, selectMenuItem } = useGame();

  return (
    <div className="sidebar">
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          {...item}
          isActive={selectedMenuItem === item.id}
          onClick={selectMenuItem}
        />
      ))}
    </div>
  );
}
