import React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={"relative z-10 mx-auto max-w-6xl px-4 md:px-8"}>
      {children}
    </div>
  );
};

export default Container;
