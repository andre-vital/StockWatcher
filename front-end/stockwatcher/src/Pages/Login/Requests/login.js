import url from "../../../config";

async function login(username, password) {
  let form = new FormData();
  form.append("username", username);
  form.append("password", password);
  const res = await fetch(`${url}/account/login`, {
    method: "POST",
    body: form,
  });
  return res.json();
}
export default login;
