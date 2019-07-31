import React, { useState } from 'react';
import List from '../../../common/list'
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx'
import { makeStyles, Button, ButtonGroup, Card, CardHeader, CardMedia, 
        Collapse, CardContent, CardActions, Typography, IconButton 
} from '@material-ui/core';


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

export default function RecipeItem({ recipe, getIngredient }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [tab, setTab] = useState('instructions')
    const [ingredients, setIngredients] = useState([])

    const getTabButtonStyle = (type) => {
        if(tab == type) {
            return { backgroundColor: '#e6ecff' }
        }
        else return {}
    }

    const formatCategory = (category) => {
        category = category[0].toUpperCase() + category.substring(1,category.length)
        return category.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")
    }

    const getRecipeCategories = () => {
        let categories = []
        Object.keys(recipe).forEach(att => {
            if(recipe[att] === true && att !== 'veryPopular') {
                categories.push(formatCategory(att))
            }
        })
        return categories.map((cat, i) => {
            if(i != categories.length-1) {
                return cat + ', '
            }
            else return cat
        })
    }

  const toggleExpand = () => {
    setExpanded(!expanded)

    if(ingredients.length == 0) {
        recipe.ingredients.forEach(id => {
            getIngredient(id).then(res => {
                ingredients.push(res.payload[0].label)
            })
        })
    }
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
        <CardContent style={{display: 'inline-block'}}>
            <Typography variant="body2" style={{color: 'green'}} component="p">
                 { getRecipeCategories() }
            </Typography>
        </CardContent>
        
        <CardActions disableSpacing>
            <IconButton aria-label="Dislike" style={{color: 'red'}}>
                <CloseIcon />
                <p style={{ color: 'red', fontSize:15, marginLeft: 3}}>
                    Don't show again
                </p>
            </IconButton>
            
            <IconButton aria-label="Like" style={{color: 'green'}}>
                <FavoriteIcon />
                <p style={{ color: 'green', fontSize:15, marginLeft: 3 }}>
                    Add to Favorites
                </p>
            </IconButton>
            
            <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={toggleExpand}
                aria-expanded={expanded}
                aria-label="Show more">
                <ExpandMoreIcon />
            </IconButton>
        </CardActions>
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <ButtonGroup color="primary" size="medium" 
                style={{float: 'left', marginLeft: 20, marginBottom: 20}}
                aria-label="large outlined secondary button group"
            >
                <Button style={getTabButtonStyle('instructions')}
                    onClick={() => setTab('instructions')}>
                    Instructions
                </Button>
                <Button style={getTabButtonStyle('ingredients')}
                    onClick={() => setTab('ingredients')}>
                    Ingredients
                </Button>
            </ButtonGroup>
            
            { tab == 'instructions' ? 
                <CardContent>
                    <Typography paragraph>
                        <List data={recipe.instructions.split('.').filter(inst => inst != "")}/>
                    </Typography>
                </CardContent>
            :
                <CardContent>
                    <Typography paragraph>
                        <List data={ingredients}/>
                    </Typography>
                </CardContent>
            }
        </Collapse>
    </Card>
  );
}