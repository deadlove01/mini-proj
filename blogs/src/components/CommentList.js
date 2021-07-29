import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { findAllCommentsAsync } from "../utils/axiosUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const CommentList = ({ postId, title, comments }) => {
  const classes = useStyles();

  // const [comments, setComments] = useState([]);

  // const fetchComments = async () => {
  //   const res = await findAllCommentsAsync({ id: postId });
  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchComments();
  // }, []);

  const renderedComments = () => {
    return (
      <>
        {comments.map((item) => {
          let content = "";
          if (item.status === "pending") {
            content = "waiting for review";
          }
          if (item.status === "rejected") {
            content = "rejected";
          }
          if (item.status === "approved") {
            content = item.content;
          }
          return (
            <div key={item.id}>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText />
                <ListItemText
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {content}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemText primary={title} />
      </ListItem>
      {comments && renderedComments()}
    </List>
  );
};

export default CommentList;
