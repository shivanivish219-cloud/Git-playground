export default function MissionCard({ mission, isSelected, onClick }) {
  return (
    <div
      className="card"
      style={
        isSelected
          ? {
              border: "2px solid #00ffcc",
              boxShadow: "0 0 20px rgba(0,255,204,0.5)",
            }
          : {}
      }
      onClick={() => onClick(mission)}
    >
      <h3>{mission.title}</h3>
      <p>{mission.subtitle}</p>
    </div>
  );
}
