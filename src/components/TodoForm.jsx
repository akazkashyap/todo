import { useForm } from "react-hook-form";
import { useAddTodo } from "../hooks/useTodo";


const TodoForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const addTodoMutation = useAddTodo()
    const onSubmit = (newTodo) => {
        addTodoMutation.mutate(newTodo);
        reset();
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-4">
                <input
                    {...register('title', { required: 'Title is required' })}
                    type="text"
                    placeholder="Todo Title"
                    className="p-2" />
                {errors.title && <span className="text-red-500">{errors.title.message}</span>}
                <input
                    {...register('description')}
                    placeholder="Todo Description"
                    className="p-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Add
                </button>
            </form>
        </>
    )
}

export default TodoForm;