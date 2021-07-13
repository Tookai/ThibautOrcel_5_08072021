const getTeddiesData = () => {
  return fetch("http://localhost:3000/api/teddies")
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      alert("La connexion à la base de données n'a pas pu se faire.");
      console.error(error);
      throw error;
    });
};

const initialTeddies = getTeddiesData();

window.onload = () => {
  initialTeddies.then((data) => {
    showTeddiesData(data);
  });
};

showTeddiesData = (teddiesData) => {
  teddiesData.map((teddyItem) => {
    //
    // get & clone template
    const template = document.querySelector("template#index-item");
    const productContainer = document.importNode(template.content, true);

    // fill template
    productContainer.querySelector(".tedItem").setAttribute("id", teddyItem._id);
    productContainer.querySelector(".tedImage").setAttribute("src", teddyItem.imageUrl);
    productContainer.querySelector(".tedImage").setAttribute("alt", `Photo de l'ourson : ${teddyItem.name}`);
    productContainer.querySelector(".tedName").textContent = teddyItem.name;
    productContainer.querySelector(".tedPrice").textContent = `${teddyItem.price / 100},00 €`;
    productContainer.querySelector(".tedDescription").textContent = teddyItem.description;
    productContainer.querySelector(".tedRedirect").setAttribute("href", `item.html?id=${teddyItem._id}`);

    // render template
    document.getElementById("products").appendChild(productContainer);
  });
};

if (JSON.parse(localStorage.getItem("cart")) == undefined) {
  document.getElementById("cartImg").src = "../images/cartempty.png";
} else {
  document.getElementById("cartImg").src = "../images/cartfull.png";
}
