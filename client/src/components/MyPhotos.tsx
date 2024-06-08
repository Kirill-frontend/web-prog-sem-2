import React from 'react';
import { HandlersType, PostType } from '../utils/types';
import Popup from './Popup';

type MyPhotosPropsType = {
  handlers: HandlersType
  options: PostType
}

const MyPhotos: React.FC<MyPhotosPropsType> = ({ handlers, options }) => {
  const { deletePhotoHandler, downloadHandler } = handlers  

  return (
    <>
      <li className="collection-item col s6">
        <div className="card">
          <div className="card-image">
            <img src={options.photo} alt={options.title} />
            <span className="card-title"> {options.title} </span>
            <span className="card-author "> You </span>            
            <Popup isOwnOptions handlers={{ deletePhotoHandler, downloadHandler }} options={options} statistic={options.statistic} />
          </div>
        </div>
      </li>
    </>
  )
}

export default MyPhotos