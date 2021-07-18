const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

const cartId = getCart().map((item) => {
  return item.id;
});

const form = document.getElementById("clientInfos");

if (getCart().length === 0) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(`Ben allons, votre panier est vide, vous ne pouvez pas commander !`);
  });
} else {
  window.addEventListener("DOMContentLoaded", () => {
    //
    // Get form Input
    const firstNameInput = form.querySelector("input[id=firstName]");
    const lastNameInput = form.querySelector("input[id=lastName]");
    const addressInput = form.querySelector("input[id=address]");
    const cityInput = form.querySelector("input[id=city]");
    const emailInput = form.querySelector("input[id=email]");
    //
    // Regular Expressions & Testing
    const text_regex = /^[A-Za-z]{2,60}/;
    const address_regex = /^[A-Za-z -,0-9]{5,}/;
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
    const isValidAddress = (address) => {
      return address_regex.test(address);
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
    addressInput.addEventListener("submit", isValidAddress);
    cityInput.addEventListener("submit", isValidCity);
    emailInput.addEventListener("submit", isValidEmail);
    //
    // Get contact infos on Submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const firstName = firstNameInput.value;
      const lastName = lastNameInput.value;
      const address = addressInput.value;
      const city = cityInput.value;
      const email = emailInput.value;
      const contact = {
        firstName,
        lastName,
        address,
        city,
        email,
      };
      //
      const validations = [
        isValidFirstName(firstName),
        isValidLastName(lastName),
        isValidAddress(address),
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
      if (isValidAddress(address)) {
        addressInput.classList.add("valid");
        addressInput.classList.remove("invalid");
      } else {
        addressInput.classList.add("invalid");
        addressInput.classList.remove("valid");
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

        const order = {
          contact,
          products: cartId,
        };

        const sendOrder = {
          method: "POST",
          body: JSON.stringify(order),
          headers: { "Content-Type": "application/json" },
        };

        fetch("http://localhost:3000/api/teddies/order", sendOrder)
          .then((response) => response.json())
          .then((json) => {
            console.log(json.orderId);
            window.location.href = `command.html?orderId=${json.orderId}`;
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });

        // add contact infos to local storage
        const contact_infos = (() => {
          const fieldValue = localStorage.getItem("contact");
          return fieldValue === null ? [] : JSON.parse(fieldValue);
        })();
        contact_infos.push(contact);
        localStorage.setItem("contact", JSON.stringify(contact_infos));

        console.log(localStorage);
      } else {
        alert(`Tu t'es trompé mon gars`);
      }
    });
  });
}
