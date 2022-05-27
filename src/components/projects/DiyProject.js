import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Expenses } from '../expenses/Expenses'

const DiyProject = () => {
    const [diy, setDiy] = useState({})
    const { projectId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/projects/${projectId}`)
                .then(response => response.json())
                .then((data) => {
                    setDiy(data)
                })
        },
        [projectId]
    )

    return (
        <>
            <h2>{diy.title}</h2>
            <p>{diy.description}</p>
            <Expenses />

        </>
    )
}

export default DiyProject