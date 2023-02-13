import {Component} from 'react'
// import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import './index.css'
import FoodItem from '../FoodItem'
import Header from '../Header'
import Footer from '../Footer'

class Home extends Component {
  state = {allItems: [], isLoading: false}

  componentDidMount() {
    this.getItems()
  }

  getItems = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({isLoading: true})
    console.log('home', jwtToken)
    const url = 'https://apis.ccbp.in/restaurants-list'
    // ?offset=${offset}&limit=${LIMIT}'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {restaurants} = data
      const updatedData = restaurants.map(item => ({
        costForTwo: item.cost_for_two,
        cuisine: item.cuisine,
        groupByTime: item.group_by_time,
        hasOnlineDelivery: item.has_online_delivery,
        hasTableBooking: item.has_table_booking,
        id: item.id,
        imageUrl: item.image_url,
        isDeliveringNow: item.is_delivering_now,
        location: item.location,
        menu_type: item.menu_type,
        name: item.name,
        opensAt: item.opens_at,
        userRating: {
          rating: item.user_rating,
          ratingColor: item.user_rating.rating_color,
          ratingText: item.user_rating.rating_text,
        },
      }))
      this.setState({allItems: updatedData, isLoading: false})
      console.log(updatedData)
    }
  }

  //   renderLoaderView = () => (
  //     <div className="jobs-loader-container">
  //       <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
  //     </div>
  //   )

  //   getItemsView = () => {
  //     const {allItems} = this.state
  //     return (
  //       <>
  //         {allItems.map(item => (
  //           <FoodItem key={item.id} foodItem={item} />
  //         ))}
  //       </>
  //     )
  //   }

  onSearchItems = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const searchedVal = document.getElementById('searchEl').value

    const url = `https://apis.ccbp.in/restaurants-list?search=${searchedVal}&offset=0&limit=9&sort_by_rating=Lowest`

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
      const {restaurants} = data
      const updatedData = restaurants.map(item => ({
        costForTwo: item.cost_for_two,
        cuisine: item.cuisine,
        groupByTime: item.group_by_time,
        hasOnlineDelivery: item.has_online_delivery,
        hasTableBooking: item.has_table_booking,
        id: item.id,
        imageUrl: item.image_url,
        isDeliveringNow: item.is_delivering_now,
        location: item.location,
        menu_type: item.menu_type,
        name: item.name,
        opensAt: item.opens_at,
        userRating: {
          rating: item.user_rating,
          ratingColor: item.user_rating.rating_color,
          ratingText: item.user_rating.rating_text,
        },
      }))
      this.setState({allItems: updatedData, isLoading: false})
    }
  }

  render() {
    const {allItems} = this.state
    return (
      <div className="home-main-container">
        <Header />
        <div className="sort-container">
          <div>
            <h4>Popular Restaurants</h4>
            <p>
              Select your favourite restaurant special dish and make your day
              happy...
            </p>
          </div>
          <div className="search-el-container">
            <input
              type="search"
              id="searchEl"
              placeholder="Search restaurant name"
            />
            <BsSearch className="search-icon" onClick={this.onSearchItems} />
          </div>
        </div>
        <hr />
        <div className="items-container">
          {allItems.map(item => (
            <FoodItem key={item.id} foodItem={item} />
          ))}
        </div>
        {/* <>{this.getProfile()}</> */}
        <Footer />
      </div>
    )
  }
}
export default Home
