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
