import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
  
const usePost = () => {
    const fetchData = () => 
    axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    .then((res) => (res.data))

    return useQuery<Post[], Error>({
        queryKey: ["Post"],
        queryFn: fetchData,
        staleTime: 1 * 60 * 1000 // 60 seconds
    })
}

export default usePost;