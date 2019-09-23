import React from 'react';
import { List, ListItem, ListItemText, Divider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleList({data}) {
  const classes = useStyles();

  const renderRows = () => {
    return data.map((text, i) => 
        <div key={text}>
          <ListItem button>
            <ListItemText>
              <b style={{ color:'blue' }}>{i+1} - </b> {text} 
            </ListItemText>
          </ListItem>  
          <Divider />
        </div>
    )
  }

  return (
    <div className={classes.root}>
      <List style={{width: '100%', marginTop: 20}}>
        { renderRows() }
      </List>
    </div>
  );
}
