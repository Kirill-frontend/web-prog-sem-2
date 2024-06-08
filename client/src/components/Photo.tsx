import React, { useState, useEffect } from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component'

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { HandlersType, PostType } from '../utils/types';

import Popup from './Popup';
import { addToFavorite } from './../redux/slicers/favorites.slice';
import { showToast } from '../redux/slicers/toast.slice';
import { likePhoto, unlikePhoto } from '../redux/slicers/gallery.slice';

import { Splide, SplideSlide } from '@splidejs/react-splide';

type PhotoPropsType = {
  options: PostType
  handlers: HandlersType
}


const Photo: React.FC<PhotoPropsType> = ({ options, handlers }) => {
  const [doAnim, setDoAnim] = useState<boolean>(false)
  const [visibility, setVisibility] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const dispatch = useDispatch()

  const { downloadHandler } = handlers

  const isAuth = useSelector((state: RootState) => (state.auth.isAuth))
  const favoritePosts = useSelector((state: RootState) => state.favorite.favorites)    

  const favoriteAddHandler = () => {
    if (isAuth) {
      setDoAnim(true)
      setTimeout(() => {
        dispatch(addToFavorite(options))
        setVisibility(true)
      }, 1000);
    } else {
      dispatch(showToast('You must be authorizate for adding wallpaper in favorites'))
    }
  }

  const likeHandler = () => {
    if (isAuth) {
      if (!options.isLike) {
        dispatch(likePhoto(options))
        setIsLiked(true)
      } else {
        dispatch(unlikePhoto(options))
        setIsLiked(false)
      }
    } else {
      dispatch(showToast('You must be authorizate for adding wallpaper in favorites'))
    }
  }

  useEffect(() => {
    if (favoritePosts.length) {
      favoritePosts.forEach((item: PostType) => {
        if (item.id === options.id) {
          setVisibility(true)
        }
      })
    }
  }, [favoritePosts, options.id])

  useEffect(() => {
    setIsLiked(options.isLike)
  }, [options.isLike])

  return (
    <>
      <SplideSlide>
        <div className="card">
          <div className="card-image">
            {/* <img src={options.photo} alt={options.title} onClick={slideShowHandler} /> */}
            <LazyLoadImage
              src={options.photo}
              alt={options.title}
              height='500px'
            />
            <span className="card-title"> {options.title} </span>
            <span className="card-author "> {options.author} </span>
            <div className="card-tags ">
              {options.tags.map(tag => (
                <a href={`/search?tag=${tag}`} className="card-tag" key={`${options.id}-${tag}`}>
                  {tag}
                </a>
              ))}
            </div>
            {visibility ? '' : (<button className={`btn-floating halfway-fab waves-effect waves-light red ${doAnim ? 'anim-hidden' : ''}`} onClick={favoriteAddHandler} > <i className="material-icons">favorite_border</i> </button>)}
            <button
              className={`btn-floating halfway-fab waves-effect waves-light btn-like ${isLiked ? 'red' : 'purple'}`}
              onClick={likeHandler}
            > <i className="material-icons">
                thumb_up
               </i>
            </button>
            <Popup handlers={{ downloadHandler }} statistic={options.statistic} options={options} />
          </div>
        </div>
      </SplideSlide>
    </>
  )
}

export default Photo