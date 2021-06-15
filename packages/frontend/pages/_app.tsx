import React from "react";

import { ApolloProvider } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AppProps } from "next/app";
import { polyfill } from "smoothscroll-polyfill";

import { Layout } from "@/components/templates/Layout";
import { AuthProvider } from "@/context/auth";
import { client } from "@/graphql/client";

import "dayjs/locale/ja";
import "moment/locale/ja";
import "semantic-ui-css/semantic.min.css";
import "react-semantic-toasts/styles/react-semantic-alert.css";

dayjs.locale("ja");
dayjs.extend(customParseFormat);

if (typeof window !== "undefined") {
  polyfill();
}

Sentry.init({
  dsn: process.env.SENTRY_FRONTEND_DSN,
  integrations: [new Integrations.BrowserTracing()],
  environment: process.env.SENTRY_ENV,
  tracesSampleRate: 1.0,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
