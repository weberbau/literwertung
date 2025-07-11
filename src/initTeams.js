import { db } from "./firebase";
import { ref, set } from "firebase/database";

const TEAMS = [
  "Schluckhalle",
  "FC Biercelona",
  "Police Academy",
  "FC Hopfenliebe",
  "Droatbom",
  "Chronisch Unterhopft",
  "FC 80Ga Bertl",
  "FC Koanz Hittn",
  "FC Vollsuff",
  "Henahaufen",
  "Hauptsoch s'Bier is Koid",
  "Union Eschenau",
  "FC Saufhampton Waizenkirchen",
  "Landjugend St.Aegidi",
  "FC Korsing",
  "Musi St.Aegidi",
  "FC Leck Eier",
  "Bratlbuam",
  "Joungstars",
  "Calcio WW",
  "Niederleitner"
];

TEAMS.forEach((name, index) => {
  const team = {
    id: index + 1,
    name,
    beers: 0
  };
  set(ref(db, `teams/${team.id}`), team);
});