'use client';
import { useState } from 'react'
import {
    Document,
    pdfjs
} from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import sass from './pdfFiles.module.scss';
import PDFPage from './pdfPage';

import { RiZoomInLine } from "react-icons/ri";
import { RiZoomOutLine } from "react-icons/ri";

import {
    degrees, PDFDocument
} from 'pdf-lib';


// if deploy on vercel, use legacy one.
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.mjs',
//     import.meta.url,
// ).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
//     import.meta.url
// ).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFFiles = ({ url, binary, file, handleRemoveFile }) => { // file or binaryStr, binaryStr do not work sometimes, how to solve it?

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setRotate(new Array(numPages).fill(0))
    }
    const [numPages, setNumPages] = useState(0);
    const [rotates, setRotate] = useState([]);
    const [zoom, setZoom] = useState(1);

    const handleZoomIn = () => {
        setZoom(prev => {
            if (prev === 1.8) {
                // console.log('enough:', prev)
                return prev;
            } else {
                let updateZoom = prev + 0.1;
                updateZoom = updateZoom.toFixed(1);
                // console.log('zoom + 0.1:', updateZoom)
                return +updateZoom;
            }
        })
    }
    const handleZoomOut = () => {
        setZoom(prev => {
            if (prev === 0.8) {
                // console.log('enough:', prev)
                return prev;
            } else {
                let updateZoom = prev - 0.1;
                updateZoom = updateZoom.toFixed(1);
                // console.log('zoom - 0.1:', updateZoom)
                return +updateZoom;
            }
        })
    }


    const handleRotate = (page) => {
        // console.log('current page is: ', page + 1)
        setRotate(prev => {
            let rotate = [...prev];
            rotate[page] += 90;
            return rotate;
        })
    }

    const handleRotateAll = () => {
        setRotate(prev => {
            let rotate = [...prev];
            rotate = rotate.map(r => r + 90);
            // console.log('rotates: ', rotate)
            return rotate;
        })
    }

    const handleDownload = async () => {
        // const pdfDoc = await PDFDocument.load(existingPdfBytes)
        const pdfDoc = await PDFDocument.load(binary)
        const pages = pdfDoc.getPages()
        if (rotates.length !== 0) {
            // console.log('pages: ', pages)
            // console.log('rotates: ', rotates)
            rotates.forEach((angle, page) => {
                let rotate = angle % 360; // angle
                let currentPage = pages[page];
                currentPage.setRotation(degrees(rotate));
                // console.log('currentPage, rotate: ', page, rotate)
            })
        }

        // pages.forEach(p=>{
        //     p.scale(zoom, zoom);
        // })

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        // window.open(url);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        link.click();
    }




    return (
        <Document
            // file={blob}
            // file={{
            //     // data: file
            //     // data: blob
            //     data: file
            // }}
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
        >
            <div className={sass.document}>
                <div className={sass.btns}>
                    <div className={sass.btnOrange}
                        onClick={handleRotateAll}
                    >
                        Rotate All
                    </div>
                    <div
                        className={sass.btnBlack}
                        onClick={handleRemoveFile}
                    >
                        Remove PDF
                    </div>
                    <div className={sass.zoom}
                        onClick={handleZoomIn}
                    >
                        <RiZoomInLine />
                    </div>
                    <div className={sass.zoom}
                        onClick={handleZoomOut}
                    >
                        <RiZoomOutLine />
                    </div>
                </div>

                <div className={sass.pdfs}>
                    {
                        numPages == 0 ? null : (
                            Array.from(new Array(numPages)).map((_, page) => (
                                <PDFPage
                                    key={page}
                                    page={page}
                                    rotate={rotates[page]}
                                    zoom={zoom}
                                    handleRotate={handleRotate} />
                            ))
                        )
                    }
                </div>

                {/* Todo: tooltips */}
                <div
                    className={sass.btnOrange}
                    onClick={handleDownload}
                >Download</div>
            </div>
        </Document >
    )
}

export default PDFFiles