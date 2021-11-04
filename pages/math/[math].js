import { useState, useEffect } from 'react';
import HtmlBase from '../../components/HtmlBase';
import { getRegistry } from '../../lib/diaries';

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

export default function Math({ pdfUrl }) {
  const [width, height] = useWindowSize();

  return (
    <HtmlBase>
      <iframe
        src={`${pdfUrl}#toolbar=0`}
        width={width}
        height={height * 0.75}
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
  } else {
    return {
      props: {
        pdfUrl: registry[index].url,
      },
    }
  }
}