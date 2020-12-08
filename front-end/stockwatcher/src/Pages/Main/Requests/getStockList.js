import url from "../../../config";

async function getStockList() {
  console.log(url);
  const res = await fetch(`${url}/stock/list`, {
    method: "GET",
  });
  console.log(res);
  return res.json();
}
export default getStockList;
