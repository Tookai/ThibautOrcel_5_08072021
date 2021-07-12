window.onload = () => {
  getTeddy();
};

const teddyID = new URL(window.location.href).searchParams.get("id");

const getTeddy = () => {
  fetch(`http://localhost:3000/api/teddies/${teddyID}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      showTeddyData(data);
      updateTitle(data);
      showColorOptions(data);
    })
    .catch((error) => {
      alert("La connexion à la base de données n'a pas pu se faire.");
      console.log(error);
    });
};

showTeddyData = (teddyItem) => {
  //
  // get & clone template
  const template = document.querySelector("template#single-item");
  const productContainer = document.importNode(template.content, true);

  // fill template
  productContainer.querySelector(".tedItem").setAttribute("id", teddyItem._id);
  productContainer.querySelector(".tedImage").setAttribute("src", teddyItem.imageUrl);
  productContainer.querySelector(".tedImage").setAttribute("alt", `Photo de l'ourson : ${teddyItem.name}`);
  productContainer.querySelector(".tedName").textContent = teddyItem.name;
  productContainer.querySelector(".tedPrice").textContent = `${teddyItem.price / 100},00 €`;
  productContainer.querySelector(".tedDescription").textContent = teddyItem.description;

  // render template
  document.getElementById("products").appendChild(productContainer);
};

updateTitle = (teddyItem) => {
  document.title = `Orinourson - ${teddyItem.name}`;
};

showColorOptions = (teddyItem) => {
  teddyItem.colors.map((color) => {
    //
    // get & clone template
    const template = document.querySelector("template#color-template");
    const optionsContainer = document.importNode(template.content, true);

    // fill template
    optionsContainer.querySelector(".color-options").setAttribute("value", color);
    optionsContainer.querySelector(".color-options").textContent = color;

    // render template
    document.getElementById("colors").appendChild(optionsContainer);
  });
};

document.getElementById("addToCart").onclick = () => {
  //
  // Create the item Object
  const id = teddyID;
  const nom = document.getElementById("name").innerText;
  const prix = document.getElementById("price").innerText;
  const img = document.getElementById("image").src;
  const item = {
    id,
    nom,
    prix,
    img,
  };

  // Alert on Click
  alert(`Vous allez ajouter la peluche ${nom} à votre panier.`);

  // Create empty array [] IF it doesnt exist
  const items = (() => {
    const fieldValue = localStorage.getItem("cart");
    return fieldValue === null ? [] : JSON.parse(fieldValue);
  })();

  // Add item object to the Items array
  items.push(item);

  // Add Items array of objects to the localStorage as a string
  localStorage.setItem("cart", JSON.stringify(items));

  // Reload the page
  window.location.reload();
};

if (localStorage.length == 0) {
  document.getElementById("cartImg").src = "../images/cartempty.png";
} else {
  document.getElementById("cartImg").src = "../images/cartfull.png";
  console.log(localStorage);
}
