import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/images/bee-logo.png" />
        <link rel="preconnect" href="https://js.chargebee.com" />
        <link rel="preload" href="https://js.chargebee.com/v2/chargebee.js" as="script" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
