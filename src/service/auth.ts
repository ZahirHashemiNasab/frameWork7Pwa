// import Cookies from "universal-cookie";
import { store } from "../store1/store";
import { saveToken } from "../store/profile/profile";
import { request } from "./request";
import { getGlobalState } from "../utilities/utilities";
export const getToken = async (location: any) => {
  // const cookie = new Cookies();
  const body = new URLSearchParams();
  body.append("grant_type", "authorization_code");
  body.append("redirect_uri", "http://localhost:3000/?redirect");
  body.append("client_id", "kian-business-web");
  body.append("code_verifier", localStorage.getItem["KB_VERIFIER"]);
  body.append(
    "code",
    location.search.substr(
      location.search.lastIndexOf("code=") + 5,
      location.search.length
    )
  );
  if (!getGlobalState().counter.TOKEN) {
    return request
      .post(
        "https://uat.neshanid.com/auth/realms/KIAN/protocol/openid-connect/token",
        body,
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
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

        // return;
      });
  } else return;
};

export const refreshToken = () => {
  let headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json, text/plain, */*",
    // Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,

    "Application-Name": "KIAN_BUSINESS",
    // "Accept-Language": "fa",
    // "Access-Control-Allow-Origin": "*",
  };
  const body = new URLSearchParams();
  body.append("grant_type", "refresh_token");
  body.append("refresh_token", `${localStorage.getItem("REFRESH_TOKEN")}`);
  body.append("client_id", "kian-business-web");

  return request
    .post(
      "https://uat.neshanid.com/auth/realms/KIAN/protocol/openid-connect/token",
      body,
      { headers: headers }
    )
    .then((resp: any) => {
      localStorage.setItem("REFRESH_TOKEN", resp?.data?.refresh_token);
      localStorage.setItem("ACCESS_TOKEN", resp?.data?.access_token);
      saveToken({
        token: resp?.data?.access_token,
        refreshToken: resp?.data?.refresh_token,
      });
    });
  // .catch((error) => logOut());
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
  body.append(
    "refresh_token",
    getGlobalState().counter.REFRESH_TOKEN as string
  );
  body.append("client_id", "kian-business-web");

  const headers = {
    // headers: { Authorization: `Bearer ${cookie.get("ACCESS_TOKEN")}` },
    headers: {
      Authorization: `Bearer ${getGlobalState().counter.TOKEN}`,
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
