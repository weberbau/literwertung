import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Rankings from "./pages/Rankings";
import Admin from "./pages/Admin";
import { useState } from "react";

export default function App() {
  const [teams, setTeams] = useState([
    { id: 1, name: "Schluckhalle", beers: 10 },
    { id: 2, name: "FC Biercelona", beers: 0 },
    { id: 3, name: "TSV Bücherclub", beers: 0 },
    { id: 4, name: "Police Academy", beers: 3 },
    { id: 5, name: "FC Hopfenliebe", beers: 0 },
    { id: 6, name: "Droatbom", beers: 0 },
    { id: 7, name: "Chronisch Unterhopft", beers: 0 },
    { id: 8, name: "FC 80Ga Bertl", beers: 0 },
    { id: 9, name: "FC Koanz Hittn", beers: 0 },
    { id: 10, name: "FV Vollsuff", beers: 5 },
    { id: 11, name: "Henahaufen", beers: 0 },
    { id: 12, name: "Hauptsoch s'Bier is Koid", beers: 0 },
    { id: 13, name: "Union Eschenau", beers: 0 },
    { id: 14, name: "FC Saufhampton Waizenkirchen", beers: 0 },
    { id: 15, name: "Landjugend St.Aegidi", beers: 0 },
    { id: 16, name: "Krisenalkoholiker", beers: 0 },
    { id: 17, name: "FC Korsing", beers: 0 },
    { id: 18, name: "Musi St.Aegidi", beers: 0 },
    { id: 19, name: "FC Leck Eier", beers: 0 },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Rankings teams={teams} />} />
        <Route path="/admin" element={<Admin teams={teams} setTeams={setTeams} />} />
      </Routes>
    </Router>
  );
}
