import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosPromise } from "axios";
import type { FoodData } from "../interface/FoodData";

const API_URL = "http://localhost:8080";

const updateData = async (data: FoodData): AxiosPromise<any>=> {
    const response = axios.put(`${API_URL}/food/${data.id}`, data)
    return response;
}

export function useFoodDataUpdate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: updateData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['food-data']})
        }
    })

    return mutate;
}