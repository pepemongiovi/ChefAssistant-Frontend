import React from 'react'
import { Dialog, DialogTitle, CircularProgress, DialogContent, 
    DialogActions, TextField, Link, Button} from '@material-ui/core';

export default class LoginDialog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      email: "",
      password: ""
    }
  }

  login = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.props.handleClose()
      this.setState({ loading: false })
    }, 1500)
  }

  register = () => {
    this.props.handleClose()
    this.props.openRegisterDialog()
  }

  render() {
    const { open, handleClose } = this.props

    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle style={{ marginBottom: -10 }}>
            <b>Login</b>
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
              value={this.state.password}
              onChange={({ target }) => this.setState({ password: target.value })}
              style={{ marginBottom: 15 }}
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
            />
            <Link style={{ cursor: 'pointer' }} onClick={this.register}>
              Register now!
            </Link>
          </DialogContent>
          
          <DialogActions style={{ margin: 15 }}>
            <Button onClick={this.login} fullWidth color="primary" 
              variant="contained" disabled={this.state.loading}>
              { this.state.loading ? <CircularProgress style={{ marginRight: 5 }} size={20}/> : null }
              Log in
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
