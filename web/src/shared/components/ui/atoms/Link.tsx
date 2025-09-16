"use client";

import * as React from "react";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export interface LinkProps extends MuiLinkProps {
  external?: boolean;
  showIcon?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  external,
  showIcon = external,
  children,
  ...rest
}) => {
  const props = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <MuiLink {...props} {...rest}>
      {children}
      {showIcon && (
        <OpenInNewIcon fontSize="inherit" style={{ marginLeft: 4 }} />
      )}
    </MuiLink>
  );
};

export default Link;
