'use client';
import React, { useEffect, useState, Suspense } from 'react'
import {
    Page,
} from 'react-pdf';

import sass from './pdfPage.module.scss';
import { FaArrowsRotate } from "react-icons/fa6";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

const PDFPage = ({ page, handleRotate, rotate, zoom }) => {

    const [currentRotate, setCurrentRotate] = useState(rotate)
    const [currentZoom, setZoom] = useState(rotate)


    useEffect(() => {
        setCurrentRotate(rotate)
    }, [rotate])
    useEffect(() => {
        setZoom(zoom);
    }, [zoom])
    const handleClick = () => {
        handleRotate(page);
        setCurrentRotate(prev => prev + 90)
    }
    return (

        <div
            className={sass.pdf}
            onClick={handleClick}
        >

            <Suspense fallback={<>Loading...</>}>
                <Page
                    height={300 * currentZoom}
                    width={225 * currentZoom}
                    rotate={currentRotate}
                    pageNumber={page + 1} />
            </Suspense>


            <span className={sass.rotate}><FaArrowsRotate /></span>
            <span className={sass.pageNumber}>{page + 1}</span>
        </div>

    )
}

export default PDFPage