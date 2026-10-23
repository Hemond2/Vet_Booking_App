import { useEffect, useState } from "react";
import BookingForm from "./components/BookingForm";
import AppointmentList from "./components/AppointmentList";
import ThemeToggle from "./components/ThemeToggle";
import { getAppointments } from "./services/api";
import "./App.css";

function getInitialTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // a böngésző tárolója nem elérhető
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function App() {
  const [appointments, setAppointments] = useState([]);
  const [loadError, setLoadError] = useState("");
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // nem baj, ha nem sikerül elmenteni
    }
  }, [theme]);

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

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <div className="container">
      <header className="app-header">
        <h1>🐾 Állatorvosi időpontfoglaló</h1>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      <BookingForm onCreated={loadAppointments} />
      {loadError && <p className="alert alert-error">{loadError}</p>}
      <AppointmentList appointments={appointments} />
    </div>
  );
}

export default App;