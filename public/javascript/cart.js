const cart = JSON.parse(localStorage.getItem("cart"));

if (cart === 0) {
  document.getElementById("totalPriceTag").innerText = `Votre Panier est vide ! Retournez à la page d'accueil pour commencer vos achats.`;
  document.getElementById("clear").classList.add("hide");
} else {
  window.onload = () => {
    teddiesInCart();
    totalCartPrice();
  };
}

teddiesInCart = () => {
  cart.map((teddyItem) => {
    //
    // get & clone template
    const template = document.querySelector("template#cart-item");
    const productContainer = document.importNode(template.content, true);

    // fill template
    productContainer.querySelector(".tedItem").setAttribute("id", teddyItem.id);
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
