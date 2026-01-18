document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ realtime.js cargado");

  const socket = io();
  const list = document.getElementById("productsList");
  const form = document.getElementById("productForm");

  socket.on("products", products => {
    list.innerHTML = "";
    products.forEach(p => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerText = `${p.title} - $${p.price}`;
      list.appendChild(li);
    });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    const data = {
      title: form.title.value,
      price: form.price.value
    };

    socket.emit("newProduct", data);
    form.reset();
  });
});
