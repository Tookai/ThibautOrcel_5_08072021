if (getCart().length === 0) {
  document.getElementById("totalPriceTag").innerText = `Votre Panier est vide ! Retournez à la page d'accueil pour commencer vos achats.`;
  document.getElementById("clear").classList.add("hide");
} else {
  window.onload = () => {
    showTeddiesInCart();
    totalCartPrice();
    totalCartItems();
  };
}

showTeddiesInCart = () => {
  getCart().map((teddyItem) => {
    //
    // get & clone template
    const template = document.querySelector("template#cart-item");
    const productContainer = document.importNode(template.content, true);

    // fill template
    productContainer.querySelector(".tedItem").setAttribute("id", `${teddyItem.id}${teddyItem.couleur}`);
    productContainer.querySelector(".tedImage").setAttribute("src", teddyItem.details.img);
    productContainer.querySelector(".tedImage").setAttribute("alt", `Photo de l'ourson : ${teddyItem.details.nom}`);
    productContainer.querySelector(".tedName").textContent = teddyItem.details.nom;
    productContainer.querySelector(".tedPrice").textContent = teddyItem.details.prix;
    productContainer.querySelector(".tedColor").textContent = teddyItem.couleur;
    productContainer.querySelector(".tedQuantity").textContent = teddyItem.quantite;
    productContainer.querySelector(".tedTotal").textContent = `${parseFloat(teddyItem.details.prix) * parseFloat(teddyItem.quantite)},00€`;

    // render template
    document.getElementById("cart").appendChild(productContainer);
  });
};

totalCartItems = () => {
  const items = getCart().map((teddyItem) => {
    return parseFloat(teddyItem.quantite);
  });
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalItems = items.reduce(reducer);
  document.getElementById("totalItemsTag").innerText = `Quantité Totale : ${totalItems}`;
};

totalCartPrice = () => {
  const price = getCart().map((teddyItem) => {
    return parseFloat(teddyItem.details.prix) * parseFloat(teddyItem.quantite);
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
