"use client";

import {ReactNode} from "react";

import {usePrimaryColor} from "./primary-provider";
import {Badge} from "./ui/badge";

export const PrimaryBadge = ({children}: {children: ReactNode}) => {
  const {primaryColor} = usePrimaryColor();

  return (
    <Badge className={`bg-${primaryColor}-700 uppercase dark:text-white`}>
      {children}
    </Badge>
  );
};
