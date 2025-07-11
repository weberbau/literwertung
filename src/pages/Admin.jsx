import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { ref, onValue, set } from "firebase/database";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export default function Admin() {
  const [teams, setTeams] = useState([]);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      const teamsRef = ref(db, "teams");
      const unsubscribeData = onValue(teamsRef, (snapshot) => {
        const data = snapshot.val();
        setTeams(data ? Object.values(data) : []);
      });
      return unsubscribeData;
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Login fehlgeschlagen: " + error.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const addBeer = (team) => {
    const updatedTeam = { ...team, beers: (team.beers || 0) + 1 };
    set(ref(db, `teams/${team.id}`), updatedTeam);
  };

  if (!user) {
    return (
      <div>
        <h1>Admin Login</h1>
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
          <span>
            {team.name}: {team.beers} Liter
          </span>
          <button style={{ marginLeft: "10px" }} onClick={() => addBeer(team)}>
            +1
          </button>
        </div>
      ))}
    </div>
  );
}