import "../styles/globals.scss";

import type { AppPropsWithLayout } from "next/app";

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
