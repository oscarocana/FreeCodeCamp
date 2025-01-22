const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

const validatePhoneNumber = (input) => {
  const validPatterns = [
    /^1?\s?\d{3}-\d{3}-\d{4}$/,         // 1 555-555-5555 or 555-555-5555
    /^1?\s?\(\d{3}\)\s?\d{3}-\d{4}$/,  // 1 (555) 555-5555 or (555) 555-5555
    /^1?\s?\d{3}\s\d{3}\s\d{4}$/,      // 1 555 555 5555
    /^1?\d{10}$/,                      // 15555555555 or 5555555555
    /^1?\(\d{3}\)\d{3}-\d{4}$/,        // 1(555)555-5555 or (555)555-5555
  ];

  // Ensure the input matches any of the valid patterns
  const isValid = validPatterns.some((pattern) => pattern.test(input.trim()));

  // Country code validation
  const countryCodeMatches = input.match(/^1/);
  const hasValidCountryCode = !countryCodeMatches || countryCodeMatches[0] === "1";

  return isValid && hasValidCountryCode;
};

checkBtn.addEventListener("click", () => {
  const input = userInput.value.trim();

  if (!input) {
    alert("Please provide a phone number");
    return;
  }

  if (validatePhoneNumber(input)) {
    resultsDiv.textContent = `Valid US number: ${input}`;
    resultsDiv.style.color = "green";
  } else {
    resultsDiv.textContent = `Invalid US number: ${input}`;
    resultsDiv.style.color = "red";
  }
});

clearBtn.addEventListener("click", () => {
  resultsDiv.textContent = "";
  userInput.value = "";
});
