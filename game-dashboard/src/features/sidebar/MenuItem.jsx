export default function MenuItem({ id, label, icon, isActive, onClick }) {
  return (
    <div
      className="menu-item"
      style={isActive ? { background: "#00ffcc", color: "#000" } : {}}
      onClick={() => onClick(id)}
    >
      {icon} {label}
    </div>
  );
}
