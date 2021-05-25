import axios from "axios";

const Api = axios.create({
    baseURL: 'https://ec2-3-37-73-159.ap-northeast-2.compute.amazonaws.com',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
});

Api.interceptors.request.use(
    (config) => {
        config.headers = {...config.headers,'X-AUTH-TOKEN': window.localStorage.getItem("userToken")};
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Api.interceptors.response.use(
    (response)=>{
        return response;
    },

    (error)=>{
        return Promise.reject(error);
    }
);

export default Api;