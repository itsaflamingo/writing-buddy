/* eslint-disable semi */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable object-curly-newline */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          src={`https://cdn.tiny.cloud/1/${process.env.REACT_APP_TINYMCE_KEY}/tinymce/5/tinymce.min.js`}
          referrerPolicy="origin"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
