// import Cookies from "universal-cookie";
import { store } from "../store/store";
import { saveToken } from "../store/profile/profile";
import { request } from "./request";
import axios from "axios";
// import { getGlobalState } from "../utilities/utilities";
export const getToken = async (router: any) => {
  const { history, navigate } = router;
  console.log("code ====>>", localStorage.getItem["KB_VERIFIER"]);
  // const cookie = new Cookies();
  const body = new URLSearchParams();
  body.append("grant_type", "authorization_code");
  body.append("redirect_uri", "http://localhost:3000/?redirect");
  body.append("client_id", "kian-business-web");
  body.append("code_verifier", String(localStorage.getItem("KB_VERIFIER")));
  body.append(
    "code",
    history[0].substr(history[0].lastIndexOf("code=") + 5, history[0].length)
  );
  if (!localStorage.getItem("ACCESS_TOKEN")) {
    // return request(
    //   "https://new.uat.neshanid.com/auth/realms/KIAN/protocol/openid-connect/token",
    //   {
    //     data: body,
    //     method: "post",
    //     headers: {
    //       "content-type": "application/x-www-form-urlencoded",
    //       // "Access-Control-Allow-Credentials": "true",
    //       // "Access-Control-Allow-Origin": "http://localhost:3000",
    //       // Vary: "Origin",
    //     },
    //   }

    return axios
      .post(
        "https://uat.neshanid.com/auth/realms/KIAN/protocol/openid-connect/token",
        body,
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((resp: any) => {
        localStorage.setItem("REFRESH_TOKEN", resp?.data?.refresh_token);
        localStorage.setItem("ACCESS_TOKEN", resp?.data?.access_token);
        store.dispatch(
          saveToken({
            token: resp?.data?.access_token,
            refreshToken: resp?.data?.refresh_token,
          })
        );
        router.navigate("/");
      });
  } else return;
};

function dec2hex(dec: any) {
  return ("0" + dec.toString(16)).substr(-2);
}
function generateRandomString() {
  let array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}
export const verifier = generateRandomString();
function sha256(plain: any) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}
function base64urlencode(a: any) {
  let str = "";
  let bytes = new Uint8Array(a);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function challenge_from_verifier(v: any) {
  let hashed = await sha256(v);
  let base64encoded = base64urlencode(hashed);
  return base64encoded;
}

export default async function generateLoginUrl() {
  let challenge = await challenge_from_verifier(verifier);
  const url = new URL(
    `https://uat.neshanid.com/auth/realms/KIAN/protocol/openid-connect/auth`
  );
  url.searchParams.append("scop", "openid");
  url.searchParams.append("response_type", "code");
  url.searchParams.append("client_id", "kian-business-web");
  url.searchParams.append("redirect_uri", "http://localhost:3000/?redirect");
  url.searchParams.append("code_challenge_method", "S256");
  url.searchParams.append("code_challenge", challenge);

  return url.toString();
}

export const login = async () => {
  // const cookies = new Cookies();
  // cookies.set("KB_REDIRECT_PAGE", "/");
  // cookies.set("KB_VERIFIER", verifier);
  localStorage.setItem("KB_REDIRECT_PAGE", "/");
  localStorage.setItem("KB_VERIFIER", verifier);
  generateLoginUrl().then((res) => window.location.replace(res));
};

export const logOut = () => {
  // const cookie = new Cookies();
  const body = new URLSearchParams();
  body.append("refresh_token", localStorage.getItem("REFRESH_TOKEN") as string);
  body.append("client_id", "kian-business-web");

  const headers = {
    // headers: { Authorization: `Bearer ${cookie.get("ACCESS_TOKEN")}` },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('"ACCESS_TOKEN"')}`,
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  };
  request
    .post(
      "https://uat.neshanid.com/auth/realms/KIAN/protocol/openid-connect/logout",
      body,
      headers
    )
    .then((resp: any) => {
      store.dispatch(saveToken({ token: null, refreshToken: null }));
      window.location.href = "/";
      localStorage.removeItem("REFRESH_TOKEN");
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("KB_VERIFIER");
      localStorage.removeItem("KB_REDIRECT_PAGE");
    })
    .catch((error: any) => console.log("an error occured on logout", error));
};
