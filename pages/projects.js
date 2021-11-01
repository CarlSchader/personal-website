import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HtmlBase from '../components/HtmlBase';
import DevDiaryCard from '../components/DevDiaryCard';
import projects from '../config/projects.json';
import SocialBar from '../components/SocialBar';

export default function Dev() {
  return (
    <HtmlBase>
      <Container maxWidth="lg">
        <Grid container align="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h1">Projects</Typography>
          </Grid>
          <Grid item xs={12}>
            <SocialBar />
          </Grid>
          {projects.map(project => <Grid key={project.title} item xs={12}><DevDiaryCard title={project.title} date={project.date} description={project.description} hero={project.hero} href={project.url} /></Grid>)}
        </Grid>
      </Container>
    </HtmlBase>
  );
}