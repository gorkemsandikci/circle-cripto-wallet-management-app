const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const {v4: uuidv4} = require('uuid');

require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

app.post('/api/initialize_user', async (req, res) => {

    const idempotencyKey = req.body.idempotencyKey || require('uuid').v4();
    const userToken = req.body.userToken;
    const options = {
        method: "POST",
        url: "https://api.circle.com/v1/w3s/user/initialize",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`,
            "X-User-Token": userToken,
        },
        data: {
            idempotencyKey: idempotencyKey,
            accountType: "SCA",
            blockchains: ["MATIC-AMOY"],
        },
    };
    try {
        const response = await axios.request(options);
        res.status(200).json({challengeId: response.data.data.challengeId});
    } catch (error) {
        console.error("Error initializing user:", error);
        res.status(500).json({error: 'An error occurred', details: error.response});
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '127.0.0.1', ()=>console.log(`Server running on port ${PORT}`));
