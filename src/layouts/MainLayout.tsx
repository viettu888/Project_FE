import React from "react";

interface Props {
  children?: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="grid min-h-screen grid-cols-4">
      <main className="col-span-3 h-full py-4 px-3">{children}</main>
    </div>
  );
}
