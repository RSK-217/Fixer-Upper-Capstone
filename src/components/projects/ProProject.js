import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Estimates from '../estimates/Estimates'
import { FinalCost } from '../finalCost/finalCost'
import { Budget } from '../finalCost/Budget'
import { BsFillPencilFill } from 'react-icons/bs'
import './Project.css'

export const ProProject = () => {
    const [project, setProject] = useState({})
    const { projectId } = useParams()

    const budget = () => {
        if (project.pro === true) {
            return <Budget value={project.budget} />
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
        if (project.complete === true) {
            return <FinalCost value={project.finalCost.toLocaleString()} />
        }
    }

    const projectComplete = () => {
        return project.complete === true ? 'PROJECT COMPLETE!' : ''
    }

    return (
        <>
            <article className='body' style={{ backgroundImage: 'url(/images/shiplap.jpg)' }}>
                <header className='header'>
                    <img className='default-project-img' src='/images/homeicon2.jpg' alt='home icon' />
                    <h2 className='title'>{project.title}</h2>
                </header>

                <section className='aside'>
                    <h4 className='project-type'>Pro Project</h4>
                    <h1 className='complete'>{projectComplete()}</h1>
                    {budget()}{showFinalCost()}
                </section>

                <section className='details'>
                    <div className='details-header'>
                        <h4 className='description-title'>Project notes</h4>
                        <Link className='edit' to={`/proProject/${projectId}/editProject`}><BsFillPencilFill className='edit-icon'></BsFillPencilFill>&nbsp;&nbsp;Edit project</Link>
                    </div>
                    <p className='description'>{project.description}</p>
                </section>

                <Estimates />
            </article>
        </>
    )
}

export default ProProject