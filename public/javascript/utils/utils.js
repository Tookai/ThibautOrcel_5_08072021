const cart = JSON.parse(localStorage.getItem("cart"));

isValidFirstName = (e) => {
  if (text_regex.test(e.target.value)) {
    console.log("prénom vérifié");
    return true;
  } else {
    console.log("prénom pas bon");
    return false;
  }
};

if (isValidFirstName(firstName)) {
  firstNameInput.classList.add("valid");
  firstNameInput.classList.remove("invalid");
} else {
  firstNameInput.classList.add("invalid");
  firstNameInput.classList.remove("valid");
}
//
if (isValidLastName(lastName)) {
  lastNameInput.classList.add("valid");
  lastNameInput.classList.remove("invalid");
} else {
  lastNameInput.classList.add("invalid");
  lastNameInput.classList.remove("valid");
}
//
if (isValidAdress(adress)) {
  adressInput.classList.add("valid");
  adressInput.classList.remove("invalid");
} else {
  adressInput.classList.add("invalid");
  adressInput.classList.remove("valid");
}
//
if (isValidCity(city)) {
  cityInput.classList.add("valid");
  cityInput.classList.remove("invalid");
} else {
  cityInput.classList.add("invalid");
  cityInput.classList.remove("valid");
}
//
if (isValidEmail(email)) {
  emailInput.classList.add("valid");
  emailInput.classList.remove("invalid");
} else {
  emailInput.classList.add("invalid");
  emailInput.classList.remove("valid");
}
