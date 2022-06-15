import React, { useState, useEffect } from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { Alert } from 'reactstrap'

export const AddToMyCon = ({estimate}) => {
    
   const saveContractor = () => {
        
        const newContractor = {
            name: estimate.contractor,
            phone: estimate.phone,
            email: '',
            website: '',
            estimateId: estimate.id,
            projectId: estimate.projectId
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newContractor)
        }

        return fetch(`http://localhost:8088/contractors`, fetchOptions)
            .then(response => response.json())
            .then(() => {
                alert('Added to My Contractors')
                // <Alert color="info" toggle={function noRefCheck(){}}>Added to my contractors</Alert>
            })
    }
    return (
        <BsFillPlusCircleFill color='green' style={{ cursor: "pointer" }} onClick={() => {saveContractor()}}></BsFillPlusCircleFill>
    )
}

export default AddToMyCon