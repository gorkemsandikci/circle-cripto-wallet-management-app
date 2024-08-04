import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const initializeUser = async () => {
    const idempotencyKey = uuidv4();
    const userToken = localStorage.getItem('userToken');
    try {
        const response = await axios.post("http://localhost:5000/api/initialize_user", {
            idempotencyKey,
            userToken
        })
        console.log('idempotency key: ', idempotencyKey);
        return {
            challengeId: response.data.challengeId
        };
    } catch (error) {
        console.error('Error in initialize user : ', error.response?.data || error.message);
    }
};
