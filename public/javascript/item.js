const teddyID = new URL(window.location.href).searchParams.get("id");

const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

const getTeddyData = () => {
  return fetch(`http://localhost:3000/api/teddies/${teddyID}`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      alert("La connexion à la base de données n'a pas pu se faire.");
      console.error(error);
      throw error;
    });
};

const initialTeddy = getTeddyData();

window.onload = () => {
  initialTeddy.then((data) => {
    showTeddyData(data);
    updateTitle(data);
    showColorOptions(data);
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
  productContainer.querySelector(".tedPrice").textContent = `${teddyItem.price / 100},00€`;
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
  const couleur = document.querySelector("select#colors").value;
  const quantite = document.querySelector("select#quantity").value;
  const nom = document.getElementById("name").innerText;
  const prix = document.getElementById("price").innerText;
  const img = document.getElementById("image").src;
  const item = {
    id,
    couleur,
    quantite,
    details: {
      nom,
      prix,
      img,
    },
  };

  alert(`Vous allez ajouter la peluche ${nom} à votre panier.`);

  // add cart to local storage
  const items = (() => {
    const fieldValue = localStorage.getItem("cart");
    return fieldValue === null ? [] : JSON.parse(fieldValue);
  })();

  const itemFind = items.find((e) => e.id === item.id && e.couleur === item.couleur);

  if (itemFind) {
    itemFind.quantite = parseFloat(itemFind.quantite) + parseFloat(quantite);
  } else {
    items.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(items));
  window.location.reload();
};

if (getCart().length === 0) {
  document.getElementById("cartImg").src = "../images/cartempty.png";
} else {
  document.getElementById("cartImg").src = "../images/cartfull.png";
}
