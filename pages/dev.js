import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HtmlBase from '../components/HtmlBase';
import DevDiaryCard from '../components/DevDiaryCard';
import getDiaries from '../lib/diaries';
import SocialBar from '../components/SocialBar';

export default function Dev({ diaries }) {
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
          {diaries.map(diary => <Grid key={diary.title} item xs={6}><DevDiaryCard diary={diary} href={"/dev/" + diary.urlName} /></Grid>)}
        </Grid>
      </Container>
    </HtmlBase>
  );
}

export function getStaticProps(context) {
  return {
    props: {
      diaries: getDiaries()
    },
  }
}