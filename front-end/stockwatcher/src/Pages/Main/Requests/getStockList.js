import url from "../../../config";

async function getStockList() {
  const res = await fetch(`${url}/stock/list`, {
    method: "GET",
  });
  return res.json();
}
export default getStockList;
