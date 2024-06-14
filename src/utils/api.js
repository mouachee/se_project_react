const baseUrl = "http://localhost:3001";
const checkErrorr = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};
function getItems() {
  return fetch(`${baseUrl}/items`).then(checkErrorr);
}
function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(checkErrorr);
}
function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkErrorr);
}
export { getItems, addItem, deleteItem };
