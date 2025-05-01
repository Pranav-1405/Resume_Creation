import axios from "axios";

const API_KEY = import.meta.env.VITE_API_TOKEN;

const axiosClient = axios.create({
    baseURL:'http://localhost:1337/api',
    headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${API_KEY}`
    }
})

const CreateNewResume = (data) => axiosClient.post('/user-resumes',data)

export default{
   CreateNewResume
}