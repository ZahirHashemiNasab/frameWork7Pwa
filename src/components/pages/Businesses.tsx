import * as React from "react";
import { Page, Navbar, Block } from "framework7-react";
import { useSelector } from "react-redux";

const Businesses = (props: any) => {
  const state = useSelector((state: any) => state);
  console.log("bussinesses page", state);
  return (
    <Page>
      <Navbar title="Not found" backLink="Back" />
      <Block strong>
        <p>businesses</p>
        <p>there are your related businesses</p>
      </Block>
    </Page>
  );
};

export default Businesses;
