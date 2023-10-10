import { getGoogleSheetsData } from "../../utils/GetGoogleSheetsData";

export default async function handler(req, res) {
  try {
    let data = await getGoogleSheetsData("global-csv!B2:B");
    const values = data || [];
    const uniqueCountries = Array.from(new Set(values.flat()));
    return res
      .status(200)
      .send(JSON.stringify({ error: false, data: uniqueCountries }));
  } catch (e) {
    console.log("e", e);
    return res
      .status(400)
      .send(JSON.stringify({ error: true, message: e.message }));
  }
}
