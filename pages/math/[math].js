import { useState, useEffect } from 'react';
import HtmlBase from '../../components/HtmlBase';
import { getRegistry } from '../../lib/diaries';
import process from 'process';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

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

export default function Math({ pdfPath }) {
  const [width, height] = useWindowSize();

  return (
    <HtmlBase>
      <iframe
        src={`/${pdfPath}#toolbar=0`}
        width={width}
        height={height * 0.875}
      >
      </iframe>
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
  }

  const url = registry[index].url;

  const filePath = path.join('math', context.params.math + '.pdf');
  const fileStream = fs.createWriteStream(path.join(process.cwd(), 'public', filePath));
  
  const res = await fetch(url);
  
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on("error", reject);
    fileStream.on("finish", resolve);
  });

  return {
    props: {
      pdfPath: filePath,
    },
  }
}