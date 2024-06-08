import React, { useState } from 'react';
import { HandlersType, PostStatisticType, PostType } from '../utils/types';
import Modal from './Modal';
import './styles/popup.css'

type PopupPropsType = {
  options: PostType
  handlers: HandlersType
  statistic?: PostStatisticType | undefined
  isOwnOptions?: boolean
}

 const Popup: React.FC<PopupPropsType> = ({ isOwnOptions, handlers, statistic, options }) => {
  const [uncover, setUncover] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)  

  const { deletePhotoHandler, downloadHandler } = handlers

  const toggleMenu = () => {
    setUncover(prevState => !prevState)
  }  

  const openModalStatistic = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      {showModal && <Modal close={closeModal} statistic={statistic} />}
      <div className={`menu ${uncover && 'open'} popup-menu`}>
        <div className="menu__button" onClick={toggleMenu}><span className="menu_button_visible" >...</span><span className="menu_button_hidden" >...</span></div>
        <div className="menu__content">
          <ul className="menu__content__list">
            <li><button className={`btn btn-deletePhoto waves-effect waves-light green`} onClick={() => downloadHandler!(options)} > <i className="material-icons tiny">file_download</i>Download</button></li>
            {isOwnOptions && <li><button className={`btn btn-deletePhoto waves-effect waves-light red`} onClick={() => deletePhotoHandler!(options)} > <i className="material-icons tiny">delete_forever</i>Delete</button></li>}
            {isOwnOptions && <li><button className={`btn btn-deletePhoto waves-effect waves-light blue`} onClick={openModalStatistic} > <i className="material-icons tiny">arrow_upward</i>Statistic</button></li>}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Popup