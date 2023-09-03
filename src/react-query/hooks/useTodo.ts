import { useQuery } from "@tanstack/react-query";
import todoService, { Todo } from "../services/todoService";


  
const useTodo  = () => {
        // const fetchData = () =>
        //   axios
        //     .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
        //     .then((res) => res.data);
      
        return useQuery<Todo[], Error>({
          queryKey: ["TodoList"],
          queryFn: todoService.getAll,
        });
}

export default useTodo;