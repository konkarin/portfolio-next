import type { NextPage } from "next";
import { useRouter } from "next/router";
import { HeadTemplate } from "../components/HeadTemplate/HeadTemplate";

const Home: NextPage = () => {
  return (
    <div>
      <HeadTemplate />;
    </div>
  );
};

export default Home;
