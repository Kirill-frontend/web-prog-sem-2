import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';
import { addPhoto } from '../redux/slicers/gallery.slice';

const Create: React.FC = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')

  const userIdState = useSelector((state: RootState) => state.auth.currentUser?.id)
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const isLoading = useSelector((state: RootState) => (state.loading.loading))

  useEffect(() => {
    if (userIdState) {
      setUserId(userIdState)
    }
  }, [userIdState])


  const formHandler = (event: any) => {    
    event.preventDefault()
    event.target.elements.userId.value = userId

    dispatch(addPhoto(event.target))
  }


  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return (
    <>
      <Navbar activeElement='create' />
      <div className="container">
        <main>
          <h1>Create Page</h1>
          {!isAuth && (<p>You must <Link to="/auth">Sign in / Sign up</Link> for creating post</p>)}
          <form onSubmit={formHandler}>
            {loading && <Loader />}
            <div className="row">
              <div className="input-field col s10">
                <input id="createPhotoPost" name="photoTitle" type="text" className="PhotoPost" disabled={!isAuth} />
                <label htmlFor="createPhotoPost">Title for photo post</label>
              </div>
              <div className="input-field col s10">
                <input id="createPhotoPostTags" name="photoTags" type="text" className="photoTags" disabled={!isAuth} />
                <label htmlFor="createPhotoPostTags">Tags for your photo</label>
                <span className="helper-text">Write separated by commas</span>
              </div>
              <div className="input-field col s10">
                <input type="file" name="photoSend" className="sendPhoto" accept="image/*" disabled={!isAuth} />
                <input type="hidden" name="userId" />
              </div>
              <div className="input-field">
                <button className="waves-effect waves-light btn" type="submit" disabled={!isAuth}>Create</button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}

export default Create