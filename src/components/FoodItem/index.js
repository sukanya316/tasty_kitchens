import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const FoodItem = props => {
  const {foodItem} = props
  const {name, imageUrl, cuisine, costForTwo, id} = foodItem

  const saveItem = () => {
    const itemsArr =
      localStorage.getItem('savedItems') !== null
        ? JSON.parse(localStorage.getItem('savedItems'))
        : []
    console.log(itemsArr)
    itemsArr.push(foodItem)
    const btnEl = document.getElementById(`btn-${id}`)
    btnEl.textContent = 'Saved'
    btnEl.disabled = true
    localStorage.setItem('savedItems', JSON.stringify(itemsArr))
  }

  return (
    <div>
      <div className="item-container">
        <Link to={`restaurants-list/${id}`} className="disable-link">
          {' '}
          <img className="item-logo" src={imageUrl} alt={cuisine} />
        </Link>
        <div>
          <h5>{cuisine}</h5>
          <p>{costForTwo}</p>
          <h5>
            Restaurant: <span style={{color: 'gray'}}>{name}</span>
          </h5>
          <button id={`btn-${id}`} type="button" onClick={() => saveItem()}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
export default FoodItem
