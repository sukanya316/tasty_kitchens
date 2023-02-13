import {Component} from 'react'

import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="not-found-container">
        <img
          className="not-found-img"
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
        />
        <h1>Page Not Found</h1>
        <p>We are sorry,the page your requested could not be found.</p>
      </div>
    )
  }
}
export default NotFound
