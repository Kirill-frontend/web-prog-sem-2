import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import { RootState } from '../../redux/store';
import { delUser } from '../../redux/slicers/auth.slice';
import { getOwnPhotos } from './../../redux/slicers/myphotos.slice';



const Profile: React.FC = () => {
  const photosLength = useSelector((state: RootState) => state.getOwnPhotos.photos.length)
  const userData = useSelector((state: RootState) => state.auth.currentUser)
  const dispatch = useDispatch()
  const [postsCount, setPostsCount] = useState<number>(0)  
  

  const logoutHandler = (): void => {    
    localStorage.removeItem('token')
    dispatch(delUser())
    window.location.href = '/auth'
  }

  useEffect((): void => {
    dispatch(getOwnPhotos())
  }, [dispatch])

  useEffect((): void => {        
      if (photosLength) {
        setPostsCount(photosLength)
      } else {
        setPostsCount(0)
      }    
  }, [photosLength])


  return (
    <>
      <Navbar activeElement="profile" />
      <div className="container">
        <main>
          <ul className="collection">
            <li className="collection-item">
              <div className="profile_card">
                <p>Your email: {userData?.email} </p>
                <p>Your username: {userData?.username} </p>
              </div>
            </li>
            <li className="collection-item">
              <button className="btn-small">
                <Link to="/my">
                  My posts ({postsCount})
              </Link>
              </button>
            </li>
            <li className="collection-item">
              <button className="btn-small" onClick={logoutHandler}>
                Log out
          </button>
            </li>
          </ul>
        </main>
      </div>
    </>
  )
}

export default Profile