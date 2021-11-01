import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from './AppBar';
import process from 'process';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
  },
}));

export default function HtmlBase({ children = [], title = process.env.NEXT_PUBLIC_APP_NAME }) {
  const classes = useStyles();

  return (
    <div className="gradient scrollable">
      <AppBar />
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className={classes.root}>
          {children}
        </div>
      </main>
    </div>
  );
}