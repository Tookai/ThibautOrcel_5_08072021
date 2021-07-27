showTeddiesInCart = () => {
  getCart().map((teddyItem) => {
    //?
    //? get & clone template
    const template = document.querySelector("template#cart-item");
    const productContainer = document.importNode(template.content, true);
    const colorNoSpace = teddyItem.couleur.replace(/ /g, "");

    //? fill template
    productContainer.querySelector(".tedItem").setAttribute("id", `${teddyItem.id}${colorNoSpace}`);
    productContainer.querySelector(".tedImage").setAttribute("src", teddyItem.details.img);
    productContainer.querySelector(".tedImage").setAttribute("alt", `Photo de l'ourson : ${teddyItem.details.nom}`);
    productContainer.querySelector(".tedName").textContent = teddyItem.details.nom;
    productContainer.querySelector(".tedPrice").textContent = teddyItem.details.prix;
    productContainer.querySelector(".tedColor").textContent = teddyItem.couleur;
    productContainer.querySelector(".tedQuantity").textContent = teddyItem.quantite;
    productContainer.querySelector(".tedQuantity").setAttribute("id", `quantity-${teddyItem.id}${colorNoSpace}`);
    productContainer.querySelector(".tedTotal").textContent = `${parseFloat(teddyItem.details.prix) * parseFloat(teddyItem.quantite)},00€`;
    productContainer.querySelector(".tedTotal").setAttribute("id", `total-${teddyItem.id}${colorNoSpace}`);

    //? render template
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

//*
//*
totalCartItems = () => {
  const items = getCart().map((teddyItem) => {
    return parseFloat(teddyItem.quantite);
  });
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalItems = items.reduce(reducer);
  document.getElementById("totalItemsTag").innerText = `Quantité Totale : ${totalItems}`;
};

//*
//*
totalCartPrice = () => {
  const price = getCart().map((teddyItem) => {
    return parseFloat(teddyItem.details.prix) * parseFloat(teddyItem.quantite);
  });
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalPrice = price.reduce(reducer);
  document.getElementById("totalPriceTag").innerText = `Prix Total : ${totalPrice}€`;
};

//*
//* Clear localStorage
document.getElementById("clear").onclick = () => {
  if (confirm("Êtes vous sûr de vouloir vider entièrement votre panier ?")) {
    window.localStorage.clear();
    window.location.reload();
  }
};

//*
//* Add 1 in cart
const plus1 = document.querySelectorAll("button.plus1-btn");
for (let i = 0; i < plus1.length; i++) {
  let plus1_btn = plus1[i];
  plus1_btn.addEventListener("click", () => {
    const products = getCart();
    const product = products[i];
    const id = product.id;
    const color = product.couleur;
    const colorNoSpace = product.couleur.replace(/ /g, "");
    const quantity = document.querySelector(`#quantity-${id}${colorNoSpace}`);
    const total = document.querySelector(`#total-${id}${colorNoSpace}`);
    quantity.innerText = parseFloat(product.quantite) + 1;
    total.innerText = `${(parseFloat(product.quantite) + 1) * parseFloat(product.details.prix)},00€`;

    for (const product of products) {
      if (product.id === id && product.couleur === color) {
        product.quantite++;
      }
    }
    localStorage.setItem("cart", JSON.stringify(products));
    totalCartPrice();
    totalCartItems();
  });
}

//*
//* Remove 1 from cart
const minus1 = document.querySelectorAll("button.minus1-btn");
for (let i = 0; i < minus1.length; i++) {
  let minus1_btn = minus1[i];
  minus1_btn.addEventListener("click", () => {
    const products = getCart();
    const product = products[i];
    const id = product.id;
    const name = product.nom;
    const color = product.couleur;
    const colorNoSpace = product.couleur.replace(/ /g, "");
    const quantity = document.querySelector(`#quantity-${id}${colorNoSpace}`);
    const total = document.querySelector(`#total-${id}${colorNoSpace}`);

    if (product.quantite > 1) {
      quantity.innerText = parseFloat(product.quantite) - 1;
      total.innerText = `${(parseFloat(product.quantite) - 1) * parseFloat(product.details.prix)},00€`;
      for (const product of products) {
        if (product.id === id && product.couleur === color) {
          product.quantite--;
        }
      }
    } else if ((product.quantite = 1)) {
      if (confirm(`Êtes vous sûr de vouloir complètement supprimer l'ourson : ${name} de la couleur : ${color} de votre panier ?`)) {
        products.splice(i, 1);
        window.location.reload();
      }
    }

    localStorage.setItem("cart", JSON.stringify(products));
    totalCartPrice();
    totalCartItems();
  });
}
