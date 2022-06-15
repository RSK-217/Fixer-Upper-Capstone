import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Estimates from '../estimates/Estimates'
import { FinalCost } from '../finalCost/finalCost'
import { Budget } from '../finalCost/Budget'

export const ProProject = () => {
    const [project, setProject] = useState({})
    const { projectId } = useParams()

    const budget = () => {
        if(project.pro === true){
            return <Budget value={project.budget}/>
        }
    }

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

    const showFinalCost = () => {
        if(project.complete === true){
            return <FinalCost value={project.finalCost}/>
        }
    }

    const projectComplete = () => {
        return project.complete === true ? 'PROJECT COMPLETE' : ''
    }

    return (
        <>
            <img className='default-project-img' src='https://static.vecteezy.com/system/resources/previews/000/425/085/non_2x/house-icon-vector-illustration.jpg' alt='home icon default' />
            <h1>{projectComplete()}</h1>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            {budget()}{showFinalCost()}
            <Link to={`/proProject/${projectId}/editProject`}>Edit project details</Link>
            <Estimates />
        </>
    )
}

export default ProProject