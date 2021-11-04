import { useState, useEffect } from 'react';
import HtmlBase from '../../components/HtmlBase';
import { getRegistry } from '../../lib/diaries';
import { Document, Page, pdfjs } from 'react-pdf';

export default function Math({ pdfUrl, /*data, date, hero, previous, next, previousTitle, nextTitle*/ }) {
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [width] = useWindowSize();

  function onPdfLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <HtmlBase>
      <Document file={pdfUrl} onLoadSuccess={onPdfLoadSuccess}>
        {
          Array(numPages).fill().map((_, i) => [<Page width={width} pageNumber={i + 1} key={i + 1} />, <br key={i + 1} />])
        }
      </Document>
    </HtmlBase >
  );
}

export async function getServerSideProps(context) {
  const registry = await getRegistry(process.env.MATH_REGISTRY_URL);

  const index = registry.findIndex(elem => elem.title.toLowerCase().replace(/\s+/g, '') === context.params.math);

  if (index < 0) {
    return {
      redirect: {
        permanent: false,
        destination: '/math',
      },
      props: {},
    };
  } else {
    return {
      props: {
        pdfUrl: registry[index].url,
      },
    }
  }
}