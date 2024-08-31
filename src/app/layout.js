import { Inter } from "next/font/google";
import "./globals.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";

// import Favicon from '/public/favicon.ico';
import Favicon from './favicon.ico';
const inter = Inter({ subsets: ["latin"] });

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// solve TypeError: Promise.withResolvers is not a function, need to install core-js
import 'core-js/full/promise/with-resolvers.js';
if (typeof Promise.withResolvers === 'undefined') {
  if (typeof window !== 'undefined') {
    window.Promise.withResolvers = function () {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
  } else {
    global.Promise.withResolvers = function () {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
  }
}

export const metadata = {
  title: "PDF.ai",
  description: "Free PDF Page Rotator - Rotate Individual or All Pages",
};
// icons: [{ rel: 'icon', url: Favicon.src }],

export default function RootLayout({ children }) {
  return (
    <html
      // className={sass.global}
      lang="en">

      {/* <head>
        <link rel="icon"
          // href="/favicon.ico"
          href={Favicon}
          sizes="any" />
      </head> */}
      <body className={inter.className}>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Header />
        {children}
        <Footer />
        <ToastContainer />
      </body>


    </html>
  );
}
