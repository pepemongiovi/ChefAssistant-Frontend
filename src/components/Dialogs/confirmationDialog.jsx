import React from 'react'
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';

class ConfirmationDialog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    return (
      <div>
        <Dialog fullWidth maxWidth="sl" open={this.state.open} onClose={() => this.setState({ open: false })}>
            <DialogTitle style={{ marginTop: -10 }}>
                <b style={{ fontSize: 30 }}>{this.props.message}</b>
            </DialogTitle> 
            <DialogActions>
                <Button color="secondary" variant="contained">
                    Cancel
                </Button>
                <Button color="primary" variant="contained">
                    Yes
                </Button>
            </DialogActions>        
        </Dialog>
      </div>
    );
  }
}

export default ConfirmationDialog

