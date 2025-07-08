export default function Rankings({ teams }) {
  const sortedTeams = [...teams].sort((a, b) => b.beers - a.beers);

  return (
    <div>
      <h1>🏆 Hauptsoch s'Bier is Koid Literwertung</h1>
      <ul>
        {sortedTeams.map((team, index) => (
          <li key={team.id}>
            {index + 1}. {team.name} – {team.beers} Liter
          </li>
        ))}
      </ul>
    </div>
  );
}
