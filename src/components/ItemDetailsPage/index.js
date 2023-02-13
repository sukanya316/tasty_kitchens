import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const ItemDetailsPage = props => {
  const {match} = props
  const {params} = match
  const [itemObj, setItemObj] = useState({})
  //   let itemData = {}
  const getItemDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${params.id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        foodItems: data.food_items,
        id: data.id,
        imageUrl: data.image_url,
        items_count: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }
      console.log(updatedData)
      setItemObj(JSON.parse(JSON.stringify(updatedData)))
    }
  }

  useEffect(() => {
    getItemDetails()
  })

  return (
    <div>
      <div className="recipe-container">
        <img alt={itemObj.id} src={itemObj.imageUrl} className="item-img" />
        <div className="recipe-details">
          <h4>{itemObj.name}</h4>
          <p>{itemObj.cuisine}</p>
          <p>{itemObj.opensAt}</p>
          <p>{itemObj.rating}</p>
        </div>
      </div>
      <ul className="all-items-container">
        {itemObj?.foodItems?.map(item => (
          <li className="item-container">
            <img className="item-logo" src={item.image_url} alt={item.name} />
            <div>
              <h5>{item.name}</h5>
              <h5>Cost : {item.cost}</h5>
              <h5>
                Food Type:
                <span style={{color: 'gray'}}>{item.food_type}</span>
              </h5>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ItemDetailsPage
