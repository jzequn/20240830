"use client";
import Image from "next/image";
import { useCallback, useState } from "react";
// import sass from './globals.scss';
import sass from './page.module.scss';
import { useDropzone } from 'react-dropzone'
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast,ToastContainer } from 'react-toastify';
// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// import { BlobProvider, Document, Page } from '@react-pdf/renderer';


import { Document, Page, pdfjs } from 'react-pdf';
import PDFFiles from "@/components/pdfFiles";
import PDFFileDownload from "@/components/pdfFileDownload";
import { PDFDownloadLink } from '@react-pdf/renderer';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();
export default function Home() {

  const [URL, setURL] = useState('');
  const [file, setFile] = useState(null);
  const notify = (message) => toast(message);
  const [binaryStr, setBinary] = useState('')
  // const [base64, setBase64] = useState('');
  // const [blob, setBlob] = useState(null);
  // const [pdf, setPDF] = useState(null);



  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        // console.log('fbinaryStr: ', binaryStr) // test
        const pdfBlob = new Blob([binaryStr], { type: 'application/pdf' });
        const base64String = btoa(new Uint8Array(binaryStr).reduce(function (data, byte) {
          return data + String.fromCharCode(byte);
        }, ''));

        // setBase64(base64String);
        setBinary(binaryStr)

        let URL = `data:application/pdf;base64,${base64String}`;
        setURL(URL);
        // const url = window.URL.createObjectURL(pdfBlob);
        // setBlob(url);
      }

      // console.log('file: ', file) // test
      // setPDF(file);
      setFile(file);
      reader.readAsArrayBuffer(file)
    })

    const fileRejectionItems = fileRejections.forEach(({ file, errors }) => {
      console.log(errors);
      // notify(errors.message);
      console.log(errors[0].message)
      notify('Filetype must be pdf!')
    });

  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop, accept: {
      'application/pdf': ['.pdf'],
    }
  })

  const handleRemoveFile = () => {
    setBinary('');
    setFile(null);
    setURL('');
  }
  return (
    <main className={sass.main}>

      {
        URL.length === 0 ? (
          <>
            <div className={sass.instruction}>
              <h1>Rotate PDF pages</h1>
              <p>Simply click on a page to rotate it. You can then download your modified PDF.</p>
            </div>

            <div className={`${sass.dropzone}`}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <div className={sass.icon}><IoCloudUploadOutline /></div>
              <p>Click to upload or drag and drop</p>
            </div>
          </>
        ) : (
          <>
            <div className={sass.instruction}>
              <h1>Rotate PDF pages</h1>
              <p>Simply click on a page to rotate it. You can then download your modified PDF.</p>
            </div>
            <div className={sass.pdf}>
              <PDFFiles
                url={URL}
                binary={binaryStr}
                file={file}
                handleRemoveFile={handleRemoveFile}
              />

              {/* Todo change pdf filename,  */}
              {/* Notification upload error, filetype should be pdfF */}


            </div>

          </>
        )
      }

      <ToastContainer/>
    </main>
  );
} 
