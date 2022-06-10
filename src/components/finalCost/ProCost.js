import React from 'react'

export const ProCost = ({onChange, value}) => {
  
  return (
    <div className="form-group">
        <label>Final Cost</label>
          <input
            onChange={onChange}
            value={value}
            required autoFocus
            type="text"
            className="form-control"
            />
    </div>
  )
}

export default ProCost