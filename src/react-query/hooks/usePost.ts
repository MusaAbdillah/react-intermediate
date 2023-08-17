import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
  
const usePost = (userId: number | undefined) => {
    const fetchData = () => axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {params: {userId}})
    .then((res) => (res.data))
    

    return useQuery<Post[], Error>({
        // users/1/posts
        queryKey: userId ? ['users', userId, 'posts'] : ['posts'],
        queryFn: fetchData,
        staleTime: 1 * 60 * 1000 // 60 seconds
    })
}

export default usePost;