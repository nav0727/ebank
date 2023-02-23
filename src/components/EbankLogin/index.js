import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Ebank extends Component {
  state = {msg: '', userId: '', userPin: '', errorStatus: false}

  onUserId = event => {
    this.setState({userId: event.target.value})
  }

  onUserPin = event => {
    this.setState({userPin: event.target.value})
  }

  loginSuccess = JwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', JwtToken, {expires: 30})
    return history.replace('/')
  }

  loginFailure = error => {
    this.setState({msg: error, errorStatus: true})
  }

  onLogin = async event => {
    event.preventDefault()
    const {userId, userPin} = this.state

    const userData = {user_id: userId, pin: userPin}
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }

    const url = `https://apis.ccbp.in/ebank/login`

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  renderLoginForm = () => {
    const {msg, userId, userPin, errorStatus} = this.state
    return (
      <form onSubmit={this.onLogin}>
        <h1>Welcome Back!</h1>
        <div>
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            placeholder="Enter User ID"
            onChange={this.onUserId}
            value={userId}
          />
        </div>

        <div>
          <label htmlFor="userPin">PIN</label>
          <input
            type="password"
            id="userPin"
            placeholder="Enter PIN"
            onChange={this.onUserPin}
            value={userPin}
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
        {errorStatus && <p> {msg}</p>}
      </form>
    )
  }

  render() {
    const JwtToken = Cookies.get('jwt_token')
    if (JwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="login-image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-image"
          />
        </div>
        <div className="form-container">{this.renderLoginForm()}</div>
      </div>
    )
  }
}

export default Ebank
