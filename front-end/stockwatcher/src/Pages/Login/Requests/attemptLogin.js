import url from "../../../config";

async function attemptLogin(data) {
  let form = new FormData();
  form.append("username", data.username);
  form.append("password", data.password);
  const res = await fetch(`${url}/account/login`, {
    method: "POST",
    body: form,
  });
  const response = await res.json();
  localStorage.setItem("token", response.token);
  return response.success;
}
export default attemptLogin;
