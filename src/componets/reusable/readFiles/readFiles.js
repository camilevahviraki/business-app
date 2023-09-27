import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';

const ReadFiles = (props) => {
  const {
    data
  } = props;

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let instance, PSPDFKit;
    (async function () {
      PSPDFKit = await import('pspdfkit');

      PSPDFKit.unload(container);

      instance = await PSPDFKit.load({
        container,
        document: data,

        baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  return (

    <>
      <div
        ref={containerRef}
        className="pdf-file-container"
        style={{ width: '80%', height: '75vh' }}
      />

    </>
  )
}

export default ReadFiles