import React from 'react'

export const FinalCost = ({value}) => {
    
    return (
    <h4>Final Cost: ${value.toLocaleString()}</h4>
  )
}

export default FinalCost