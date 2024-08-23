import { getToken } from "./token";

const baseUrl = "http://localhost:3001";
const token = getToken();

export const checkError = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};
function getItems() {
  return fetch(`${baseUrl}/items`).then(checkError);
}
function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(checkError);
}
function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkError);
}
function addCardLike(itemId) {
  return fetch(`${baseUrl}/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkError);
}
function removeCardLike(itemId) {
  return fetch(`${baseUrl}/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkError);
}

export { getItems, addItem, deleteItem, addCardLike, removeCardLike };
