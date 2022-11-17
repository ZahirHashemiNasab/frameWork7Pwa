import * as React from "react";
// import { useEffect } from "react";
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
} from "framework7-react";

export default (props: any) => {
  console.log("home page component", props);

  // useEffect(() => {
  // props?.f7router?.navigate("/hello");
  // }, []);

  return (
    <Page>
      <Navbar>
        <NavLeft>
          <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left" />
        </NavLeft>
        <NavTitle>My App</NavTitle>
        <NavRight>
          <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="right" />
        </NavRight>
      </Navbar>
      <Toolbar>
        <Link>Left Link</Link>
        <Link>Right Link</Link>
      </Toolbar>
      <Block strong>
        <p>Here is your blank Framework7 app. Let's see what we have here.</p>
      </Block>
      <BlockTitle>Navigation</BlockTitle>
      <List>
        <ListItem link="/about/" title="About" />
        <ListItem link="/form/" title="Form" />
      </List>
      <BlockTitle>Modals</BlockTitle>
      <Block strong>
        <Row>
          <Col width="50">
            <Button fill raised popupOpen="#zahir">
              Popup
            </Button>
            <button
              onClick={() =>
                props.f7router.navigate("/businesses", {
                  zahir: "test",
                })
              }
            >
              click
            </button>
          </Col>
          <Col width="50">
            <Button fill raised loginScreenOpen="#login-screen">
              Login Screen
            </Button>
          </Col>
        </Row>
      </Block>
      <BlockTitle>Panels</BlockTitle>
      <Block strong>
        <Row>
          <Col width="50">
            <Button fill raised panelOpen="left">
              Left Panel
            </Button>
          </Col>
          <Col width="50">
            <Button fill raised panelOpen="right">
              Right Panel
            </Button>
          </Col>
        </Row>
      </Block>
      <List>
        <ListItem link="/businesses" title="Dynamic Route" />
        <ListItem
          link="/load-something-that-doesnt-exist/"
          title="Default Route (404)"
        />
      </List>
    </Page>
  );
};
