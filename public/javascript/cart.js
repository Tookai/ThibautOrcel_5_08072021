window.onload = () => {
  teddiesInCart();
  totalCartPrice();
};

if (localStorage.length == 0) {
  document.getElementById("totalPriceTag").innerText = `Votre Panier est vide ! Retournez à la page d'accueil pour commencer vos achats.`;
}

const cart = JSON.parse(localStorage.getItem("cart"));

teddiesInCart = () => {
  cart.map((teddyItem) => {
    //
    // get & clone template
    const template = document.querySelector("template#cart-item");
    const productContainer = document.importNode(template.content, true);

    // fill template
    productContainer.querySelector(".tedImage").setAttribute("src", teddyItem.img);
    productContainer.querySelector(".tedImage").setAttribute("alt", `Photo de l'ourson : ${teddyItem.nom}`);
    productContainer.querySelector(".tedName").textContent = teddyItem.nom;
    productContainer.querySelector(".tedPrice").textContent = teddyItem.prix;

    // render template
    document.getElementById("cart").appendChild(productContainer);
  });
};

totalCartPrice = () => {
  const price = cart.map((teddyItem) => {
    return parseFloat(teddyItem.prix);
  });
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalPrice = price.reduce(reducer);
  document.getElementById("totalPriceTag").innerText = `Prix Total : ${totalPrice}€`;
};

// Clear localStorage
document.getElementById("clear").onclick = () => {
  if (confirm("Êtes vous sûr de vouloir vider entièrement votre panier ?")) {
    window.localStorage.clear();
    window.location.reload();
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("clientInfos");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  //
  // Watch Validity of contact infos
  let firstName = form.querySelector("input[id=firstName]");
  let lastName = form.querySelector("input[id=lastName]");
  let adress = form.querySelector("input[id=adress]");
  let city = form.querySelector("input[id=city]");
  let email = form.querySelector("input[id=email]");
  //
  //
  firstName.addEventListener("input", validate);
  lastName.addEventListener("input", validate);
  adress.addEventListener("input", validate);
  city.addEventListener("input", validate);
  email.addEventListener("input", validate);
  form.addEventListener("submit", validate);
  //
  //
  const email_regex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  //
  //
  function validate(e) {
    // First Name
    if (e.target.id == "firstName") {
      if (e.target.value.length >= 2) {
        e.target.classList.add("valid");
        e.target.classList.remove("invalid");
      } else {
        e.target.classList.add("invalid");
        e.target.classList.remove("valid");
      }
    }
    // Last Name
    if (e.target.id == "lastName") {
      if (e.target.value.length >= 2) {
        e.target.classList.add("valid");
        e.target.classList.remove("invalid");
      } else {
        e.target.classList.add("invalid");
        e.target.classList.remove("valid");
      }
    }
    // Adress
    if (e.target.id == "adress") {
      if (e.target.value.length >= 3) {
        e.target.classList.add("valid");
        e.target.classList.remove("invalid");
      } else {
        e.target.classList.add("invalid");
        e.target.classList.remove("valid");
      }
    }
    // City
    if (e.target.id == "city") {
      if (e.target.value.length >= 1) {
        e.target.classList.add("valid");
        e.target.classList.remove("invalid");
      } else {
        e.target.classList.add("invalid");
        e.target.classList.remove("valid");
      }
    }
    // Email
    if (e.target.id == "email") {
      if (email_regex.test(e.target.value)) {
        e.target.classList.add("valid");
        e.target.classList.remove("invalid");
      } else {
        e.target.classList.add("invalid");
        e.target.classList.remove("valid");
      }
    }
  }

  //
  // Get contact infos on Submit
  form.onsubmit = () => {
    const firstName = form.querySelector("input[id=firstName]").value;
    const lastName = form.querySelector("input[id=lastName]").value;
    const adress = form.querySelector("input[id=adress]").value;
    const city = form.querySelector("input[id=city]").value;
    const email = form.querySelector("input[id=email]").value;
    const contact = {
      firstName,
      lastName,
      adress,
      city,
      email,
    };
    console.log(contact);
  };
});
