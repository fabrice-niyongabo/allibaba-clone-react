import React from "react";
import { Backdrop, CircularProgress, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface IFullPageLoader {
  open: boolean;
}

const FullPageLoader: React.FC<IFullPageLoader> = (props) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={props.open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default FullPageLoader;
