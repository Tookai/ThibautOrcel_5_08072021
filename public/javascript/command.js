(() => {
  const orderId = new URL(location.href).searchParams.get("orderId") || "ERREUR";
  document.getElementById("commandId").textContent = orderId;
})();

const getContactInfos = () => {
  return JSON.parse(localStorage.getItem("contact")) || [];
};

const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

console.log(getCart());
console.log(getContactInfos());

getCart().map((teddyItem) => {
  //
  // get & clone template
  const template = document.querySelector("template#command-item");
  const productContainer = document.importNode(template.content, true);

  // fill template
  productContainer.querySelector(".tedItem").setAttribute("id", teddyItem.id);
  productContainer.querySelector(".tedName").textContent = teddyItem.nom;
  productContainer.querySelector(".tedPrice").textContent = teddyItem.prix;

  // render template
  document.getElementById("products").appendChild(productContainer);
});

totalCartPrice = () => {
  const price = getCart().map((teddyItem) => {
    return parseFloat(teddyItem.prix);
  });
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalPrice = price.reduce(reducer);
  document.getElementById("totalPriceTag").innerText = `Prix Total : ${totalPrice}€`;
};

totalCartPrice();

/* ADD BACK TO START BUTTON QUI CLEAR LE LOCAL STORAGE */
