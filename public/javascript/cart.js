showTeddiesInCart = () => {
  getCart().map((teddyItem) => {
    //
    // get & clone template
    const template = document.querySelector("template#cart-item");
    const productContainer = document.importNode(template.content, true);
    const colorNoSpace = teddyItem.couleur.replace(/ /g, "");

    // fill template
    productContainer.querySelector(".tedItem").setAttribute("id", `${teddyItem.id}${colorNoSpace}`);
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

if (getCart().length === 0) {
  document.getElementById("totalPriceTag").innerText = `Votre Panier est vide ! Retournez à la page d'accueil pour commencer vos achats.`;
  document.getElementById("clear").classList.add("hide");
} else {
  showTeddiesInCart();
  window.onload = () => {
    totalCartPrice();
    totalCartItems();
  };
}

//
//
totalCartItems = () => {
  const items = getCart().map((teddyItem) => {
    return parseFloat(teddyItem.quantite);
  });
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalItems = items.reduce(reducer);
  document.getElementById("totalItemsTag").innerText = `Quantité Totale : ${totalItems}`;
};

//
//
totalCartPrice = () => {
  const price = getCart().map((teddyItem) => {
    return parseFloat(teddyItem.details.prix) * parseFloat(teddyItem.quantite);
  });
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalPrice = price.reduce(reducer);
  document.getElementById("totalPriceTag").innerText = `Prix Total : ${totalPrice}€`;
};

//
// Clear localStorage
document.getElementById("clear").onclick = () => {
  if (confirm("Êtes vous sûr de vouloir vider entièrement votre panier ?")) {
    window.localStorage.clear();
    window.location.reload();
  }
};

//
// Remove 1 from cart
const minus1 = document.querySelectorAll("button.minus1-btn");
for (let i = 0; i < minus1.length; i++) {
  let minus1_btn = minus1[i];
  minus1_btn.addEventListener("click", () => {
    const items = (() => {
      const fieldValue = localStorage.getItem("cart");
      return fieldValue === null ? [] : JSON.parse(fieldValue);
    })();

    const id = items[i].id;
    const color = items[i].couleur;
    const name = items[i].details.nom;

    const itemFind = items.find((e) => e.id === id && e.couleur === color);

    if (itemFind.quantite > 1) {
      itemFind.quantite = parseFloat(itemFind.quantite) - 1;
    } else if ((itemFind.quantite = 1)) {
      if (confirm(`Êtes vous sûr de vouloir complètement supprimer l'ourson : ${name} de la couleur : ${color} de votre panier ?`)) {
        items.splice(i, 1);
      }
    }

    localStorage.setItem("cart", JSON.stringify(items));
    window.location.reload();
  });
}

//
// Add 1 in cart
const plus1 = document.querySelectorAll("button.plus1-btn");
for (let i = 0; i < plus1.length; i++) {
  let plus1_btn = plus1[i];
  plus1_btn.addEventListener("click", () => {
    const items = (() => {
      const fieldValue = localStorage.getItem("cart");
      return fieldValue === null ? [] : JSON.parse(fieldValue);
    })();

    const id = items[i].id;
    const color = items[i].couleur;

    const itemFind = items.find((e) => e.id === id && e.couleur === color);

    itemFind.quantite = parseFloat(itemFind.quantite) + 1;

    localStorage.setItem("cart", JSON.stringify(items));
    window.location.reload();
  });
}
