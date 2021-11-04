import { useEffect } from 'react';
import HtmlBase from '../../components/HtmlBase';
import { getRegistry } from '../../lib/diaries';
import process from 'process';
import * as htmlUtils from '../../lib/htmlUtils';
import styled from 'styled-components';
import useScript from '../../hooks/useScript';

export default function Math({ styleString, contentString }) {
  useScript("https://polyfill.io/v3/polyfill.min.js?features=es6");
  useScript("https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js");

  const Container = styled.div`
    ${styleString}
  `;
  
  useEffect(() => {
    try {
      MathJax.typeset();
    } catch (e) {
      console.error(e);
    }
  });

  return (
      <HtmlBase>
        <Container>
            <html dangerouslySetInnerHTML={{ __html: contentString }}></html>
        </Container>
      </HtmlBase>
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

  const contentUrl = registry[index].url;

  const res = await fetch(contentUrl);
  const htmlContent = await res.text();

  const styleString = htmlUtils.innerHtml(htmlUtils.parseTag(htmlContent, 'style'));
  const contentString = htmlUtils.parseTag(htmlContent, 'body');

  return {
    props: {
      styleString,
      contentString,
    },
  }
}