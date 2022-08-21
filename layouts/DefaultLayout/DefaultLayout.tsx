import { ReactElement } from "react";
import { HeaderNav } from "../../components/HeaderNav/HeaderNav";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const DefaultLayouts = ({ children }: LayoutProps) => {
  return (
    <>
      <HeaderNav />
      <main className="wrapper">{children}</main>
    </>
  );
};
