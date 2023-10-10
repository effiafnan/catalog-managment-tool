import Head from "next/head";
import DashboardLayout from "../components/Dashboard";
import { useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

const baseUrl = process.env.BASE_URL;

export default function Home({ data }) {
  const { setGlobalCsvState , setGlobalCsvTableData} = useContext(GlobalContext);
  setGlobalCsvState(data?.groupedData);
  setGlobalCsvTableData(data?.tableData ?? []);
  return (
    <div>
      <Head>
        <title>Catalog Managment Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <DashboardLayout />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${baseUrl}/api/get-global-data`);
    const dataObj = await response.json();
    
    return { props: { data: dataObj?.data } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { data: null } };
  }
}
