const express = require('express');
const app = express();

app.use(express.json());  // Middleware to parse JSON bodies

// Define a route to receive webhooks
app.post('/webhook', (req, res) => {
    console.log('Webhook received:', req.body);
    // Add your processing logic here
    res.status(200).send('Received');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
