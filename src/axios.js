import axios from "axios";

const useAxios = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
    }
});

export default useAxios;
