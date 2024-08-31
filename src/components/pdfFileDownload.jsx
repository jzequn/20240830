import React, { useMemo } from 'react'
import { usePDF, Document, Page, Text } from '@react-pdf/renderer';


const PDFFileDownload = ({ file }) => {
    let document = useMemo(() => <Document
        // file={blob}
        // file={{
        //     data: file
        //     // data: blob
        // }}
        file={file}
    >
        <Page
            height={300}
            width={225}
            rotate={90}
            pageNumber={2} >
            <Text>{file}</Text>
        </Page>
    </Document>, [file])

    const [instance, updateInstance] = usePDF({
        document
    });
    return (
        <a href={instance.url} download="test.pdf">
            Download
        </a>
    )
}

export default PDFFileDownload