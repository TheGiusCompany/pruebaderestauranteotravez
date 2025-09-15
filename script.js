// CAMBIA ESTE NÚMERO POR EL TUYO (con código de país, sin + ni guiones)
let whatsappNumber = "+58 4126324523"; // Ejemplo: México +52

let order = [];

function addToOrder(item) {
  order.push(item);
  renderOrder();
}

function renderOrder() {
  const list = document.getElementById("order-list");
  list.innerHTML = "";
  order.forEach((item, idx) => {
    const li = document.createElement("li");
    li.textContent = item + " ";
    const btn = document.createElement("button");
    btn.textContent = "x";
    btn.onclick = () => {
      order.splice(idx, 1);
      renderOrder();
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

document.getElementById("whatsapp-btn").addEventListener("click", () => {
  if (order.length === 0) {
    alert("Tu pedido está vacío.");
    return;
  }
  const msg = encodeURIComponent("Hola, quiero pedir: " + order.join(", "));
  const url = `https://wa.me/${whatsappNumber}?text=${msg}`;
  window.open(url, "_blank");
});
