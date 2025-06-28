const apiKey = "1374b3e80a3c0e958c41a5c6819970b8"; // استبدل هذا بمفتاح OpenWeather الخاص بك

const cities = [
  { name: "Amman", lat: 31.963158, lon: 35.930359 },
  { name: "Irbid", lat: 32.5514, lon: 35.8515 },
  { name: "Zarqa", lat: 32.07275, lon: 36.08796 },
  { name: "Aqaba", lat: 29.52667, lon: 35.00778 },
  { name: "Jerash", lat: 32.28000, lon: 35.90000 },
  { name: "Balqa", lat: 31.95000, lon: 35.71667 },
  { name: "Karak", lat: 31.18333, lon: 35.70000 },
  { name: "Ma'an", lat: 30.19266, lon: 35.72494 },
  { name: "Madaba", lat: 31.71667, lon: 35.80000 },
  { name: "Ajloun", lat: 32.33269, lon: 35.75179 },
  { name: "Mafraq", lat: 32.35000, lon: 36.20000 }
];

async function getWeatherByCoords(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.main?.temp ?? "N/A";
  } catch {
    return "Error";
  }
}

async function getAllWeather() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";
  for (const city of cities) {
    const temp = await getWeatherByCoords(city);
    tbody.innerHTML += `<tr><td>${city.name}</td><td>${temp}°</td></tr>`;
  }
}

async function searchWeather() {
  const inputEl = document.getElementById("searchInput");
  const input = inputEl.value.trim().toLowerCase();// or toUpperCase()
  const city = cities.find(c => c.name.toLowerCase() === input); // or toUpperCase()
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  if (city) {
    const temp = await getWeatherByCoords(city);
    tbody.innerHTML = `<tr><td>${city.name}</td><td>${temp}°</td></tr>`;
  } else {
    tbody.innerHTML = `<tr><td colspan="2">Governorate not found</td></tr>`;
  }

  inputEl.value = "";
}

// تشغيل البحث عند الضغط على Enter
document.getElementById("searchInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchWeather();
  }
});
