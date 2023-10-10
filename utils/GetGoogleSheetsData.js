import { google } from "googleapis";
import keys from "../key.json";

export async function getGoogleSheetsData(range) {
  return new Promise(async (resolve, reject) => {
    try {
      const client = await authorize();

      const gsapi = google.sheets({ version: "v4", auth: client });

      const opt = {
        spreadsheetId: "1Rb10dJKRNjPeHsWdm4JEZ89Hxh85kr6GH3_VT3tL_kg",
        range,
      };

      const response = await gsapi.spreadsheets.values.get(opt);
      const data = response.data.values;

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function updateGoogleSheetsData(newCsv, globalCsvData) {
  return new Promise(async (resolve, reject) => {
    try {
      const client = await authorize();

      const gsapi = google.sheets({ version: "v4", auth: client });

      const updateIndexCsv = {
        spreadsheetId: "1Rb10dJKRNjPeHsWdm4JEZ89Hxh85kr6GH3_VT3tL_kg",
        range: 'index',
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        resource: {
          values: [newCsv], // Wrap the data in an array
        },
      };
      console.log("globalCsvData", globalCsvData);
      const updateGlobalCsv = {
        spreadsheetId: "1Rb10dJKRNjPeHsWdm4JEZ89Hxh85kr6GH3_VT3tL_kg",
        range: 'global-csv!A:Z',
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        resource: {
          values: [globalCsvData], // Wrap the data in an array
        },
      };

      // const response = await gsapi.spreadsheets.values.append(updateIndexCsv);
      const response2 = await gsapi.spreadsheets.values.append(updateGlobalCsv);
      // const data = response.data;
      console.log('response2', response2);
      const data2 = response2.data;
      resolve(data2);
    } catch (error) {
      reject(error);
    }
  });
}
// export async function addNewGoogleSheets(sheetName) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const client = await authorize();

//       const gsapi = google.sheets({ version: "v4", auth: client });



//       const response = await gsapi.spreadsheets.create({
//         resource: {
//           properties: {
//             title: sheetName,
//           },
//         },
//       });

//       const data = response.data;
//       console.log("sheet appended", response)
//       resolve(data);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// Helper function to authenticate with Google Sheets API
async function authorize() {
  const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );

  await client.authorize();

  return client;
}
