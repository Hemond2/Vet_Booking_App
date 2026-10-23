function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? "Váltás világos módra" : "Váltás sötét módra"}
      title={isDark ? "Világos mód" : "Sötét mód"}
    >
      <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
      <span className="theme-toggle-text">{isDark ? "Világos" : "Sötét"}</span>
    </button>
  );
}

export default ThemeToggle;