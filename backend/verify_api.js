const http = require('http');

http.get('http://localhost:5000/api/challenges', (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    try {
        const challenges = JSON.parse(data);
        console.log('Status Code:', resp.statusCode);
        console.log('Number of challenges:', challenges.length);
        console.log('Challenge Titles:', challenges.map(c => c.title));
    } catch (e) {
        console.error('Error parsing JSON:', e.message);
        console.log('Raw data:', data);
    }
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
