import { request } from "./request";
import { saveToken } from "src/store/profile/profile";
export const refreshToken = async (callback: any) => {
  // return { data: "test" };
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

  request(
    "https://uat.neshanid.com/auth/realms/KIAN/protocol/openid-connect/token",
    {
      method: "post",
      data: {},
      params: {},
      headers: {
        ...headers,
      },
    }
  )
    .then((resp: any) => {
      localStorage.setItem("REFRESH_TOKEN", resp?.data?.refresh_token);
      localStorage.setItem("ACCESS_TOKEN", resp?.data?.access_token);
      saveToken({
        token: resp?.data?.access_token,
        refreshToken: resp?.data?.refresh_token,
      });
      callback()
        .then((resp: any) => {
          data: resp;
        })
        .catch((error: any) => {
          error: error;
        });
      return { data: resp };
    })
    .catch((error) => {
      error: error;
    });
  // .catch((error) => logOut());
};
