const orderId = new URL(location.href).searchParams.get("orderId");
document.getElementById("commandId").textContent = orderId;

const getContactInfos = () => {
  return JSON.parse(localStorage.getItem("contact")) || [];
};

const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

window.onload = () => {
  showTeddiesInCommand();
  totalCartPrice();
  totalCartItems();
  showContactInCommand();
};

// TEST
showTeddiesInCommand = () => {
  getCart().map((teddyItem) => {
    //
    // get & clone template
    const template = document.querySelector("template#command-item");
    const productContainer = document.importNode(template.content, true);
    const colorNoSpace = teddyItem.couleur.replace(/ /g, "");

    // fill template
    productContainer.querySelector(".tedItem").setAttribute("id", `${teddyItem.details.id}${colorNoSpace}`);
    productContainer.querySelector(".tedName").textContent = teddyItem.details.nom;
    productContainer.querySelector(".tedPrice").textContent = teddyItem.details.prix;
    productContainer.querySelector(".tedColor").textContent = teddyItem.couleur;
    productContainer.querySelector(".tedQuantity").textContent = teddyItem.quantite;
    productContainer.querySelector(".tedTotal").textContent = `${parseFloat(teddyItem.details.prix) * parseFloat(teddyItem.quantite)},00€`;

    // render template
    document.getElementById("products").appendChild(productContainer);
  });
};

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
//
// TEST
showContactInCommand = () => {
  getContactInfos().map((contact) => {
    //
    // get & clone template
    const template = document.querySelector("template#contact-infos");
    const productContainer = document.importNode(template.content, true);

    // fill template
    productContainer.querySelector("#name").textContent = `${contact.firstName} ${contact.lastName}`;
    productContainer.querySelector("#address").textContent = contact.address;
    productContainer.querySelector("#city").textContent = contact.city;
    productContainer.querySelector("#email").textContent = contact.email;

    // render template
    document.getElementById("contact").appendChild(productContainer);
  });
};

//
// BACK TO START BUTTON QUI CLEAR LE LOCAL STORAGE
// TEST
const goBackBtn = document.querySelector("button#backToStart");
goBackBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = `index.html`;
});

//
// Clear local storage in case of closed tab or history back btn
// TEST
window.addEventListener("beforeunload", () => {
  localStorage.clear();
});
