// Nairobi, Kenya coordinates
const latitude = -1.286389;
const longitude = 36.817223;
const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`;

// Convert weather code to group name
function weatherCodeToGroup(code) {
  if (code === 0) return "Clear";
  if (code === 1 || code === 2) return "Clear/Cloudy";
  if ([3, 45, 48].includes(code)) return "Cloudy";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) return "Raining";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snowing";
  return "Unknown";
}

// Weather icons by group
const weatherIcons = {
  "Clear": "icons/clear.jpeg",
  "Clear/Cloudy": "icons/clear_cloudy.png",
  "Cloudy": "icons/cloudy.jpeg",
  "Raining": "icons/raining.jpeg",
  "Snowing": "icons/snowing.jpeg",
  "Unknown": "icons/unknown.png"
};

// Fetch weather data
fetch(url)
  .then(res => res.json())
  .then(data => {
    const temp = data.current.temperature_2m;
    const code = data.current.weather_code;
    const group = weatherCodeToGroup(code);

    document.getElementById("temperature").textContent = `Temperature: ${temp} °C`;
    document.getElementById("description").textContent = `Conditions: ${group}`;

    const icon = weatherIcons[group] || weatherIcons["Unknown"];
    document.getElementById("weather-icon").src = icon;
  })
  .catch(err => {
    console.error(err);
    document.getElementById("temperature").textContent = "Failed to load";
    document.getElementById("description").textContent = "";
  });

// Display date
const today = new Date();
const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
const monthName = today.toLocaleDateString("en-US", { month: "long" });
const dayNumber = today.getDate();
document.getElementById("date").textContent = `${dayName}, ${monthName} ${dayNumber}`;

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.remove("sunrise");
    document.body.classList.add("sunset");
  } else {
    document.body.classList.remove("sunset");
    document.body.classList.add("sunrise");
  }
});
