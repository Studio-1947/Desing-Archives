const http = require("http");

// Helper to make a request
function makeRequest(path, method = "GET", body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 5000,
      path: `/api/challenges${path}`,
      method: method,
      headers: body
        ? {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(JSON.stringify(body)),
          }
        : {},
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          resolve({
            statusCode: res.statusCode,
            data: data ? JSON.parse(data) : null,
          });
        } catch (e) {
          resolve({ statusCode: res.statusCode, data: data });
        }
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

async function verifyStats() {
  try {
    // 1. Get a challenge ID
    console.log("Fetching challenges...");
    const challengesRes = await makeRequest("");
    if (!challengesRes.data || challengesRes.data.length === 0) {
      console.error("No challenges found to test.");
      return;
    }
    const challengeId = challengesRes.data[0].id;
    console.log(`Testing with challenge ID: ${challengeId}`);

    // 2. Get initial stats
    console.log("Fetching initial stats...");
    const initialStatsRes = await makeRequest(`/${challengeId}/stats`);
    console.log("Initial Stats:", initialStatsRes.data);

    // 3. Increment views (simulate view with random user)
    console.log("Incrementing view...");
    const randomUserId = `test-user-${Math.random()}`;
    const viewRes = await makeRequest(`/${challengeId}/view`, "POST", {
      userId: randomUserId,
    });
    console.log("View Increment Status:", viewRes.statusCode);
    if (viewRes.statusCode !== 200) {
      console.error("View increment failed:", viewRes.data);
    }

    // 4. Get updated stats
    console.log("Fetching updated stats...");
    const updatedStatsRes = await makeRequest(`/${challengeId}/stats`);
    console.log("Updated Stats:", updatedStatsRes.data);

    if (updatedStatsRes.data.totalViews > initialStatsRes.data.totalViews) {
      console.log(
        "SUCCESS: View count incremented and verified via stats endpoint."
      );
    } else {
      console.error("FAILURE: View count did not increment.");
    }
  } catch (error) {
    console.error("Verification failed:", error);
  }
}

verifyStats();
