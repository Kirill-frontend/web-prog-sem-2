import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromFavorite } from '../redux/slicers/favorites.slice';
import { HandlersType, PostType } from '../utils/types';
import Popup from './Popup';

type FavoritePhotoType = {
  options: PostType
  handlers: HandlersType
}

const FavoritePhoto: React.FC<FavoritePhotoType> = ({ options, handlers }) => {
  const [doAnim, setDoAnim] = useState(false)  
  const dispatch = useDispatch()  

  const {downloadHandler} = handlers

  const favoriteDeleteHandler = (): void => {
    setDoAnim(true)
    setTimeout(() => {
      dispatch(removeFromFavorite(options))
    }, 400)
  }
  
  return (
    <>
      <li className="collection-item col s6">
        <div className="card">
          <div className="card-image">
            <img src={options.photo} alt={options.title} />
            <span className="card-title"> {options.title} </span>
            <span className="card-author "> {options.author} </span>
            <button className={`btn-floating halfway-fab waves-effect waves-light red ${doAnim ? 'anim-hidden' : ''}`} onClick={favoriteDeleteHandler} > <i className="material-icons">remove</i> </button>
            <Popup handlers={{ downloadHandler }} options={options} />
          </div>
        </div>
      </li>
    </>
  )
}

export default FavoritePhoto