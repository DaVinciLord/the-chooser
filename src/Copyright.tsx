import React from "react";
import { Typography } from "@material-ui/core";

const CopyRight: React.FunctionComponent = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Vincent METTON {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default CopyRight;
