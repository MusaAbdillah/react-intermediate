import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ApiClient from "../services/apiClient";

const apiClient = new ApiClient<Todo>('/todos');

export interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
  }

  
const useTodo  = () => {
        // const fetchData = () =>
        //   axios
        //     .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
        //     .then((res) => res.data);
      
        return useQuery<Todo[], Error>({
          queryKey: ["TodoList"],
          queryFn: apiClient.getAll,
        });
}

export default useTodo;