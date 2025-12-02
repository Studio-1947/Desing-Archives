import 'dotenv/config';
import app from './app';

import { createServer } from 'http';
import { initSocket } from './socket';

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);
initSocket(httpServer);

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
