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
  const [userId, setUserId] = useState<number>();
  const { data: posts, error, isLoading } = usePost(userId);

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select
        value={userId}
        onChange={(event) => setUserId(parseInt(event.target.value))}
        className="form-select mb-3"
      >
        <option value=""></option>
        <option value="1">User1</option>
        <option value="2">User2</option>
        <option value="3">User3</option>
      </select>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
