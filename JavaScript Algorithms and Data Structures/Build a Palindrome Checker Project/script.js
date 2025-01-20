document.getElementById("check-btn").addEventListener("click", () => {
  const inputElement = document.getElementById("text-input");
  const resultElement = document.getElementById("result");
  const userInput = inputElement.value.trim();

  // Alert if no input is provided
  if (!userInput) {
    alert("Please input a value");
    return;
  }

  // Function to clean the input
  const cleanInput = (str) => {
    return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  };

  const cleanedInput = cleanInput(userInput);
  const reversedInput = cleanedInput.split("").reverse().join("");

  // Check if it's a palindrome
  if (cleanedInput === reversedInput) {
    resultElement.textContent = `${userInput} is a palindrome`;
  } else {
    resultElement.textContent = `${userInput} is not a palindrome`;
  }
});
