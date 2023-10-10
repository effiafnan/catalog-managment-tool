import { getGoogleSheetsData } from "../../utils/GetGoogleSheetsData";

export default async function handler(req, res) {
  try {
    let values = await getGoogleSheetsData("global-csv");
    const groupedData = {};
    let countries = [];
    let tableData = [];

    for (let i = 1; i < values.length; i++) {
      
      const [
        id,
        country,
        superCategory,
        categoryName,
        productName,
        menuFilter,
        price,
        currency,
        successRate,
        minutesForTest,
        active,
        attribute1,
        attribute2,
        attribute3,
        attribute4,
        attribute5,
        attribute6,
        attribute7,
        attribute8,
        attribute9,
        attribute10,
        superCategoryUrl,
        categoryNameUrl,
        productNameUrl,
        dummy,
        productId,
      ] = values[i];
      
      const tableRow = {
        id,
        country,
        superCategory,
        categoryName,
        productName,
        menuFilter,
        price,
        currency,
        successRate,
        minutesForTest,
        active,
        attribute1,
        attribute2,
        attribute3,
        attribute4,
        attribute5,
        attribute6,
        attribute7,
        attribute8,
        attribute9,
        attribute10,
        superCategoryUrl,
        categoryNameUrl,
        productNameUrl,
        productId,
      };

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
      tableData.push(tableRow);
    }

    return res.status(200).send(
      JSON.stringify({
        error: false,
        data: { groupedData, tableData, countries },
      })
    );
  } catch (e) {
    console.log("e", e);
    return res
      .status(400)
      .send(JSON.stringify({ error: true, message: e.message }));
  }
}
