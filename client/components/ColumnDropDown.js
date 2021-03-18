import React from 'react'

// fields are actions that user can take from dropdown menu
const fields = [
  {id: 1, content: 'Edit column'},
  {id: 2, content: 'Manage automation'},
  {id: 3, content: 'Delete column'},
  // more fields as necessary
]

const ColumnDropDown = (props) => {
  return (
    <div className="columnDropDownContainer">
      {fields.map((field) => (
        // onClick, reveal a dropdown with clickable links for each field
        <div key={field.id} className="dropDownField">
          {field.content}
        </div>
      ))}
    </div>
  )
}
export default ColumnDropDown
