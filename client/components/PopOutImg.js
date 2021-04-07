import React, {useState} from 'react'
import Modal from './Modal'
import styles from './css/PopOutImg.module.css'

const PopOutImg = ({source}) => {
  const [isModalVisible, setModalVisible] = useState(false)

  return (
    <div>
      {isModalVisible && (
        <Modal>
          <div className={styles.centeredImgBlock}>
            <span
              className={styles.closeModalBtn}
              onClick={() => setModalVisible(false)}
            >
              <i className="material-icons">close</i>
            </span>
            {/* source array contains an optional second image for full-screen modal view if the first image was object-fitted or cropped */}
            <img src={source.length === 2 ? source[1] : source[0]} />
          </div>
        </Modal>
      )}
      <div className={styles.popOutContainer}>
        <div
          className={styles.zoomInOverlay}
          onClick={() => setModalVisible(true)}
        >
          <i className="material-icons">zoom_in</i>
        </div>
        <img src={source[0]} />
      </div>
    </div>
  )
}

export default PopOutImg
