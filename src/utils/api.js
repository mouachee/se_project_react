const baseUrl = "http://localhost:3001";
const checkErrorr = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};
function getItems() {
  return fetch(`${baseUrl}/items`).then(checkErrorr);
}
function addCard({ name, link }) {
  return fetch(`${baseUrl}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(checkErrorr);
}
export { getItems, addCard };
