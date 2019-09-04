import React from 'react'
import { Dialog, DialogTitle, CircularProgress, DialogContent, 
    DialogActions, TextField, Button} from '@material-ui/core';

export default class RegistrationDialog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      email: "",
      password: "",
      passwordConfirmation: ""
    }
  }

  register = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.props.handleClose()
      this.setState({ loading: false })
      this.props.openLoginDialog()
    }, 1500)
  }

  render() { 
    const { open, handleClose } = this.props

    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle style={{ marginBottom: -10 }}>
            <b>Registration</b>
          </DialogTitle>
          <DialogContent>
            <TextField
              value={this.state.email}
              onChange={({ target }) => this.setState({ email: target.value })}
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              value={this.statepassword}
              onChange={({ target }) => this.setState({ password: target.value })}
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
            />
            <TextField
              value={this.statepasswordConfirmation}
              onChange={({ target }) => this.setState({ passwordConfirmation: target.value })}
              margin="dense"
              id="password_confirmation"
              label="Password confirmation"
              type="password"
              fullWidth
            />
          </DialogContent>
          
          <DialogActions style={{ margin: 15 }}>
            <Button onClick={this.register} fullWidth color="primary" 
              variant="contained" disabled={this.state.loading}>
              { this.state.loading ? <CircularProgress style={{ marginRight: 5 }} size={20}/> : null }
              Register
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
