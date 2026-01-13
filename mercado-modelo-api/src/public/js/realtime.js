const socket = io();

const list = document.getElementById("productList");
const form = document.getElementById("productForm");

socket.on("products", products => {
  list.innerHTML = "";
  products.forEach(p => {
    const li = document.createElement("li");
    li.innerText = `${p.title} - $${p.price}`;
    list.appendChild(li);
  });
});

form.addEventListener("submit", e => {
  e.preventDefault();

  const product = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value
  };

  socket.emit("newProduct", product);
  form.reset();
});
