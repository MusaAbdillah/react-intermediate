import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_QUERY_FN_TODOS } from "../constants";
import todoService, { Todo } from "../services/todoService";

interface AddTodoContext {
    previousTodos: Todo[];
  }
  

const useAddTodo = (onAdd: () => void) => {

    const queryClient = useQueryClient();

    return useMutation<Todo, Error, Todo, AddTodoContext>({
      mutationFn: todoService.post,
      onMutate: (newTodo: Todo) => {
        const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_QUERY_FN_TODOS) || [];
  
        queryClient.setQueryData<Todo[]>(CACHE_QUERY_FN_TODOS, (todos) => [
          newTodo,
          ...(todos || []),
        ]);
  
        onAdd();
  
        return { previousTodos };
      },
      onSuccess: (savedTodo, newTodo) => {  
        console.log("--- savedTodo ---");


        console.log(savedTodo);








        // APPROACH 1: Invalidating the cache
        // queryClient.invalidateQueries({
        //   queryKey: CACHE_QUERY_FN_TODOS,
        // });
        // APPROACH 2: Updating the data in cache
        queryClient.setQueryData<Todo[]>(CACHE_QUERY_FN_TODOS, (todos) =>
          todos?.map((todo) => todo === newTodo ? savedTodo : todo)
        );
      },
      onError: (error, newTodo, context) => {
        if (!context) return;
        queryClient.setQueryData<Todo[]>(CACHE_QUERY_FN_TODOS, context.previousTodos);
      },
    });
  
}

export default useAddTodo;