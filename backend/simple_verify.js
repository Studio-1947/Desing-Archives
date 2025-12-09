const http = require("http");

function request(path, method = "GET", body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: "localhost",
        port: 5000,
        path: `/api/challenges${path}`,
        method,
        headers: body ? { "Content-Type": "application/json" } : {},
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ status: res.statusCode, data }));
      }
    );
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function run() {
  try {
    console.log("1. Get Challenges");
    const cRes = await request("");
    const challenges = JSON.parse(cRes.data);
    if (!challenges.length) throw new Error("No challenges");
    const id = challenges[0].id;
    console.log("ID:", id);

    console.log("2. Get Stats");
    const sRes1 = await request(`/${id}/stats`);
    const stats1 = JSON.parse(sRes1.data);
    console.log("Stats 1:", JSON.stringify(stats1));

    console.log("3. Increment View (Invalid User ID)");
    const vRes = await request(`/${id}/view`, "POST", {
      userId: "invalid-user-" + Date.now(),
    });
    console.log("View Status:", vRes.status);

    console.log("4. Get Stats Again");
    const sRes2 = await request(`/${id}/stats`);
    const stats2 = JSON.parse(sRes2.data);
    console.log("Stats 2:", JSON.stringify(stats2));

    if (stats2.totalViews > stats1.totalViews) {
      console.log("SUCCESS");
    } else {
      console.log("FAILURE");
    }
  } catch (e) {
    console.error("ERROR:", e.message);
  }
}

run();
