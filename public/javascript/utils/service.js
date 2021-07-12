export const getTeddiesData = () => {
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