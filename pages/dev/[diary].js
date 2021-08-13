import Image from 'next/image';
import Link from 'next/link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HtmlBase from '../../components/HtmlBase';
import Markdown from '../../components/Markdown';
import getDiaries from '../../lib/diaries';
import SocialBar from '../../components/SocialBar';

export default function Diary({ data, title, date, hero, previous, next, previousTitle, nextTitle }) {
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
      <img src={hero} width="100%" height="100%" alt="diary hero" />
      <Container maxWidth="lg">
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

export function getStaticProps(context) {
  const diaries = getDiaries();
  const index = diaries.findIndex(elem => elem.urlName === context.params.diary);

  return {
    props: {
      ...diaries[index],
      next: index < diaries.length - 1 ? diaries[index + 1].urlName : null,
      nextTitle: index < diaries.length - 1 ? diaries[index + 1].title : null,
      previous: index > 0 ? diaries[index - 1].urlName : null,
      previousTitle: index > 0 ? diaries[index - 1].title : null,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: getDiaries().map(elem => ({ params: { diary: elem.urlName } })),
    fallback: false,
  }
}