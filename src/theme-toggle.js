const themeToggle = document.getElementById("theme-toggle");
const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

if (themeToggle) {
  function applyTheme() {
    // Determine if the dark theme should be applied:
    // - User has explicitly selected 'dark' in localStorage, or
    // - No explicit theme in localStorage, but the system prefers dark mode
    const isDark = (localStorage.getItem("theme") === "dark") || (!("theme" in localStorage) && themeMediaQuery.matches);
  
    // Apply the 'dark' class to the root element if isDark is true; remove it otherwise
    document.documentElement.classList.toggle("dark", isDark);
  
    // Set the state of the theme toggle UI element to match the current theme
    themeToggle.checked = isDark;
  }
  
  applyTheme();
  
  function setUserTheme(theme) {
    localStorage.setItem("theme", theme);
    applyTheme();
  }
  
  themeToggle.addEventListener("change", (e) => {
    const theme = e.target.checked ? "dark" : "light";
    setUserTheme(theme);
  });
  
  themeMediaQuery.addEventListener("change", (e) => {
    const theme = e.matches ? "dark" : "light";
    setUserTheme(theme);
  });  
}
