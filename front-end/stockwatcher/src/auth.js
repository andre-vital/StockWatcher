function isAuthenticated() {
  const token = localStorage.getItem("token");
  console.log({ token });
  if (token !== null && token !== "" && token !== undefined) {
    return true;
  }
  return false;
}

export default isAuthenticated;
