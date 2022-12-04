import * as React from "react";
import {
  App,
  Panel,
  View,
  Statusbar,
  Popup,
  Page,
  Navbar,
  NavRight,
  Link,
  Block,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  Label,
  Input,
  ListButton,
  BlockFooter,
} from "framework7-react";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { login } from "../../service/auth";
import { getToken, logOut } from "../../service/auth";
import { useGetBusinessPersonQuery } from "../../service/kb-composition/kb-composition";

export default (props: any) => {
  const { f7router }: any = props;

  useEffect(() => {
    if (f7router.history[0] !== "/") {
      getToken(f7router).then((resp: any) => f7router.navigate("/"));
    }
  }, []);
  return (
    <View>
      <p>hello</p>
      {/* <Page noNavbar={true} noToolbar={true} style={{ paddingTop: "-45px" }}>
       */}
      <div className="page">
        <div className="page-content" style={{ paddingTop: "0px" }}>
          <div
            style={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              background: `url(images/intro-bg.png)`,
              backgroundSize: "cover",
            }}
          >
            <div style={{ height: "200px" }}>
              {/* <KianBusinessMotion /> */}
            </div>
            <button
              onClick={login}
              style={{
                width: "100px",
                height: "35px",
                borderRadius: "4px",
                border: "none",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                color: "rgb(1, 87, 155)",
                fontFamily: "iranYekan",
              }}
            >
              ورود با نشان
            </button>
          </div>
        </div>
      </div>

      {/* </Page> */}
    </View>
  );
};
