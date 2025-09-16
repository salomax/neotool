"use client";

import * as React from "react";
import { Avatar as MAvatar, AvatarProps as MAvatarProps } from "@mui/material";

export interface AvatarProps extends MAvatarProps {
  name?: string;
  src?: string;
}

function initials(name: string | undefined) {
  if (!name) return "?";
  const parts = name.trim().split(" ").filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  children,
  ...rest
}) => {
  return (
    <MAvatar {...(src && { src })} {...rest}>
      {children ?? initials(name)}
    </MAvatar>
  );
};

export default Avatar;
