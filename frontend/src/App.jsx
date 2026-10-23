import { useEffect, useState } from "react";
import BookingForm from "./components/BookingForm";
import AppointmentList from "./components/AppointmentList";
import { getAppointments } from "./services/api";
import "./App.css";

function App() {
  const [appointments, setAppointments] = useState([]);
  const [loadError, setLoadError] = useState("");

  async function loadAppointments() {
    try {
      const data = await getAppointments();
      setAppointments(data);
      setLoadError("");
    } catch {
      setLoadError("Az időpontok betöltése nem sikerült. Fut a backend?");
    }
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div className="container">
      <h1>Állatorvosi időpontfoglaló</h1>
      <BookingForm onCreated={loadAppointments} />
      {loadError && <p className="error">{loadError}</p>}
      <AppointmentList appointments={appointments} />
    </div>
  );
}

export default App;