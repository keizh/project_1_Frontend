import { jwtDecode } from "jwt-decode";

export function auth() {
  try {
    const token = localStorage.getItem("project_1");
    if (!token) {
      // console.log(`token does not exist`);
      return false;
    } else {
      const decoded = jwtDecode(token);
      // console.log(decoded);
      const time = Date.now() / 1000;
      // console.log(`iat:`, decoded.iat);
      // console.log(`real time:`, time);
      return decoded.exp > time;
      //   true id the exp time is ahead in the future
      //  false if the exp time has already been reached
    }
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    // console.log(`error occured auth`);
    return false;
  }
}
