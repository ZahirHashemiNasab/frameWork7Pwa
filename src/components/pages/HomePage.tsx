import React from "react";
import { useEffect } from "react";
import {
  Page,
  Navbar,
  Link,
  Toolbar,
  Block,
  Tab,
  Tabs,
  Card,
} from "framework7-react";
import { useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import t from "../../hooks/translate";
import { useGetOrderByBusinessIdMutation } from "src/service/kb-kartable/kb-kartable";
export default (props: any) => {
  const to = "",
    from = "";
  const state: any = useSelector((state: any) => state);
  const { businessId } = useSelector((state: any) => state.setting);
  const [getOrderByBusinessId, result] = useGetOrderByBusinessIdMutation({
    fixedCacheKey: businessId,
  });
  console.log("result", result, result.status, businessId);
  const { data, isSuccess, isLoading, isUninitialized } = result;
  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN") === null) {
      props?.f7router?.navigate("/login/");
    }
  }, []);
  if (localStorage.getItem("ACCESS_TOKEN") === null) {
    props?.f7router?.navigate("/login/");
  }
  useEffect(() => {
    getOrderByBusinessId({
      page: 0,
      businessId: businessId,
      config: `&pendingType=MINE&status=PENDING_FOR_APPROVE,PENDING_FOR_SIGN,WAITING_FOR_CARTABLE_CREATION,WAITING_FOR_CARTABLE_EXECUTION&verificationRequestStatus=PENDING${
        to ? `&to=${to}` : ""
      }${from ? `&from=${from}` : ""}`,
    });
  }, [isUninitialized]);
  const filterData = (tab: string) => {
    console.log("tab change", tab);
    switch (tab) {
      case "tab1":
        getOrderByBusinessId({
          page: 0,
          businessId: businessId,
          config: `&pendingType=MINE&status=PENDING_FOR_APPROVE,PENDING_FOR_SIGN,WAITING_FOR_CARTABLE_CREATION,WAITING_FOR_CARTABLE_EXECUTION&verificationRequestStatus=PENDING${
            to ? `&to=${to}` : ""
          }${from ? `&from=${from}` : ""}`,
        });
        break;
      case "tab2":
        getOrderByBusinessId({
          page: 0,
          businessId: businessId,
          config: `&pendingType=OTHERS&status=PENDING_FOR_APPROVE,PENDING_FOR_SIGN,WAITING_FOR_CARTABLE_CREATION,WAITING_FOR_CARTABLE_EXECUTION&verificationRequestStatus=PENDING${
            to ? `&to=${to}` : ""
          }${from ? `&from=${from}` : ""}`,
        });
        break;
      case "tab3":
        getOrderByBusinessId({
          page: 0,
          businessId: businessId,
          config: `&${to ? `&to=${to}` : ""}${from ? `&from=${from}` : ""}`,
        });
        break;

      default:
        break;
    }
  };
  return (
    <Page pageContent={false}>
      <MainLayout>
        <Navbar title={t("cartable")}></Navbar>

        <Toolbar tabbar labels position={"top"}>
          <Link
            tabLink="#tab-1"
            onClick={() => filterData("tab1")}
            tabLinkActive
            text={
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  margin: "0px",
                  fontFamily: "iranYekan",
                }}
              >
                {t("waitting_for_you")}
              </p>
            }
          ></Link>
          <Link
            tabLink="#tab-2"
            onClick={() => filterData("tab2")}
            text={
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  margin: "0px",
                  fontFamily: "iranYekan",
                }}
              >
                {t("waitting_for_other")}
              </p>
            }
          ></Link>
          <Link
            tabLink="#tab-3"
            onClick={() => filterData("tab3")}
            text={
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  margin: "0px",
                  fontFamily: "iranYekan",
                }}
              >
                {t("execution_status")}
              </p>
            }
            // iconIos="f7:cloud_upload_fill"
            // iconAurora="f7:cloud_upload_fill"
            // iconMd="material:file_upload"
          ></Link>
        </Toolbar>

        <Tabs>
          <Tab id="tab-1" className="page-content" tabActive>
            <Block>
              {data?.content?.map((element: any, index: any) => (
                <Card content={element?.title} key={index} />
              ))}
            </Block>
          </Tab>
          <Tab id="tab-2" className="page-content">
            <Block>
              {data?.content?.map((element: any, index: any) => (
                <Card content={element?.title} key={index} />
              ))}
            </Block>
          </Tab>
          <Tab id="tab-3" className="page-content">
            <Block>
              {data?.content?.map((element: any, index: any) => (
                <Card content={element?.title} key={index} />
              ))}
            </Block>
          </Tab>
        </Tabs>
      </MainLayout>
    </Page>
  );
};
