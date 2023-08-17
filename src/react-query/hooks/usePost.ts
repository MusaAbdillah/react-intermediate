import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface PostQuery {
    // page: number;
    pageSize: number;
}
  
const usePost = (query: PostQuery) => {
    const fetchData = ({pageParam = 1} ) => axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {params: {_start: (pageParam - 1) * query.pageSize, _limit: query.pageSize}})
    .then((res) => (res.data))
    

    return useInfiniteQuery<Post[], Error>({
        // users/1/posts
        queryKey:  ['posts', query],
        queryFn: fetchData,
        staleTime: 1 * 60 * 1000 ,// 60 seconds
        keepPreviousData: true,
        getNextPageParam: (lastPage, allPages) => {
            // 1 -> 2
            return lastPage.length > 0 ? allPages.length + 1 : undefined
        },
    })
}

export default usePost;