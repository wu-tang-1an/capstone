import React, {useState} from 'react'
import Modal from './Modal'
import styles from './css/PopOutImg.module.css'

const PopOutImg = ({source}) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [isIconVisible, setIconVisible] = useState(false)

  const img = (
    <img
      src={source}
      style={{height: '300px', width: 'auto', margin: '0 auto'}}
    />
  )

  return (
    <div>
      {isModalVisible && (
        <Modal>
          <div className={styles.popOutContainer}>
            {img}
            <span
              className={styles.closeModalBtn}
              onClick={() => setModalVisible(false)}
            >
              <i className="material-icons">close</i>
            </span>
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
        {img}
      </div>
    </div>
  )
}

export default PopOutImg
