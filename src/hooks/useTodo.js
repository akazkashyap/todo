import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/main-api";


export function useTodos() {
    return useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const { data } = await api.get('/todos')
            return data
        }
    })
}

export function useAddTodo() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (newTodo) => {
            const { data } = await api.post("/todos", newTodo)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })
}


export function useGetTodo() {
    return useQuery({
        queryKey: ['todo'],
        queryFn: async (id) => {
            const { data } = await api.get('/todo/' + id)
            return data
        }
    })
}

export function useUpdateTodo() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (updatedTodo) => {
            const { data } = await api.put(`/todo/${updatedTodo.id}`, updatedTodo)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })
}

export function useDeleteTodo() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete('/todo/' + id)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })
}