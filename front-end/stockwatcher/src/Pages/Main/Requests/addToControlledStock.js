import url from "../../../config";

async function addToControlledStock(ticker) {
  let form = new FormData();
  const token = localStorage.getItem("token");
  form.append("token", token);
  form.append("ticker", ticker);
  const res = await fetch(`${url}/my/stock/add`, {
    method: "POST",
    body: form,
  });
  return res.json();
}
export default addToControlledStock;
