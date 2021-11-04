import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import HtmlBase from "../components/HtmlBase";
import { makeStyles } from '@material-ui/core/styles';
import DevDiaryCard from '../components/DevDiaryCard';
import { getRegistry, parseComments, toUrlValid } from "../lib/diaries";
import SocialBar from "../components/SocialBar";
import process from 'process';
import MathCard from '../components/MathCard';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
}));

export default function Home({ diary, diaryUrlName, mathEntry }) {
  const classes = useStyles();
  const {title, date, description, hero} = parseComments(diary);

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
            <Typography variant="h1">{process.env.NEXT_PUBLIC_APP_NAME}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">Welcome!</Typography>
            <Typography variant="h4">My name is Carl Schader and this is my personal website where I share all things coding related.</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Check out my most recent stuff!</Typography>
          </Grid>
          <Grid item xs={12}>
            <DevDiaryCard title={title} date={date} description={description} hero={hero} href={"/dev/" + diaryUrlName} />
          </Grid>
          <Grid item xs={12}>
            <MathCard title={mathEntry.title} hero={mathEntry.hero} href={"/math/" + toUrlValid(mathEntry.title)} />
          </Grid>
        </Grid>
      </Container>
    </HtmlBase>
  );
}

export async function getServerSideProps(context) {
  const diaryRegistry = await getRegistry(process.env.DIARY_REGISTRY_URL);
  const mathRegistry = await getRegistry(process.env.MATH_REGISTRY_URL);

  const latestDiary = (await (await fetch(diaryRegistry[diaryRegistry.length - 1].url)).text());

  return {
    props: {
      diary: latestDiary,
      diaryUrlName: toUrlValid(diaryRegistry[diaryRegistry.length - 1].title),
      mathEntry: mathRegistry[mathRegistry.length - 1]
    },
  };
}