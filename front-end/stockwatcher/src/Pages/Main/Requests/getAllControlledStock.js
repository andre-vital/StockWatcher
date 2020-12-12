import url from "../../../config";

async function getAllControlledStock() {
  const token = localStorage.getItem("token");
  let form = new FormData();
  form.append("token", token);
  const res = await fetch(`${url}/my/stock/retrieve/all`, {
    method: "POST",
    body: form,
  });
  return res.json();
}
export default getAllControlledStock;
