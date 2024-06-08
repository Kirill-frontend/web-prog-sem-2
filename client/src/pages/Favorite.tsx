import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { downloadPhoto } from '../redux/slicers/gallery.slice';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import Nothing from '../components/Nothing';
import FavoritePhoto from '../components/FavoritePhoto';
import { RootState } from '../redux/store';
import { PostType } from '../utils/types'
import { getFavorites } from './../redux/slicers/favorites.slice';


const Favorite: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [posts, setPosts] = useState<PostType[]>([])

  const dispatch = useDispatch()

  const auth = useSelector((state: RootState) => (state.auth.isAuth))
  const isLoading = useSelector((state: RootState) => (state.loading.loading))
  const postsState = useSelector((state: RootState) => (state.favorite.favorites))

  useEffect(() => {
    if (auth) {
      dispatch(getFavorites())
    }
  }, [dispatch, auth])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    setPosts(postsState)
  }, [postsState])

  const downloadHandler = (options: PostType): void => {
    dispatch(downloadPhoto(options))
  }

  const messageForNothing = (<><span className="nothing-text_span">No favorites</span><Link to='/'>You can add wallpapers on home page</Link></>)

  return (
    <>
      <Navbar activeElement="favorite" />
      <div className="container">
        <main>
          <h1>Favorite Page</h1>
          <ul className="collection row">
            {loading && <Loader />}
            {posts.length ? posts.map((post: PostType) => (<FavoritePhoto key={post.id} options={post} handlers={{ downloadHandler }} />)) : <Nothing>{messageForNothing}</Nothing>}
          </ul>
        </main>
      </div>
    </>
  )
}

export default Favorite