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
      console.log(data);
      showTeddyData(data);
      updateTitle(data);
      colorOptions(data);
    });
  /*     .catch((error) => {
      alert("La connexion n'a pas pu se faire.");
    }); */
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

colorOptions = (teddyItem) => {
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
