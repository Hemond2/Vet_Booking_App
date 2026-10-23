const API_URL = "http://127.0.0.1:8000/api";

async function handleResponse(response) {
  if (!response.ok) {
    let details = null;
    try {
      details = await response.json();
    } catch {
      // a válasz nem JSON volt
    }
    const error = new Error("Hiba a szerverrel való kommunikáció során");
    error.details = details;
    throw error;
  }
  return response.json();
}

export async function getAppointments() {
  const response = await fetch(`${API_URL}/appointments/`);
  return handleResponse(response);
}

export async function createAppointment(data) {
  const response = await fetch(`${API_URL}/appointments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}