import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  ref,
  onValue,
  set,
  get,
  child
} from "firebase/database";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [beerInputs, setBeerInputs] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const teamsRef = ref(db, "teams");
      return onValue(teamsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setTeams(Object.values(data));
        }
      });
    }
  }, [user]);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).catch((err) =>
      alert("Login fehlgeschlagen: " + err.message)
    );
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleAddBeers = (teamId) => {
    const amount = parseInt(beerInputs[teamId] || "0", 10);
    if (isNaN(amount)) return;

    const teamRef = ref(db, `teams/${teamId}`);
    get(teamRef).then((snapshot) => {
      if (snapshot.exists()) {
        const team = snapshot.val();
        const newBeers = (team.beers || 0) + amount;
        set(teamRef, { ...team, beers: newBeers });
        setBeerInputs((prev) => ({ ...prev, [teamId]: "" }));
      }
    });
  };

  if (!user) {
    return (
      <div>
        <h2>🔐 Admin Login</h2>
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>🔧 Admin Bereich</h1>
      <button onClick={handleLogout}>Logout</button>
      {teams.map((team) => (
        <div key={team.id} style={{ marginBottom: "10px" }}>
          <strong>{team.name}:</strong> {team.beers} 🍻
          <input
            type="number"
            value={beerInputs[team.id] || ""}
            onChange={(e) =>
              setBeerInputs((prev) => ({
                ...prev,
                [team.id]: e.target.value,
              }))
            }
            placeholder="+ Liter"
            style={{ marginLeft: "10px", width: "60px" }}
          />
          <button onClick={() => handleAddBeers(team.id)}>Hinzufügen</button>
        </div>
      ))}
    </div>
  );
}