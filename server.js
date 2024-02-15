const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000; // Use the port provided by the environment or default to 3000

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Object to store status updates
const deviceStatus = {};

// Endpoint to receive status updates
app.post('/status', (req, res) => {
    const { deviceId, status } = req.body;
    deviceStatus[deviceId] = status;
    console.log(`Received status update from ${deviceId}: ${status}`);
    res.send('Status update received');
});

// Endpoint to serve status updates
app.get('/status/:deviceId', (req, res) => {
    const { deviceId } = req.params;
    const status = deviceStatus[deviceId] || 'Unknown';
    res.json({ deviceId, status });
});

// Serve the index.html file
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
