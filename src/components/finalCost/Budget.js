import React from 'react'

export const Budget = ({value}) => {
    
    return (
    <h4 className='budget'>Budget: ${value.toLocaleString()}</h4>
  )
}

export default Budget