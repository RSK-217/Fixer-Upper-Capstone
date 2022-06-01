import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Expenses } from '../expenses/Expenses'

const DiyProject = () => {
    const [project, setProject] = useState({})
    const { projectId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/projects/${projectId}`)
                .then(response => response.json())
                .then((data) => {
                    setProject(data)
                })
        },
        [projectId]
    )

    const projectComplete = () => {
        return project.complete === true ? 'PROJECT COMPLETE' : ''
    }

    return (
        <>
            <h1>{projectComplete()}</h1>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <h4>Budget: </h4><p>${project.budget}</p>
            <Link to={`/diyProject/${projectId}/editProject`}>Edit project details</Link>
            <Expenses />

        </>
    )
}

export default DiyProject