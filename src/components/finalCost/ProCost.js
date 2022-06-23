import React from 'react'

export const ProCost = ({ onChange, value }) => {

  return (
    <div className="form-group">
      <label>Final Cost</label>
      <input
        required autoFocus
        onChange={onChange}
        value={value}
        type="text"
        className="form-control"
      />
    </div>
  )
}

export default ProCost