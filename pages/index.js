import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import HtmlBase from "../components/HtmlBase";
import { makeStyles } from '@material-ui/core/styles';
import DevDiaryCard from '../components/DevDiaryCard';
import getDiaries from "../lib/diaries";
import SocialBar from "../components/SocialBar";
import config from "../config/config.json";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
}));

export default function Home({ diary }) {
  const classes = useStyles();

  return (
    <HtmlBase>
      <Container maxWidth="lg">
        <Grid container align="center" spacing={3}>
          <Grid item xs={12}>
            <Avatar className={classes.avatar} src="images/profile.jpg" />
          </Grid>
          <Grid item xs={12}>
            <SocialBar />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h1">&lt;{config.appName}&gt;</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">Welcome to {config.appName}!</Typography>
            <Typography variant="h4">My name is Carl Schader and this is my personal website where I share all things coding related.</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Check out my most recent dev diary!</Typography>
          </Grid>
          <Grid item xs={12}>
            <DevDiaryCard diary={diary} href={"/dev/" + diary.urlName} />
          </Grid>
        </Grid>
      </Container>
    </HtmlBase>
  );
}

export function getStaticProps(context) {
  const diaries = getDiaries();
  return {
    props: {
      diary: diaries[diaries.length - 1]
    },
  }
}