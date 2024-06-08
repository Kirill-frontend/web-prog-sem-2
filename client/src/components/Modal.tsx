import React, { useState } from 'react';
import { PostStatisticType } from '../utils/types';
import './styles/modal.css'

type ModalPropsType = {
  close: () => void  
  statistic: PostStatisticType | undefined
}


const Modal: React.FC<ModalPropsType> = ({ close, statistic }) => {  
  const [isHide, setIsHide] = useState<boolean>(true)

  
  const modalClickHandler = (): void => {
    setIsHide(false)
    setTimeout(() => {
      close()
    }, 200);
  }

  return (
    <>
      <div className={`overlay ${isHide ? 'is-hide' : '' }`} id="overlay" onClick={modalClickHandler}>
        <div className="modal-content">
          <span className="button-close" onClick={modalClickHandler}></span>
          <h4>Statistic</h4>
          <p>{`Added favorites: ${statistic!.favorites}`}</p>
          <p>{`Downloads: ${statistic!.downloads}`}</p>                        
          <p>{`Likes: ${statistic!.likes}`}</p>                        
        </div>
      </div>
    </>
  )
}

export default Modal