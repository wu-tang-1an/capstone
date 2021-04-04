import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import {AuthContext} from '../context/authContext'
import {createProjectDb, getOrgDb} from '../context/axiosService'
import {notify} from './helper/toast'

import styles from './css/AddDialogShared.module.css'

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const FormInput = styled.input`
  margin-bottom: 5px;
`

const validate = (name) => {
  let errors = []

  if (!name.length) errors.push('Name must not be empty!')

  return errors
}

const AddProjectModal = ({organization, setProjects, closeModal}) => {
  const {user} = useContext(AuthContext)

  const [name, setName] = useState('')
  const [description, setDescription] = useState()
  const [imageUrl, setImageUrl] = useState()

  const createProject = async () => {
    const errors = validate(name)

    if (errors.length) {
      errors.forEach((error) => {
        notify(error, 'error')
      })

      return
    }

    await createProjectDb(organization.id, {
      name: name,
      description: description,
      imageUrl: imageUrl,
    })

    // get new organization info from db
    const data = await getOrgDb(organization.id)

    // update projects state
    setProjects(data.projects || [])

    closeModal()

    notify(`Project "${name}" created!`, 'success')
  }

  return (
    <div className={styles.addDropDownContainer}>
      <FormWrapper>
        <FormInput
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name"
        ></FormInput>
        <FormInput
          type="text"
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Project image URL"
        ></FormInput>
        <textarea
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project description"
        ></textarea>
      </FormWrapper>
      <div className={styles.btnContainer}>
        <button type="button" className={styles.addBtn} onClick={createProject}>
          Add
        </button>
        <button type="button" className={styles.cancelBtn} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  )
}

export default AddProjectModal
