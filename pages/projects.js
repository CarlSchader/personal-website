import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HtmlBase from '../components/HtmlBase';
import DevDiaryCard from '../components/DevDiaryCard';
import getDiaries from '../lib/diaries';
import projects from '../config/projects.json';

export default function Dev({ diaries }) {
  return (
    <HtmlBase>
      <Container maxWidth="lg">
        <Grid container align="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h1">Projects</Typography>
          </Grid>
          {projects.map(project => <Grid key={project.title} item xs={12}><DevDiaryCard diary={project} href={project.url} /></Grid>)}
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