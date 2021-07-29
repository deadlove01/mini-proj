import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import { addCommentsAsync } from "../utils/axiosUtils";
import CommentList from "./CommentList";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const CommentCreate = ({ id, title, comments }) => {
  const classes = useStyles();
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(content);
    await addCommentsAsync({ id: id, data: { content } });
    setContent("");
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        {/* <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          post by someone
        </Typography>
        <Typography variant="body2" component="p">
          some cool content here.
        </Typography> */}
        <CommentList title={title} postId={id} comments={comments} />
      </CardContent>
      <CardActions>
        <form onSubmit={handleSubmit}>
          <TextField
            style={{ width: "100%" }}
            placeholder="typing something..."
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <br />
          <Button size="small" type="submit">
            Reply
          </Button>
        </form>
      </CardActions>
    </Card>
  );
};
export default CommentCreate;
