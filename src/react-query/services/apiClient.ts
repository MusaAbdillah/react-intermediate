import axios from "axios";

const axiosInstance = axios
            .create({
                baseURL:'https://jsonplaceholder.typicode.com' 
            });

class ApiClient<T> {
    endpoint: string;

    constructor(endpoint: string){
        this.endpoint = endpoint;
    }

    getAll = () => {
        return axiosInstance.get(this.endpoint).then((res) => res.data);
    }

    post = (data: T) => {
        return axiosInstance.post(this.endpoint, data).then((res) => res.data);
    }
}

export default ApiClient