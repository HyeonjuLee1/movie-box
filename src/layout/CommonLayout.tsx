import { memo, type ReactNode } from "react";
import Header from "./Header";

type CommonLayoutProps = {
  children: ReactNode;
};

export const CommonLayout = memo(({ children }: CommonLayoutProps) => (
  <div className="h-auto mx-auto relative">
    <Header />
    <section className="min-h-screen">{children}</section>
  </div>
));
