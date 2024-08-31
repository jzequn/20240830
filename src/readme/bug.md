
# Bugs

- [ ] footer.module.scss 
  - [ ] @include device(tablet) do not work why?


## Fail to compile nextjs app because of webpack error, config pdfjs error in react-pdf, see pdfFiles.jsx
31/08/2024

- [x] [Error during production build with pdfjs-dist. static/media/pdf.worker.min.05101219.mjs from Terser x 'import', and 'export' cannot be used outside of module code · vercel/next.js · Discussion #61549](https://github.com/vercel/next.js/discussions/61549)
31/08/2024

- [ ] [static/media/pdf.worker.min.5a50a73d.mjs from Terser x 'import', and 'export' cannot be used outside of module code - Google 搜尋](https://www.google.com/search?q=static%2Fmedia%2Fpdf.worker.min.5a50a73d.mjs+from+Terser+x+%27import%27%2C+and+%27export%27+cannot+be+used+outside+of+module+code&oq=static%2Fmedia%2Fpdf.worker.min.5a50a73d.mjs+from+Terser+x+%27import%27%2C+and+%27export%27+cannot+be+used+outside+of+module+code&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg60gEHMjcwajBqMagCALACAA&sourceid=chrome&ie=UTF-8)
31/08/2024

- [ ] [PDFjs-dist error · Issue #1822 · wojtekmaj/react-pdf](https://github.com/wojtekmaj/react-pdf/issues/1822)

31/08/2024

- [x] [Next.js and v9 on build Promise.withResolvers · Issue #1811 · wojtekmaj/react-pdf](https://github.com/wojtekmaj/react-pdf/issues/1811)
31/08/2024

- [ ] [Next.js and v9 on build Promise.withResolvers · Issue #1811 · wojtekmaj/react-pdf](https://github.com/wojtekmaj/react-pdf/issues/1811)

> Solution: downgrade


## TypeError: Promise.withResolvers is not a function
> Read react-pdf docs
01/09/2024

- [x] [Next.js and v9 on build Promise.withResolvers · Issue #1811 · wojtekmaj/react-pdf](https://github.com/wojtekmaj/react-pdf/issues/1811)

- [x] [Add Promise.withResolvers polyfill · wojtekmaj/react-pdf@2ba89d8](https://github.com/wojtekmaj/react-pdf/commit/2ba89d8cb968af6e522e688329cbf2e412b80462#diff-1311039ee9a07d96a0d86f38d8f3ddb62522dbf66d1986a9e842d66d837c36c6R4)

```js
// Solution
// put this code in src/app/layout.js
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

// put this in next.config.js // is this neccessary?
import 'core-js/full/promise/with-resolvers.js';

// put this in pdfFiles.jsx
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
    import.meta.url
).toString();
```