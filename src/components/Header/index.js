import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogoutClicked = () => {
    const {history} = props
    console.log('logout')
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <h3 style={{color: 'darkorange'}}>Tasty Kitchens</h3>
      <ul className="header-items">
        <Link className="link" to="/">
          <li style={{color: 'darkorange'}}>Home</li>
        </Link>
        <Link className="link" to="/saved-items">
          <li>Saved Items</li>
        </Link>
        <button type="button" className="logout-btn" onClick={onLogoutClicked}>
          Logout
        </button>
      </ul>
    </div>
  )
}
export default withRouter(Header)
