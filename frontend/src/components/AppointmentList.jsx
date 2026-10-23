function AppointmentList({ appointments }) {
  if (appointments.length === 0) {
    return <p>Még nincs foglalt időpont.</p>;
  }

  return (
    <div>
      <h2>Foglalt időpontok</h2>
      <ul className="appointment-list">
        {appointments.map((a) => (
          <li key={a.id}>
            <span>
              <strong>{a.date}</strong> {a.start_time.slice(0, 5)}
            </span>
            <span className="status">{a.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentList;