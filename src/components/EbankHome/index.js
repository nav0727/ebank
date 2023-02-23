import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Home extends Component {
  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    return history.replace('/ebank/login')
  }

  render() {
    return (
      <div className="home-container">
        <div className="home-header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
          />

          <button type="button" className="logout-btn" onClick={this.onLogout}>
            Logout
          </button>
        </div>
        <div className="home-body">
          <h1>Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="login-image"
          />
        </div>
      </div>
    )
  }
}

export default Home
