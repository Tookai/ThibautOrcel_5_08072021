if (cart === 0) {
} else {
  window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("clientInfos");
    //
    // Get form Input
    const firstNameInput = form.querySelector("input[id=firstName]");
    const lastNameInput = form.querySelector("input[id=lastName]");
    const adressInput = form.querySelector("input[id=adress]");
    const cityInput = form.querySelector("input[id=city]");
    const emailInput = form.querySelector("input[id=email]");
    //
    // Regular Expressions & Testing
    const text_regex = /^[A-Za-z]{2,60}/;
    const adress_regex = /^[A-Za-z -,0-9]{5,}/;
    const email_regex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //
    //
    const isValidFirstName = (firstName) => {
      return text_regex.test(firstName);
    };

    //
    const isValidLastName = (lastName) => {
      return text_regex.test(lastName);
    };
    //
    const isValidAdress = (adress) => {
      return adress_regex.test(adress);
    };
    //
    const isValidCity = (city) => {
      return text_regex.test(city);
    };
    //
    const isValidEmail = (email) => {
      return email_regex.test(email);
    };
    //
    // Validation
    firstNameInput.addEventListener("submit", isValidFirstName);
    lastNameInput.addEventListener("submit", isValidLastName);
    adressInput.addEventListener("submit", isValidAdress);
    cityInput.addEventListener("submit", isValidCity);
    emailInput.addEventListener("submit", isValidEmail);
    //
    // Get contact infos on Submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const firstName = firstNameInput.value;
      const lastName = lastNameInput.value;
      const adress = adressInput.value;
      const city = cityInput.value;
      const email = emailInput.value;
      const contact = {
        firstName,
        lastName,
        adress,
        city,
        email,
      };
      //
      const validations = [
        isValidFirstName(firstName),
        isValidLastName(lastName),
        isValidAdress(adress),
        isValidCity(city),
        isValidEmail(email),
      ];
      const isFormValid = validations.every((isValid) => isValid);
      //
      // Display Style
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
      //
      //
      if (isFormValid) {
        alert("OK TOUT EST BON");
        console.log(contact);
      } else {
        alert(`Tu t'es trompé mon gars`);
      }
    });
  });
}
