import { useState } from "react";
import { createAppointment } from "../services/api";

function BookingForm({ onCreated }) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      await createAppointment({ date, start_time: startTime });
      setSuccess(true);
      setDate("");
      setStartTime("");
      onCreated();
    } catch (err) {
      if (err.details) {
        setError(JSON.stringify(err.details));
      } else {
        setError("A szerver nem érhető el. Fut a backend?");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card booking-form">
      <h2>Időpontfoglalás</h2>

      <div className="form-row">
        <label>
          Dátum
          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <label>
          Időpont
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Küldés..." : "Foglalás"}
      </button>

      {success && <p className="alert alert-success">Sikeres foglalás!</p>}
      {error && <p className="alert alert-error">{error}</p>}
    </form>
  );
}

export default BookingForm;