import axios from "axios";
import { useEffect, useState } from "react";
import usePost from "./hooks/usePost";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const PostList = () => {
  // const [userId, setUserId] = useState<number>();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const {
    data: posts,
    error,
    isLoading,
  } = usePost({ page: page, pageSize: pageSize });

  if (error) return <p>{error.message}</p>;

  return (
    <>
      {/* <select
        value={userId}
        onChange={(event) => setUserId(parseInt(event.target.value))}
        className="form-select mb-3"
      >
        <option value=""></option>
        <option value="1">User1</option>
        <option value="2">User2</option>
        <option value="3">User3</option>
      </select> */}
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        disabled={page === 1}
        className="btn btn-primary my-3"
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <button
        // disabled={page === 1}
        className="btn btn-primary my-3 ms-1" //ms-1 margin start 1
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </>
  );
};

export default PostList;
