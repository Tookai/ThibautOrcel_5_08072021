const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

const setContactInfos = () => {
  return JSON.parse(localStorage.getItem("contact")) || [];
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
    //!
    //! Get form Input
    const firstNameInput = form.querySelector("input[id=firstName]");
    const lastNameInput = form.querySelector("input[id=lastName]");
    const addressInput = form.querySelector("input[id=address]");
    const cityInput = form.querySelector("input[id=city]");
    const emailInput = form.querySelector("input[id=email]");
    //!
    //! Regular Expressions & Testing
    const text_regex = /^[A-Za-z]{2,60}/;
    const address_regex = /^[A-Za-z -,0-9]{5,}/;
    const email_regex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    //*
    //*
    const isValidText = (value) => {
      return text_regex.test(value);
    };
    //*
    const isValidAddress = (address) => {
      return address_regex.test(address);
    };
    //*
    const isValidEmail = (email) => {
      return email_regex.test(email);
    };

    //!
    //! Get contact infos on Submit
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

      const formValidationData = [
        {
          func: isValidText,
          value: firstName,
          input: firstNameInput,
        },
        {
          func: isValidText,
          value: lastName,
          input: lastNameInput,
        },
        {
          func: isValidAddress,
          value: address,
          input: addressInput,
        },
        {
          func: isValidText,
          value: city,
          input: cityInput,
        },
        {
          func: isValidEmail,
          value: email,
          input: emailInput,
        },
      ];

      //*
      //* display form validity
      function toggleValidationClass(func, value, input) {
        if (func(value)) {
          input.classList.add("valid");
          input.classList.remove("invalid");
        } else {
          input.classList.add("invalid");
          input.classList.remove("valid");
        }
      }
      //*
      formValidationData.forEach((data) => toggleValidationClass(data.func, data.value, data.input));


      //*
      //*
      const validations = [isValidText(firstName), isValidText(lastName), isValidAddress(address), isValidText(city), isValidEmail(email)];
      const isFormValid = validations.every((isValid) => isValid);

      if (isFormValid) {
        const order = {
          contact,
          products: cartId,
        };

        const orderOptions = {
          method: "POST",
          body: JSON.stringify(order),
          headers: { "Content-Type": "application/json" },
        };

        fetch("http://localhost:3000/api/teddies/order", orderOptions)
          .then((response) => response.json())
          .then((json) => {
            window.location.href = `command.html?orderId=${json.orderId}`;
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });

        //*
        //* add contact infos to local storage
        const contactInfos = setContactInfos()
        contactInfos.push(contact);
        localStorage.setItem("contact", JSON.stringify(contactInfos));
      } else {
        alert(`Veuillez vérifier que les champs du formulaire soient remplis correctement.`);
      }
    });
  });
}
