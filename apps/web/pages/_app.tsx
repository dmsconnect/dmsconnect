import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import Head from "next/head";

import { ApplicationConfig } from "@dmsconnect/constants";

import "@/globals.css";
import Layout from "@/pages/_layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>{ApplicationConfig.appName}</title>
        <meta name="description" content={ApplicationConfig.appDescription} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
}
