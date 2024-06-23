const express = require("express");
const router = express.Router()

const { google } = require("googleapis");


router.get("/", (req, res) => {
  res.status(200).send("Hello me");
})

router.post("/", async (req, res) => {
  const {
    name,
    response,
    gender,
    email,
    country,
    publish,
    afrogistType,
  } = req.body;


  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZoneName: 'short'
    };

    const timeString = date.toLocaleTimeString('en-US', options);

    // Split the time string to separate time and timezone
    const [time, timeZone] = timeString.split(' ');
    const [hoursMinutesSeconds, ampm] = time.split(' ');

    return `${hoursMinutesSeconds} ${timeZone}`;
  };

  const format_date = new Date();
  // Example usage
  const time = formatTime(format_date);

  // Example usage
  const date = formatDate(format_date);


  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1_Qgyt6E7kvhqnjewLOsWRRyu0c4IMg6GtSgeu4YZK4M";

  // Get metadata about spreadsheet
  try {
    const metaData = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });
  } catch (error) {
    console.log(error)
    return res.status(400).send("Unable to authenticate google user");
  }


  // Write row(s) to spreadsheet
  try {
    const sendData = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "MainSheet(DONT_EDIT)",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[
          name,
          response,
          gender,
          email,
          country,
          publish,
          afrogistType,
          date,
          time
        ]],
      },
    });

    if (sendData) return res.status(200).send("Successfully submitted! Thank you!");

  } catch (error) {
    console.log(error)
    return res.status(400).send("Unable to submit form!");
  }


});


module.exports = router