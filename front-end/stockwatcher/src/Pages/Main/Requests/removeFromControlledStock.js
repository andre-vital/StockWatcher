import url from "../../../config";

async function removeFromControlledStock(controlledStockId) {
  const token = localStorage.getItem("token");
  let form = new FormData();
  form.append("token", token);
  form.append("controlledStockId", controlledStockId);
  await fetch(`${url}/my/stock/remove`, {
    method: "POST",
    body: form,
  });
}
export default removeFromControlledStock;
