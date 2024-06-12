const baseUrl = "http://localhost:3001";
const checkErrorr = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};
function getItems() {
  return fetch(`${baseUrl}/items`).then(checkErrorr);
}
function addItem({ name, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageUrl,
    }),
  }).then(checkErrorr);
}
export { getItems, addItem };
