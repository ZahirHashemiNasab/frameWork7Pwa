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

import routes from "../routes";

export default () => {
  // Framework7 parameters here
  const f7params = {
    id: "io.framework7.testapp", // App bundle ID
    name: "Framework7", // App name
    theme: "auto", // Automatic theme detection
    // App routes
    routes,
  };

  return (
    <App params={f7params}>
      {/* Statusbar */}
      <Statusbar />
      {/* Right Panel */}
      <Panel left reveal themeDark>
        <View url="/panel-right/" />
      </Panel>

      {/* Left Panel */}
      <Panel right cover themeDark>
        <View url="/panel-left/" />
      </Panel>

      {/* Main View */}
      <View id="main-view" url="/" main className="ios-edges" />

      {/* Popup */}
      <Popup id="zahir">
        <View>
          <Page>
            <Navbar title="zahir1">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque,
              architecto. Cupiditate laudantium rem nesciunt numquam, ipsam.
              Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto
              nemo quos ullam obcaecati, quod.
            </Block>
          </Page>
        </View>
      </Popup>

      {/* Login Screen */}
      <LoginScreen id="login-screen">
        <View>
          <Page loginScreen>
            <LoginScreenTitle>Login</LoginScreenTitle>
            <List form>
              <ListItem>
                <Label>Username</Label>
                <Input name="username" placeholder="Username" type="text" />
              </ListItem>
              <ListItem>
                <Label>Password</Label>
                <Input name="password" type="password" placeholder="Password" />
              </ListItem>
            </List>
            <List>
              <ListButton title="Sign In" loginScreenClose />
              <BlockFooter>
                <p>Click Sign In to close Login Screen</p>
              </BlockFooter>
            </List>
          </Page>
        </View>
      </LoginScreen>
    </App>
  );
};
