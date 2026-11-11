const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");

const dayLabel = document.querySelector("#day-label");
const monthLabel = document.querySelector("#month-label");
const yearLabel = document.querySelector("#year-label");

const yearsResult = document.querySelector(".year-date");
const monthsResult = document.querySelector(".month-date");
const daysResult = document.querySelector(".day-date");

const dayError = document.querySelector("#day-error");
const monthError = document.querySelector("#month-error");
const yearError = document.querySelector("#year-error");

const btnCalc = document.querySelector(".btn-calc");

const newValues = [];

btnCalc.addEventListener("click", calculateAge);

function clearErrors() {
  dayError.textContent = "";
  monthError.textContent = "";
  yearError.textContent = "";

  document.querySelectorAll("input").forEach((input) => {
    input.classList.remove("invalid");
  });
}

function calculateAge() {
  clearErrors();
  const day = Number(dayInput.value);
  const month = Number(monthInput.value);
  const year = Number(yearInput.value);

  const today = new Date();
  const currentYear = today.getFullYear();

  let valid = true;

  // Required field validation
  if (!dayInput.value) {
    dayError.textContent = "This field is required";
    dayInput.classList.add("invalid");
    dayLabel.classList.add("invalid");
    valid = false;
  }

  if (!monthInput.value) {
    monthError.textContent = "This field is required";
    monthInput.classList.add("invalid");
    monthLabel.classList.add("invalid");
    valid = false;
  }

  if (!yearInput.value) {
    yearError.textContent = "This field is required";
    yearInput.classList.add("invalid");
    yearLabel.classList.add("invalid");
    valid = false;
  }

  if (!valid) return;

  // Basic range validation
  if (day < 1 || day > 31) {
    dayError.textContent = "Must be a valid day";
    dayInput.classList.add("invalid");
    dayLabel.classList.add("invalid");
    valid = false;
  }

  if (month < 1 || month > 12) {
    monthError.textContent = "Must be a valid month";
    monthInput.classList.add("invalid");
    month.classList.add("invalid");
    valid = false;
  }

  if (year > currentYear || year < 1) {
    yearError.textContent = "Must be in the past";
    yearInput.classList.add("invalid");
    yearLabel.classList.add("invalid");
    valid = false;
  }

  // Check whether the complete date actually exists
  const birthDate = new Date(year, month - 1, day);

  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    dayError.textContent = "Must be a valid date";
    dayInput.classList.add("invalid");
    dayLabel.classList.add("invalid");
    valid = false;
  }

  if (!valid) return;

  // Calculate age
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;

    // Number of days in the previous month
    const previousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate();

    days += previousMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Prevent future dates
  if (birthDate > today) {
    yearError.textContent = "Date must be in the past";
    yearInput.classList.add("invalid");
    yearLabel.classList.add("invalid");
    return;
  }

  // Display result
  yearsResult.textContent = years;
  monthsResult.textContent = months;
  daysResult.textContent = days;
}
