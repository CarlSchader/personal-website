import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HtmlBase from '../components/HtmlBase';
import MathCard from '../components/MathCard';
import { getRegistry, toUrlValid } from '../lib/diaries';
import SocialBar from '../components/SocialBar';

function DevDiaryCardHelper({ title, hero }) {
  return <MathCard title={title} hero={hero} href={"/math/" + toUrlValid(title)} />;
}

export default function Dev({ registry }) {

  return (
    <HtmlBase>
      <Container maxWidth="lg">
        <Grid container align="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h1">Math</Typography>
          </Grid>
          <Grid item xs={12}>
            <SocialBar />
          </Grid>
          {registry.map(diary => <Grid key={diary.title} item xs={6}><DevDiaryCardHelper title={diary.title} hero={diary.hero} /></Grid>)}
        </Grid>
      </Container>
    </HtmlBase>
  );
}

export async function getServerSideProps(context) {
  const registry = await getRegistry(process.env.MATH_REGISTRY_URL);

  return {
    props: {
      registry: registry,
    },
  }
}