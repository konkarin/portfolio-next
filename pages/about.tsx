import type { GetStaticProps } from "next";

import { MarkdownPreview } from "../components/MarkdownPreview/MarkdownPreview";
import { convertMarkdownTextToHTML } from "../utils/markdown";
import Firestore from "../firestore";
import { HeadTemplate } from "../components/HeadTemplate/HeadTemplate";
import { DefaultLayouts } from "../layouts/DefaultLayout/DefaultLayout";

import type { NextPageWithLayout } from "next";

type Props = {
  htmlText: string;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await Firestore.getDocById(
    "users",
    process.env.NEXT_PUBLIC_AUTHOR_ID!
  );

  const profile = data !== undefined ? (data.profile as string) : "";
  const htmlText = await convertMarkdownTextToHTML(profile);

  return {
    props: {
      htmlText,
    },
  };
};

const About: NextPageWithLayout<Props> = ({ htmlText }) => {
  return (
    <>
      <HeadTemplate path="About" />
      <article className="wrapper">
        <h1>
          About
          <a
            href="https://twitter.com/k0n_karin"
            className="pageTitle__link"
            target="_blank"
          >
            こんかりん
          </a>
        </h1>
        <section className="profile">
          <MarkdownPreview htmlText={htmlText} />
          {/* TODO: svg */}
        </section>
      </article>
    </>
  );
};

About.getLayout = (page) => <DefaultLayouts>{page}</DefaultLayouts>;

export default About;
