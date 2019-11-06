import React from 'react'
import { register } from '../../store/actions/user'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { Dialog, DialogTitle, CircularProgress, DialogContent,FormHelperText,
    DialogActions, TextField, Button,FormControl } from '@material-ui/core';

class RegistrationDialog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      username: null,
      password: null,
      passwordConfirmation: null,
      error_message: ""
    }
  }

  register = () => {
    this.setState({ loading: true })

    this.props.register(this.state.username, this.state.password).then(user => {
      this.props.handleClose()
      this.props.openLoginDialog()
      this.setState({ loading: false })
      toastr.success("Successfully registered!")
    })
    .catch(error_message => {
      this.setState({ error_message, loading: false})
    })
  }

  inputsInvalid = () => {
    const { username, password, passwordConfirmation } = this.state
    return !username || username.length < 6 
      || !password || password.length < 6 
      || password !== passwordConfirmation
  }

  render() { 
    const { open, handleClose } = this.props
    const { username, password, passwordConfirmation } = this.state

    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle style={{ marginBottom: -10 }}>
            <b>Registration</b>
          </DialogTitle>
          <form onSubmit={this.register}>
            <DialogContent>
              <FormControl style={{ width: '100%'}}>
                <TextField
                  error={ username !== null && username.length < 6 }
                  errorText= "wtfff"
                  value={this.state.username}
                  onChange={({ target }) => this.setState({ username: target.value })}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Username"
                  type="username"
                  fullWidth
                />
                { this.state.error_message ?
                  <FormHelperText style={{ color: "red" }}>
                    {this.state.error_message}
                  </FormHelperText>
                  : username == null || username.length > 5 ? null : 
                  <FormHelperText style={{ color: "red" }}>
                    Must have at least 6 characters
                  </FormHelperText>
                }
              </FormControl>

              <FormControl style={{ width: '100%'}}>
                <TextField
                  error={ password != null && password.length < 6 }
                  value={this.state.password}
                  onChange={({ target }) => this.setState({ password: target.value })}
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                />
                { password == null || password.length > 5 ? null : 
                  <FormHelperText style={{ color: "red" }}>
                    Must have at least 6 characters
                  </FormHelperText>
                }
              </FormControl>
              
              <FormControl style={{ width: '100%'}}>
                <TextField
                  error={ passwordConfirmation != null && passwordConfirmation.length < 6 }
                  value={this.state.passwordConfirmation}
                  onChange={({ target }) => this.setState({ passwordConfirmation: target.value })}
                  margin="dense"
                  id="password_confirmation"
                  label="Password confirmation"
                  type="password"
                  fullWidth
                />
                { passwordConfirmation == null || password === passwordConfirmation ? null : 
                  <FormHelperText style={{ color: "red" }}>
                    Must match password above
                  </FormHelperText>
                }
              </FormControl>
            </DialogContent>
            
            <DialogActions style={{ margin: 15 }}>
              <Button onClick={this.register} fullWidth color="primary" type="submit"
                variant="contained" disabled={this.state.loading || this.inputsInvalid() }>
                { this.state.loading ? <CircularProgress style={{ marginRight: 5 }} size={20}/> : null }
                Register
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

const dispatchToProps = (dispatch) => ({
  register: (username, password) => dispatch(register(username, password))
})

export default connect(null, dispatchToProps)(RegistrationDialog);
