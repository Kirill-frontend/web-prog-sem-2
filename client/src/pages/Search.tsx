import React, { useState, useEffect, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../components/Navbar';
import Photo from '../components/Photo';
import Nothing from '../components/Nothing';
import { RootState } from '../redux/store';
import { PostType } from '../utils/types';
import { search } from './../redux/slicers/search.slice';
import { downloadPhoto } from './../redux/slicers/gallery.slice';
import { useHistory } from 'react-router-dom';



const Search: React.FC = () => {
  const [inputSearch, setInputSearch] = useState<string>('')
  const [photos, setPhotos] = useState<PostType[]>([])
  const dispatch = useDispatch()
  const history = useHistory()
  
  useEffect(() => {
    const historyTag = history.location.search.split('=')[1]
    if (historyTag) {      
      dispatch(search(historyTag))
    }
  }, [])


  const searchedPhotos = useSelector((state: RootState) => state.search.searched)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(search(inputSearch))
  }

  useEffect(() => {
    setPhotos(searchedPhotos)
  }, [searchedPhotos])

  const downloadHandler = (options: PostType): void => {
    dispatch(downloadPhoto(options))
  }

  return (
    <>
      <Navbar activeElement="search" />
      <main>
        <div className="container">
          <div className="input-search">
            <form onSubmit={submitHandler}>
              <div className="row">
                <div className="input-field col s12">
                  <input id="text" type="text" onChange={event => setInputSearch(event.target.value)} value={inputSearch} required/>
                  <label htmlFor="text">Enter category for wallpaper</label>
                  <span className="helper-text">Search criteria's</span>
                </div>
              </div>
            </form>
          </div>
          <ul className="collection">
            {!photos.length && <Nothing>No searched photos</Nothing>}
            {photos.map((post: PostType) => (<Photo key={post.id} options={post} handlers={{downloadHandler}} />))}            
          </ul>

        </div>
      </main>
    </>
  )
}

export default Search