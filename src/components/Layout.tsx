import React from "react";
import { Navbar } from "./Navbar";

type Props = {
  children: React.ReactNode;
};
export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="p-6">{children}</main>
    </>
  );
};
