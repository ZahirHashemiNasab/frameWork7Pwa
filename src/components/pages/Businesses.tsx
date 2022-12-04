import * as React from "react";
import { Card } from "framework7-react";
import { useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import { useGetBusinessPersonQuery } from "src/service/kb-composition/kb-composition";
const Businesses = (props: any) => {
  const token = useSelector((state: any) => state.counter.TOKEN);
  const { data, isError, isLoading, isSuccess } = useGetBusinessPersonQuery(
    // { id: 1 },
    { skip: !token }
  );
  console.log("business", data);
  return (
    <MainLayout>
      {data?.businesses?.map((element: any, index: any) => (
        <Card content={element.name} key={index} />
      ))}
    </MainLayout>
  );
};

export default Businesses;
