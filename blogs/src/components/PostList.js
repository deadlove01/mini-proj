import React, { useRef, useState, useEffect } from "react";
import { Grid, TextField, Typography } from "@material-ui/core";
import CommentCreate from "./CommentCreate";
// import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { findAllPostsAsync } from "../utils/axiosUtils";

const useStyles = makeStyles({
  postList: {
    marginTop: 40,
  }
});

const PostList = () => {
  const classes = useStyles();

  const [posts, setPosts] = useState({})

  const fetchPosts = async () => {
    const res = await findAllPostsAsync();
    console.log(res.data)
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts()
  }, [])

  const renderedPosts = Object.values(posts).map(post => {
    return (
      <Grid item xs={false} sm={4} key={post.id} >
        <CommentCreate {...post} />
      </Grid>
    );
  });

  return (
    <Grid container item xs={12} sm={8} className={classes.postList} spacing={2}>
      {renderedPosts}
    </Grid>
  );
};

export default PostList;
