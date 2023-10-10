import { google } from "googleapis";
import { getGoogleSheetsData, updateGoogleSheetsData } from "../../utils/GetGoogleSheetsData";

export default async (req, res) => {
    try {
      const {newCsv, globalCsvData} = req.body; // The data you want to append as a row
      let values = await updateGoogleSheetsData(newCsv, globalCsvData);
  
 
      return res.status(200).send(
        JSON.stringify({
          error: false,
          data: values,
        })
      );
    } catch (error) {
      console.error("Error appending row:", error);
      res.status(500).json({ error: "Unable to append row to Google Sheets" });
    }
  };