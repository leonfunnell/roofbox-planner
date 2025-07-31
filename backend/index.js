const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const client = new OAuth2Client();

exports.getBookings = async (req, res) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return res.status(401).json({ error: "Missing token" });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const allowed = process.env.ALLOWED_USERS?.split(",") || [];

    if (!allowed.includes(email)) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const result = await fetch(
      `https://api.appsheet.com/api/v2/apps/${process.env.APPSHEET_APP_ID}/tables/Active%20Bookings/Action`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ApplicationAccessKey": process.env.APPSHEET_API_KEY,
        },
        body: JSON.stringify({ Action: "Find", Properties: {}, Rows: [] }),
      }
    );

    const json = await result.json();
    res.json(Array.isArray(json) ? json : json?.Rows || []);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
