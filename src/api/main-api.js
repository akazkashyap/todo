import axios from "axios";


export const api = axios.create({
    baseURL: 'http://qch.local/todo_api'
})