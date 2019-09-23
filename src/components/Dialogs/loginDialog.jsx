import React from 'react'
import { login } from '../../store/actions/user'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { Dialog, DialogTitle, CircularProgress, DialogContent, 
    DialogActions, TextField, Link, Button} from '@material-ui/core';


class LoginDialog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      username: "",
      password: "",
      error_message: ""
    }
  }

  login = () => {
    this.setState({ loading: true })
 
    this.props.login(this.state.username, this.state.password).then(user => {
      this.props.handleClose()
      this.setState({ loading: false })
      this.props.setUser(JSON.parse(localStorage.getItem('user')))
      toastr.success("Successfully logged in!")
    })
    .catch(error_message => {
      this.setState({ error_message, loading: false })
    })
  }

  handleClose = () => {
    console.log(this.props)
    this.props.handleClose()
    this.setState({ username: "", password: "", error_message: ""})
  }

  register = () => {
    this.props.handleClose()
    this.props.openRegisterDialog()
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle style={{ marginBottom: -10 }}>
            <b>Login</b>
          </DialogTitle>
          <DialogContent>
            <TextField
              value={this.state.username}
              onChange={({ target }) => this.setState({ username: target.value })}
              autoFocus
              margin="dense"
              id="name"
              label="Username"
              type="username"
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
          
          <DialogActions style={{ margin: 15, marginTop: 5 }}>
            <Button onClick={this.login} fullWidth color="primary" variant="contained" 
              disabled={this.state.loading || this.state.username == "" || this.state.password == "" }>
              { this.state.loading ? <CircularProgress style={{ marginRight: 5 }} size={20}/> : null }
              Log in
            </Button>
          </DialogActions>
          <p style={{ color: 'red', textAlign: 'center', marginTop: -10 }}>{this.state.error_message}</p>
        </Dialog>
      </div>
    );
  }
}

const dispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(login(username, password))
})

export default connect(null, dispatchToProps)(LoginDialog);
