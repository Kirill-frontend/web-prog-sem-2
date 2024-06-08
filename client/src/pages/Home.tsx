import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { downloadPhoto, initPhotos } from '../redux/slicers/gallery.slice'

import Navbar from '../components/Navbar';
import Photo from '../components/Photo';
import Loader from '../components/Loader';
import Nothing from '../components/Nothing';

import { PostType } from '../utils/types';
import { RootState } from '../redux/store';
import { getFavorites } from './../redux/slicers/favorites.slice';
import { showToast } from '../redux/slicers/toast.slice';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    dispatch(initPhotos())
    dispatch(getFavorites())
    dispatch(showToast('Some toast text'))
  }, [dispatch])

  const posts = useSelector((state: RootState) => (state.gallery.posts))
  const isLoading = useSelector((state: RootState) => (state.loading.loading))

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  const messageForNothing =
    (<>
      <span className="nothing-text_span">No posts</span>
      <Link to='/create'>You can create own post</Link>
    </>)

  const downloadHandler = (options: PostType): void => {
    dispatch(downloadPhoto(options))
  }


  return (
    <>
      <Navbar activeElement="home" />
      <div className="container">
        <main>
          <Splide>
            {loading && <Loader />}
            {posts.length ? posts.map((post: PostType) =>
              (<Photo key={post.id}
                options={post}
                handlers={{
                  downloadHandler
                }}
              />))
              :
              <Nothing>{messageForNothing}</Nothing>}
          </Splide>
        </main>
      </div>
    </>
  )
}

export default Home