document.getElementById("convert-btn").addEventListener("click", () => {
  const numberInput = document.getElementById("number").value;
  const output = document.getElementById("output");

  // Validate input
  if (!numberInput) {
    output.textContent = "Please enter a valid number";
    return;
  }

  const number = parseInt(numberInput, 10);

  if (number < 1) {
    output.textContent = "Please enter a number greater than or equal to 1";
    return;
  }

  if (number >= 4000) {
    output.textContent = "Please enter a number less than or equal to 3999";
    return;
  }

  // Function to convert to Roman Numeral
  const convertToRoman = (num) => {
    const romanNumerals = [
      { value: 1000, numeral: "M" },
      { value: 900, numeral: "CM" },
      { value: 500, numeral: "D" },
      { value: 400, numeral: "CD" },
      { value: 100, numeral: "C" },
      { value: 90, numeral: "XC" },
      { value: 50, numeral: "L" },
      { value: 40, numeral: "XL" },
      { value: 10, numeral: "X" },
      { value: 9, numeral: "IX" },
      { value: 5, numeral: "V" },
      { value: 4, numeral: "IV" },
      { value: 1, numeral: "I" },
    ];

    let result = "";

    for (const { value, numeral } of romanNumerals) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }

    return result;
  };

  // Convert and display the result
  const romanNumeral = convertToRoman(number);
  output.textContent = romanNumeral;
});
