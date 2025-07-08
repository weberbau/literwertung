export default function Admin({ teams, setTeams }) {
  const updateBeer = (id, beers) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.id === id ? { ...team, beers: Number(beers) } : team
      )
    );
  };

  return (
    <div>
      <h1>🔧 Admin Bereich</h1>
      {teams.map((team) => (
        <div key={team.id} style={{ marginBottom: "10px" }}>
          <span>{team.name}:</span>
          <input
            type="number"
            value={team.beers}
            onChange={(e) => updateBeer(team.id, e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </div>
      ))}
    </div>
  );
}
