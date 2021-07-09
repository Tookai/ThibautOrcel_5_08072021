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
  form.onsubmit = (e) => {
    e.preventDefault();
    console.log("click");
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
