import React, { useEffect, useState } from 'react'
import {
    Page
} from 'react-pdf';

import sass from './pdfPage.module.scss';
import { FaArrowsRotate } from "react-icons/fa6";


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
            <Page
                height={300*currentZoom}
                width={225*currentZoom}
                rotate={currentRotate}
                pageNumber={page + 1} />

            <span className={sass.rotate}><FaArrowsRotate /></span>
            <span className={sass.pageNumber}>{page + 1}</span>
        </div>

    )
}

export default PDFPage