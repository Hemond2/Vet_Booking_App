const STATUS_INFO = {
  "FÜGGŐBEN": { label: "Függőben", className: "status-pending" },
  FOLYAMATBAN: { label: "Folyamatban", className: "status-progress" },
  BEFEJEZETT: { label: "Befejezett", className: "status-done" },
  LEMONDOTT: { label: "Lemondott", className: "status-cancelled" },
};

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function AppointmentList({ appointments }) {
  return (
    <section className="card">
      <h2>Foglalt időpontok</h2>

      {appointments.length === 0 ? (
        <p className="empty">Még nincs foglalt időpont.</p>
      ) : (
        <ul className="appointment-list">
          {appointments.map((a) => {
            const info = STATUS_INFO[a.status] || {
              label: a.status,
              className: "status-pending",
            };
            return (
              <li key={a.id} className="appointment-item">
                <div className="appointment-when">
                  <strong>{formatDate(a.date)}</strong>
                  <span className="appointment-time">
                    {a.start_time.slice(0, 5)}
                  </span>
                </div>
                <span className={`badge ${info.className}`}>{info.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default AppointmentList;