import axios from "axios";

export const getAppId = async () => {
    const options = {
        method: "GET",
        url: "https://api.circle.com/v1/w3s/config/entity",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`,
        }
    };

    return axios
        .request(options)
        .then(function (response) {
            return {
                appId: response.data.data.appId
            };
        })
        .catch(function (error) {
            console.error(error);
        });
};