import Head from "next/head";

type Props = {
  path?: string;
};

export const HeadTemplate = ({ path = "" }: Props) => {
  const titleTemplate = "kon_karin's photo & blog";
  const title = path === "" ? titleTemplate : `${path} - ${titleTemplate}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
