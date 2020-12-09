import url from "../../../config";

async function editStockInfo(data) {
  let form = new FormData();
  const token = localStorage.getItem("token");
  form.append("token", token);
  form.append("stockId", data.stockId);
  form.append("updateInterval", data.updateInterval);
  form.append("buyPrice", data.buyPrice);
  form.append("sellPrice", data.sellPrice);
  await fetch(`${url}/my/stock/configure`, {
    method: "POST",
    body: form,
  });
}
export default editStockInfo;
