import React, { useState } from 'react';
import List from '../../common/list'
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx'
import { toastr } from 'react-redux-toastr'
import { makeStyles, Button, ButtonGroup, Card, CardHeader, CardMedia, CircularProgress,
        Collapse, CardContent, CardActions, Typography, IconButton, Box, Divider
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  card: {
    padding: 20
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

export default function RecipeItem({ recipe, getIngredient, updateUser }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [tab, setTab] = useState('instructions')
    const [ingredients] = useState([])
    const [greenButtonLoading, setGreenButtonLoading] = useState(false)
    const [redButtonLoading, setRedButtonLoading] = useState(false)

    const getTabButtonStyle = (type) => {
        if(tab === type) {
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
            if(recipe[att] === true) {
                categories.push(formatCategory(att))
            }
        })
        return categories.map((cat, i) => {
            if(i !== categories.length-1) {
                return cat + ', '
            }
            else return cat
        })
    }

    const toggleExpand = () => {
        setExpanded(!expanded)

        if(ingredients.length === 0) {
            recipe.ingredients.forEach(id => {
                getIngredient(id).then(res => {
                    ingredients.push(res.payload[0].label)
                })
            })
        }
    }

    const toggleButtonLoading = (buttonColor, value) => {
        if(buttonColor==='red') setRedButtonLoading(value)
        else setGreenButtonLoading(value)
    }

    const handleUserUpdate = (loggedUser, buttonColor = 'red') => {
        toggleButtonLoading(buttonColor, true)
        updateUser(loggedUser)
            .then(() => toggleButtonLoading(buttonColor))
            .catch(error => {
                toggleButtonLoading(buttonColor, false)
                toastr.error(error)
            })
    }

    const favoritedByUser = () => {
        return JSON.parse(localStorage.getItem('user')).favoriteRecipes
                .filter(r => r === recipe._id).length > 0;
    }

    const ignoreddByUser = () => {
        return JSON.parse(localStorage.getItem('user')).ignoredRecipes
                .filter(r => r === recipe._id).length > 0;
    }

    const addRecipeToFavorites = () => {
        let updatedUser = JSON.parse(localStorage.getItem('user'))
        updatedUser.favoriteRecipes.push(recipe._id)
        handleUserUpdate(updatedUser, 'green')
    }

    const addToIgnoredRecipes = () => {
        let updatedUser = JSON.parse(localStorage.getItem('user'))
        updatedUser.ignoredRecipes.push(recipe._id)
        handleUserUpdate(updatedUser)
    }

    const removeFromFavoriteRecipes = () => {
        let updatedUser = JSON.parse(localStorage.getItem('user'))
        updatedUser.favoriteRecipes = updatedUser.favoriteRecipes
                                            .filter(r => r !== recipe._id)
        handleUserUpdate(updatedUser)
    }

    const removeFromIgnoredRecipes = () => {
        let updatedUser = JSON.parse(localStorage.getItem('user'))
        updatedUser.ignoredRecipes = updatedUser.ignoredRecipes
                                            .filter(r => r !== recipe._id)
        handleUserUpdate(updatedUser)
    }

    const renderRedButtom = () => {
        if(ignoreddByUser()) {
            return <IconButton onClick={removeFromIgnoredRecipes} disabled={redButtonLoading}
                               aria-label="Dislike" style={{color: 'red'}}>
                        { redButtonLoading ? 
                            <CircularProgress size={15}/>
                            :   <CloseIcon /> 
                        }   
                        <span style={{ color: 'red', fontSize: 13}}>
                            Remove from ignoreds
                        </span>
                    </IconButton>
        }
        else if(favoritedByUser()) {
            return <IconButton onClick={removeFromFavoriteRecipes} disabled={redButtonLoading}
                               aria-label="Dislike" style={{color: 'red'}}>
                        { redButtonLoading ? 
                            <CircularProgress size={15}/>
                            :   <CloseIcon /> 
                        }   
                        <span style={{ color: 'red', fontSize: 13}}>
                            Remove from favorites
                        </span>
                    </IconButton>
        }
        else{
            return <IconButton onClick={addToIgnoredRecipes} disabled={redButtonLoading}
                               aria-label="Dislike" style={{color: 'red'}}>
                        { redButtonLoading ? 
                            <CircularProgress size={15}/>
                            :   <CloseIcon /> 
                        }       
                        <span style={{ color: 'red', fontSize: 13}}>
                            Don't show again
                        </span>
                    </IconButton>
        }
        
    }

    return (
        <Box border={1} style={{width: '70%'}}>
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

                <Divider/>
                
             
                <CardActions>
                    { JSON.parse(localStorage.getItem('user')) ? 
                        <div>
                            { favoritedByUser() || ignoreddByUser() ? null : 
                                <IconButton onClick={() => addRecipeToFavorites()} 
                                    aria-label="Like" style={{color: 'green'}} disabled={greenButtonLoading}>
                                    { greenButtonLoading ? <CircularProgress size={15}/>
                                    : <FavoriteIcon /> 
                                    }
                                    <span style={{ color: 'green', fontSize:13 }}>
                                        Add to Favorites
                                    </span>
                                </IconButton>
                            }

                            {renderRedButtom()}
                        </div>

                        : <span style={{color: "green"}}>Login to save this to your favorites</span>
                            
                    }

                    
                    
                    
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
                    
                    { tab === 'instructions' ? 
                        <CardContent>
                            <List data={recipe.instructions.split('.').filter(inst => inst !== "")}/>
                        </CardContent>
                    :
                        <CardContent>
                            <List data={ingredients}/>
                        </CardContent>
                    }
                </Collapse>
            </Card>
        </Box>
  );
}