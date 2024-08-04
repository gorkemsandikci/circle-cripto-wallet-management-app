import axios from "axios";

export const acquireSessionToken = async () => {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            throw new Error("User ID not found in localStorage");
        }
        const options = {
            method: "POST",
            url: "https://api.circle.com/v1/w3s/users/token",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`,
            },
            data: {userId: userId},
        };

        return axios
            .request(options)
            .then(function (response) {
                localStorage.setItem('userToken', response.data.data.userToken);
                localStorage.setItem('encryptionKey', response.data.data.encryptionKey);
                return {
                    userToken: response.data.data.userToken,
                    encryptionKey: response.data.data.encryptionKey,
                };
            })
            .catch(function (error) {
                console.error(error);
            });

    } catch (error) {
        console.error("Error acquiring session token:", error);
        console.error(error);
    }
};

