import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Estimates from '../estimates/Estimates'

export const ProProject = () => {
    const [pro, setPro] = useState({})
    const { projectId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/projects/${projectId}`)
                .then(response => response.json())
                .then((data) => {
                    setPro(data)
                })
        },
        [projectId]
    )

    return (
        <>
            <h2>{pro.title}</h2>
            <p>{pro.description}</p>
            <Estimates />
        </>
    )
}

export default ProProject