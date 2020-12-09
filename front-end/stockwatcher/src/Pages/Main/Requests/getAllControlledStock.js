import url from "../../../config";

async function getAllControlledStock() {
  let form = new FormData();
  const token = localStorage.getItem("token");
  form.append("token", token);
  const res = await fetch(`${url}/my/stock/retrieve/all`, {
    method: "POST",
    body: form,
  });
  return res.json();
}
export default getAllControlledStock;
