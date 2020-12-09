import url from "../../../config";

async function getAllControlledStock(userId) {
  let form = new FormData();
  form.append("userId", userId);
  const res = await fetch(`${url}/my/stock/retrieve/all`, {
    method: "POST",
    body: form,
  });
  return res.json();
}
export default getAllControlledStock;
