import { getGoogleSheetsData } from "../../utils/GetGoogleSheetsData";

export default async function handler(req, res) {
  try {
    let values = await getGoogleSheetsData("global-csv");
    const groupedData = {};
    let countries = [];

    for (let i = 1; i < values.length; i++) {
      const { country, superCategory, categoryName, productName} = values[i];

      if (!groupedData[country]) {
        groupedData[country] = {};
        countries.push(country);
      }

      if (!groupedData[country][superCategory]) {
        groupedData[country][superCategory] = {};
      }

      if (!groupedData[country][superCategory][categoryName]) {
        groupedData[country][superCategory][categoryName] = [];
      }

      groupedData[country][superCategory][categoryName].push(productName);
    }

    return res.status(200).send(
      JSON.stringify({
        error: false,
        data: { groupedData, countries },
      })
    );
  } catch (e) {
    console.log("e", e);
    return res
      .status(400)
      .send(JSON.stringify({ error: true, message: e.message }));
  }
}
