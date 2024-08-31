"use client";
import { useCallback, useState, Suspense } from "react";
import sass from './page.module.scss';
import { useDropzone } from 'react-dropzone'
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast, ToastContainer } from 'react-toastify';
import PDFFiles from "@/components/pdfFiles";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

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
      // console.log(errors);
      // console.log(errors[0].message)
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

              <Suspense fallback={<>Loading...</>}>
                <PDFFiles
                  url={URL}
                  binary={binaryStr}
                  file={file}
                  handleRemoveFile={handleRemoveFile}
                />
              </Suspense>
              {/* Todo change pdf filename,  */}
              {/* Notification upload error, filetype should be pdfF */}


            </div>

          </>
        )
      }

      <ToastContainer />
    </main>
  );
} 
