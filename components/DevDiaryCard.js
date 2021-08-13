import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Responsive from './Responsive';

const useStyles = makeStyles({
  root: {
    maxWidth: 690,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({ diary, href }) {
  const classes = useStyles();

  return (
    <Link href={href} passHref>
      <Card className={classes.root}>
        <CardActionArea>
          <Responsive
            desktop={
              <CardMedia
                className={classes.media}
                image={diary.hero}
              />
            }
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {diary.title}
            </Typography>
            { diary.date ?
              <Typography variant="body2" color="textSecondary" component="p">
              {new Date(diary.date).toLocaleDateString()}
            </Typography> :
            <></>
            }
            <Typography variant="body2" color="textSecondary" component="p">
              {diary.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* <CardActions>
        <Link href={`/dev/${diary.urlName}`}>
          <Button size="small" color="primary">
            Read
          </Button>
        </Link>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions> */}
      </Card>
    </Link>
  );
}
