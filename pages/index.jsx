import Head from "next/head";
import DashboardLayout from "../components/Dashboard";
import { useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Home() {
  const { setGlobalCsvState, setGlobalCsvTableData } =
    useContext(GlobalContext);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/get-global-data`
      );
      const dataObj = await response.json();

      setGlobalCsvState(dataObj?.data?.groupedData);
      setGlobalCsvTableData(dataObj?.data?.tableData ?? []);
      console.log("dataObj", dataObj);
      // return { props: { data: dataObj?.data } };
    } catch (error) {
      console.error("Error fetching data:", error);
      // return { props: { data: null } };
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {}, [data]);

  console.log("process.env", process.env);
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

// export async function getServerSideProps() {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-global-data`
//     );
//     const dataObj = await response.json();

//     return { props: { data: dataObj?.data } };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return { props: { data: null } };
//   }
// }
