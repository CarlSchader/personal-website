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
import { parseComments } from '../lib/diaries';

const useStyles = makeStyles({
  root: {
    maxWidth: 690,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({ title = "", date = "", hero = "", href = "" }) {
  const classes = useStyles();

  return (
    <Link href={href} passHref>
      <Card className={classes.root}>
        <CardActionArea>
          {
            hero ?
              <Responsive
                desktop={
                  <CardMedia
                    className={classes.media}
                    image={hero}
                  />
                }
              /> :
              <></>
          }
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            {date ?
              <Typography variant="body2" color="textSecondary" component="p">
                {new Date(date).toLocaleDateString()}
              </Typography> :
              <></>
            }
            {/* <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography> */}
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
