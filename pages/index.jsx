import Head from "next/head";
import DashboardLayout from "../components/Dashboard";
import { useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Home() {
  const { setGlobalCsvState } =
    useContext(GlobalContext);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/get-global-data`
      );
      const dataObj = await response.json();

      setGlobalCsvState(dataObj?.data?.groupedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

