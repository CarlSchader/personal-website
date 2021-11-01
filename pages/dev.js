import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HtmlBase from '../components/HtmlBase';
import DevDiaryCard from '../components/DevDiaryCard';
import { getRegistry, parseComments, toUrlValid } from '../lib/diaries';
import SocialBar from '../components/SocialBar';
import { useEffect, useState } from 'react';

function DevDiaryCardHelper({ title, url }) {
  const [diary, setDiary] = useState('');

  useEffect(async function() {
    const res = await fetch(url);

    if (res.ok) {
      const diary = await res.text();
      setDiary(diary);
    }
  }, []);

  if (!diary) {
    return <div></div>;
  } else {
    const metaData = parseComments(diary);
    return <DevDiaryCard title={metaData.title} date={metaData.date} description={metaData.description} hero={metaData.hero} href={"/dev/" + toUrlValid(title)} />;
  }
}

export default function Dev({ registry }) {

  return (
    <HtmlBase>
      <Container maxWidth="lg">
        <Grid container align="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h1">Dev Diaries</Typography>
          </Grid>
          <Grid item xs={12}>
            <SocialBar />
          </Grid>
          {registry.map(diary => <Grid key={diary.title} item xs={6}><DevDiaryCardHelper title={diary.title} url={diary.url} /></Grid>)}
        </Grid>
      </Container>
    </HtmlBase>
  );
}

export async function getServerSideProps(context) {
  const registry = await getRegistry();

  return {
    props: {
      registry: registry,
    },
  }
}