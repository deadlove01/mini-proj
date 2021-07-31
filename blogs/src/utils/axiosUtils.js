import axios from "axios";

const POST_BASE_URL = "http://posts.com";
const COMMENT_BASE_URL = "http://posts.com";

const findAllPostsAsync = async () => {
  return await axios.get(`http://posts.com:7000/posts`);
};

const addPostsAsync = async (payload) => {
  return await axios.post(`${POST_BASE_URL}:4000/posts/create`, payload);
};

const findAllCommentsAsync = async (payload) => {
  return await axios.get(
    `${COMMENT_BASE_URL}:5000/posts/${payload.id}/comments`
  );
};

const addCommentsAsync = async (payload) => {
  return await axios.post(
    `${COMMENT_BASE_URL}:5000/posts/${payload.id}/comments`,
    payload.data
  );
};

export {
  findAllPostsAsync,
  addPostsAsync,
  findAllCommentsAsync,
  addCommentsAsync,
};
