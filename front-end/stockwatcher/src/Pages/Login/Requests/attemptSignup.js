import url from "../../../config";

async function attemptSignup(data) {
  let form = new FormData();
  form.append("username", data.username);
  form.append("password", data.password);
  form.append("email", data.email);
  form.append("name", data.name);
  const res = await fetch(`${url}/account/signup`, {
    method: "POST",
    body: form,
  });
  const response = await res.json();
  return response.message;
}
export default attemptSignup;
