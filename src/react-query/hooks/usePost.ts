import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface PostQuery {
    page: number;
    pageSize: number;
}
  
const usePost = (query: PostQuery) => {
    const fetchData = () => axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {params: {_start: (query.page - 1) * query.pageSize, _limit: query.pageSize}})
    .then((res) => (res.data))
    

    return useQuery<Post[], Error>({
        // users/1/posts
        queryKey:  ['posts', query],
        queryFn: fetchData,
        staleTime: 1 * 60 * 1000 ,// 60 seconds
        keepPreviousData: true
    })
}

export default usePost;