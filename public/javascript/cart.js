window.onload = () => {
  teddiesInCart();
};

if (localStorage.length == 0) {
  console.log("le storage est vide");
  document.getElementById("totalPriceTag").innerText = `Votre Panier est vide ! Retournez à la page d'accueil pour commencer vos achats.`;
} else {
  console.log(localStorage);
}

document.getElementById("clear").onclick = () => {
  if (confirm("Êtes vous sûr de vouloir vider entièrement votre panier ?")) {
    window.localStorage.clear();
    window.location.reload();
  }
};

const cart = JSON.parse(localStorage.getItem("cart"));

console.log(cart);

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
