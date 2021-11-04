import Image from 'next/image';
import Link from 'next/link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HtmlBase from '../../components/HtmlBase';
import Markdown from '../../components/Markdown';
import { getRegistry, parseComments, toUrlValid } from '../../lib/diaries';
import SocialBar from '../../components/SocialBar';
import process from 'process';

export default function Diary({ data, date, hero, previous, next, previousTitle, nextTitle }) {
  function DiaryNavs() {
    return (
      <Grid container maxWidth="lg">
        <Grid item xs={6}>
          {
            previous ?
              <Link href={`/dev/${previous}`} passHref><a><Typography variant="h6">previous diary: {previousTitle}</Typography></a></Link> :
              <></>
          }
        </Grid>
        <Grid align="right" item xs={6}>
          {
            next ?
              <Link href={`/dev/${next}`} passHref><a><Typography variant="h6">next diary: {nextTitle}</Typography></a></Link> :
              <></>
          }
        </Grid>
      </Grid>
    );
  }

  return (
    <HtmlBase>
      <Container maxWidth="lg">
        <Grid item xs={12}>
          <img src={hero} width="100%" height="100%" alt="diary hero" />
        </Grid>
        <DiaryNavs />
        <Grid container maxWidth="lg" align="left">
          <Grid item xs={12}>
            <SocialBar />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Uploaded: {new Date(date).toLocaleDateString()}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Markdown>{data}</Markdown>
          </Grid>
        </Grid>
        <DiaryNavs />
      </Container>
    </HtmlBase >
  );
}

export async function getServerSideProps(context) {
  const registry = await getRegistry(process.env.DIARY_REGISTRY_URL);

  const index = registry.findIndex(elem => elem.title.toLowerCase().replace(/\s+/g, '') === context.params.diary);

  if (index < 0) {
    return {
      redirect: {
        permanent: false,
        destination: '/dev',
      },
      props: {},
    };
  } else {
    const diary = (await (await fetch(registry[index].url)).text());

    const metaData = parseComments(diary);

    return {
      props: {
        data: diary,
        title: registry[index].title,
        ...metaData,
        next: index < registry.length - 1 ? toUrlValid(registry[index + 1].title) : null,
        nextTitle: index < registry.length - 1 ? registry[index + 1].title : null,
        previous: index > 0 ? toUrlValid(registry[index - 1].title) : null,
        previousTitle: index > 0 ? registry[index - 1].title : null,
      },
    }
  }
}