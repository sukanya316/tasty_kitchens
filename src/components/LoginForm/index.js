import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errMsg: ''}

  usernameChange = event => {
    this.setState({username: event.target.value})
  }

  onpwdChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    this.setState({errMsg: ''})
    history.replace('/')
  }

  onSubmitFailure = () => {
    const {history} = this.props
    this.setState({errMsg: 'Username and Password are incorrect'})
    history.replace('/login')
  }

  onSubmitFun = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure()
    }
  }

  render() {
    const {username, password, errMsg} = this.state
    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onSubmitFun}>
          <h4 className="heading">Tasty Kitchens</h4>
          <label htmlFor="username">USERNAME</label>
          <br />
          <input
            className="name-bg"
            type="input"
            id="username"
            placeholder="username"
            onChange={this.usernameChange}
            value={username}
          />
          <br />
          <label htmlFor="password">PASSWORD</label>
          <br />
          <input
            className="pwd-bg"
            type="input"
            id="password"
            placeholder="password"
            value={password}
            onChange={this.onpwdChange}
          />
          <br />
          <div style={{textAlign: 'center'}}>
            {' '}
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
          {errMsg !== '' && <p className="error-msg">{errMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
