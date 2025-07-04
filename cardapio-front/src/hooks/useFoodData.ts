import axios, { type AxiosPromise } from "axios"
import type { FoodData } from "../interface/FoodData";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const fetchData = async (): AxiosPromise<FoodData[]>=> {
    const response = axios.get(API_URL + '/food')
    return response;
}

export function useFoodData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['food-data'],
        retry: 2
    })

    return {
        ...query, // ... retornar tudo dentro de query
        data: query.data?.data // .data?.data => data é duplicado pois tanto axios quanto o react query adiciona os dados do backend no obj data  
    }
}