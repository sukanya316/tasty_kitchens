import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class Profile extends Component {
  state = {profileDetails: [], isLoading: false}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: profileData,
        isLoading: false,
      })
    }
  }

  getSavedItems = () => {
    const savedItems = JSON.parse(localStorage.getItem('savedItems'))
    console.log(savedItems)
    return (
      <ul className="saved-items-container">
        {savedItems?.map(item => (
          <li className="item-container">
            <img className="item-logo" src={item.imageUrl} alt={item.name} />
            <div>
              <h5>{item.name}</h5>
              <h5>Cost : {item.costForTwo}</h5>
              <h5>
                Food Type:
                <span style={{color: 'gray'}}>{item.menu_type}</span>
              </h5>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {profileDetails} = this.state
    return (
      <>
        <Header />
        <div className="main-container">
          <div className="profile-container">
            <img
              src={profileDetails.profileImageUrl}
              alt="profile-logo"
              className="profile-logo"
            />
            <h3>{profileDetails.name}</h3>
            <p>{profileDetails.shortBio}</p>
          </div>
          <div className="">
            <h3 style={{textAlign: 'center'}}>Saved Items</h3>
            {this.getSavedItems()}
          </div>
        </div>
      </>
    )
  }
}
export default Profile
