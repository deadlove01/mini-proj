import React, { useRef } from "react";
import { Grid, TextField, Typography } from "@material-ui/core";
import axios from 'axios'

const PostCreate = () => {
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = inputRef.current.value;

    await axios.post("http://localhost:4000/posts", {
      title,
    });
    inputRef.current.value = "";
  };

  return (
    <Grid item xs={12} sm={8}>
      <Typography variant="h3">Create Post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          inputRef={inputRef}
          style={{ width: "100%" }}
          placeholder="typing something..."
          label="Required"
          id="inputPost"
        />
      </form>
    </Grid>
  );
};

export default PostCreate;
