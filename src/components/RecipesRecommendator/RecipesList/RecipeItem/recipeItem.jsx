import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  card: {
    width: '70%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}));

export default function RecipeItem({ recipe }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
        <CardHeader
            title={recipe.title}
        />
        <CardMedia
            className={classes.media}
            image={recipe.image}
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                
            </Typography>
        </CardContent>
        
        <CardActions disableSpacing>
            <IconButton aria-label="Dislike">
                <CloseIcon />
            </IconButton>
            <IconButton aria-label="Like">
                <FavoriteIcon />
            </IconButton>
            <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="Show more">
                <ExpandMoreIcon />
            </IconButton>
        </CardActions>
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography paragraph><b>Instructions:</b></Typography>
                <Typography paragraph>
                    {recipe.instructions.split('.')
                        .filter(inst => inst != "")
                        .map((inst, i) => 
                            <p>{`${i+1} - ${inst}\n`}<br></br></p>)
                    }
                </Typography>
            </CardContent>
        </Collapse>
    </Card>
  );
}