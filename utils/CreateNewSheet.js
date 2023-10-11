export const CreateNewSheet = async ( sheetName ) => {
  const API_KEY = "https://sheetdb.io/api/v1/dosvxtik6gowo";
  try {
    const dataObj = { "Catalog": sheetName };
    fetch(`${API_KEY}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [dataObj],
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("sheet added", data));
  } catch (error) {
    // Handle network or other errors
    console.error("Error:", error);
  }
};
