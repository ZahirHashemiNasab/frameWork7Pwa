import React from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button,
  View,
} from "framework7-react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faFolderOpen,
  faCreditCard,
  faPencilSquare,
  faPieChart,
  faInstitution,
} from "@fortawesome/free-solid-svg-icons";
import { produceWithPatches } from "immer";
const MainLayout = (props: any) => {
  const { children, f7router } = props;
  return (
    <Page>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "scroll",
          paddingBottom: "100px",
        }}
      >
        {children}
      </div>
      <div
        className="toolbar toolbar-bottom"
        style={{
          position: "fixed",
          bottom: "0px",
          top: "unset",
          backgroundColor: "#efeff4",
        }}
      >
        <div className="toolbar-inner" style={{ overflow: "unset" }}>
          <div
            style={{
              backgroundColor: "rgb(1, 87, 155)",
              borderRadius: "50%",
              width: "55px",
              height: "55px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "15px",
              zIndex: 100,
            }}
          >
            <FontAwesomeIcon icon={faCreditCard} size={"xl"} color={"white"} />
          </div>
          <div
            style={{
              backgroundColor: "rgb(1, 87, 155)",
              borderRadius: "50%",
              width: "55px",
              height: "55px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "15px",
              zIndex: 100,
            }}
          >
            <FontAwesomeIcon
              icon={faPencilSquare}
              size={"xl"}
              color={"white"}
            />
          </div>
          <Link href="/">
            {" "}
            <div
              style={{
                backgroundColor: "rgb(1, 87, 155)",
                borderRadius: "50%",
                width: "65px",
                height: "65px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "25px",
                zIndex: 100,
              }}
            >
              <FontAwesomeIcon
                icon={faFolderOpen}
                size={"xl"}
                color={"white"}
              />
            </div>
          </Link>
          <div
            style={{
              backgroundColor: "rgb(1, 87, 155)",
              borderRadius: "50%",
              width: "55px",
              height: "55px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "15px",
              zIndex: 100,
            }}
          >
            <FontAwesomeIcon icon={faPieChart} size={"xl"} color={"white"} />
          </div>
          <Link href="/businesses/">
            <div
              style={{
                backgroundColor: "rgb(1, 87, 155)",
                borderRadius: "50%",
                width: "55px",
                height: "55px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "15px",
                zIndex: 100,
              }}
            >
              <FontAwesomeIcon
                icon={faInstitution}
                size={"xl"}
                color={"white"}
              />
            </div>
          </Link>
        </div>
      </div>
    </Page>
  );
};

export default MainLayout;
