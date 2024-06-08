import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';
import Nothing from '../../components/Nothing';
import MyPhotos from '../../components/MyPhotos';
import { PostType } from '../../utils/types';
import { RootState } from '../../redux/store';
import { deleteOwnPhoto, getOwnPhotos } from './../../redux/slicers/myphotos.slice';
import { downloadPhoto } from './../../redux/slicers/gallery.slice';


const MyPosts: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  
  const isLoading = useSelector((state: RootState) => (state.loading.loading))
  const dispatch = useDispatch()

  const ownPhotos = useSelector((state: RootState) =>state.getOwnPhotos.photos)

  const deletePhotoHandler = (options: PostType) => {
    dispatch(deleteOwnPhoto(options))
  }

  const downloadHandler = (options: PostType) => {
    dispatch(downloadPhoto(options))
  }

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    dispatch(getOwnPhotos())
  }, [dispatch])

  useEffect(() => {
    setPosts(ownPhotos)
  }, [ownPhotos])

  const messageForNothing =
    (<>
      <span className="nothing-text_span">No posts</span>
      <Link to='/create'>You can create own post</Link>
    </>)

  return (
    <>
      <Navbar activeElement="my" />
      <div className="container">
        <main>
          <ul className="collection">
            {loading && <Loader />}
            {posts.length ?
              posts.map((post: PostType) => (<MyPhotos key={post.id}
                options={post}
                handlers={{
                  deletePhotoHandler,
                  downloadHandler
                }}
              />))
              :
              <Nothing>{messageForNothing}</Nothing>}
          </ul>
        </main>
      </div>
    </>
  )
}

export default MyPosts