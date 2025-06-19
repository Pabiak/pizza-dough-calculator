import COOKIES from "@/types/enums/cookies";
import { deleteCookie, getCookie } from "./cookies";

const logOut = () => {
  if (!getCookie(COOKIES.ACCESS_TOKEN) && !getCookie(COOKIES.REFRESH_TOKEN)) {
    if (window.location.pathname === "/") {
      return;
    }

    window.location.href = "/";
  }

  deleteCookie(COOKIES.ACCESS_TOKEN);
  deleteCookie(COOKIES.REFRESH_TOKEN);
  deleteCookie(COOKIES.USER);

  window.location.href = "/";
};

export default logOut;
