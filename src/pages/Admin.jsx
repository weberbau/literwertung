import { useState } from "react";

const ADMIN_PASSWORD = "deinGeheimesPasswort"; // <- hier dein Passwort eintragen

export default function Admin({ teams, setTeams }) {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  // Eingabewerte pro Team
  const [inputValues, setInputValues] = useState(
    teams.reduce((acc, team) => {
      acc[team.id] = "";
      return acc;
    }, {})
  );

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Falsches Passwort");
    }
  };

  const handleInputChange = (id, value) => {
    setInputValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleAdd = (id) => {
    const toAdd = parseInt(inputValues[id], 10);
    if (!isNaN(toAdd)) {
      setTeams((prev) =>
        prev.map((team) =>
          team.id === id ? { ...team, beers: team.beers + toAdd } : team
        )
      );
      setInputValues((prev) => ({ ...prev, [id]: "" }));
    }
  };

  if (!authenticated) {
    return (
      <div style={{ padding: 20 }}>
        <h2>🔐 Admin Login</h2>
        <input
          type="password"
          placeholder="Passwort eingeben"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🔧 Admin Bereich</h1>
      {teams.map((team) => (
        <div key={team.id} style={{ marginBottom: "10px" }}>
          <span>
            {team.name}: {team.beers} 🍻
          </span>
          <input
            type="number"
            placeholder="+ Bier"
            value={inputValues[team.id] || ""}
            onChange={(e) => handleInputChange(team.id, e.target.value)}
            style={{ marginLeft: "10px", width: 60 }}
          />
          <button onClick={() => handleAdd(team.id)} style={{ marginLeft: 5 }}>
            Hinzufügen
          </button>
        </div>
      ))}
    </div>
  );
}