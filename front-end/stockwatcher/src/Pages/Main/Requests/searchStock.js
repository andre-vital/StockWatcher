import url from "../../../config";

async function searchStock(ticker) {
  let form = new FormData();
  form.append("ticker", ticker);
  const res = await fetch(`${url}/stock/lookup`, {
    method: "POST",
    body: form,
  });
  return res.json();
}
export default searchStock;
