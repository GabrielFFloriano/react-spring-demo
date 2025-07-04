import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosPromise } from "axios";

const API_URL = "http://localhost:8080";

const deleteData = async (id: number): AxiosPromise<any>=> {
    const response = axios.delete(`${API_URL}/food/${id}`)
    return response;
}

export function useFoodDataDelete(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['food-data']})
        }
    })

    return mutate;
}