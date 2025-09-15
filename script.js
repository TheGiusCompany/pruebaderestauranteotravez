// CAMBIA ESTE NÚMERO POR EL TUYO (con código de país, sin + ni guiones)
let whatsappNumber = "+584126324523";

let order = [];
let total = 0;

function addToOrder(item, price, qtyId) {
  const qty = parseInt(document.getElementById(qtyId).value);
  if (qty <= 0) return;
  order.push({ item, price, qty });
  renderOrder();
}

function renderOrder() {
  const list = document.getElementById("order-list");
  list.innerHTML = "";
  total = 0;
  order.forEach((entry, idx) => {
    const li = document.createElement("li");
    const subtotal = entry.price * entry.qty;
    total += subtotal;
    li.textContent = `${entry.qty} x ${entry.item} - $${subtotal} MXN `;
    const btn = document.createElement("button");
    btn.textContent = "x";
    btn.onclick = () => {
      order.splice(idx, 1);
      renderOrder();
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
  document.getElementById("total").textContent = `Total: $${total} MXN`;
}

document.getElementById("whatsapp-btn").addEventListener("click", () => {
  if (order.length === 0) { alert("Tu pedido está vacío."); return; }
  const name = document.getElementById("customer-name").value;
  const address = document.getElementById("customer-address").value;
  const comments = document.getElementById("customer-comments").value;

  let msg = `Hola, soy ${name || "Cliente"}, quiero pedir:\n`;
  order.forEach(e => { msg += `- ${e.qty} x ${e.item} ($${e.price} c/u)\n`; });
  msg += `Total: $${total} MXN\nDirección: ${address || "No proporcionada"}\nComentarios: ${comments || "Ninguno"}`;

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
});
