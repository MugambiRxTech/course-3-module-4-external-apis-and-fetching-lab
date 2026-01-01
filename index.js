// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#state-input");
  const button = document.querySelector("#fetch-alerts");
  const alertsDisplay = document.querySelector("#alerts-display");
  const errorMessage = document.querySelector("#error-message");

  // Step 1: Fetch Alerts for a State from the API
  function fetchWeatherAlerts(state) {
    fetch(weatherApi + state)
      .then(response => response.json())
      .then(data => {
        // Step 4: Clear error on success
        errorMessage.textContent = "";
        errorMessage.classList.add("hidden");
        
        // Step 2: Display the Alerts on the Page
        displayAlerts(data);
      })
      .catch(error => {
        // Step 4: Show error message
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
      });
  }

  // Step 2: Display the Alerts on the Page
  function displayAlerts(data) {
    const alertCount = data.features.length;
    
    // Clear previous data and build new content
    alertsDisplay.innerHTML = "";
    
    // Summary message
    const summary = document.createElement("p");
    summary.textContent = `Weather Alerts: ${alertCount}`;
    alertsDisplay.appendChild(summary);
    
    // List of alert headlines
    data.features.forEach(feature => {
      const alertItem = document.createElement("p");
      alertItem.textContent = feature.properties.headline;
      alertsDisplay.appendChild(alertItem);
    });
  }

  // Button click handler
  button.addEventListener("click", () => {
    const state = input.value;
    fetchWeatherAlerts(state);
    
    // Step 3: Clear input after fetch
    input.value = "";
  });
});