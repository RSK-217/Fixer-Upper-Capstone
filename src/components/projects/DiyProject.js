import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getAllExpenses } from '../ApiManager'
import { Expenses } from '../expenses/Expenses'
import Budget from '../finalCost/Budget'
import { FinalCost } from '../finalCost/finalCost'
import { BsFillPencilFill } from 'react-icons/bs'
import './Project.css'

const DiyProject = () => {
    const [project, setProject] = useState({})
    const [expense, setExpense] = useState([])
    const { projectId } = useParams()

    const filterExpense = (expensesToFilter) => {
        return expensesToFilter.filter(expense => {
            return expense.projectId === parseInt(projectId)
        }
        )
    }

    const projectComplete = () => {
        return project.complete === true ? 'PROJECT COMPLETE!' : ''
    }

    const budget = () => {
        if (project.pro === false) {
            return <Budget value={project.budget} />
        }
    }

    const cost = () => {
        if (project.complete === true) {
            const sum = expense.reduce((total, currentValue) => total = total + currentValue.amount, 0)
            return <FinalCost value={sum} />
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

    useEffect(
        () => {
            getAllExpenses()
                .then((data) => {
                    setExpense(filterExpense(data))
                })
        },
        []
    )

    return (
        <>
            <article className='body' style={{ backgroundImage: 'url(/images/shiplap.jpg)' }}>
                <header className='header'>
                    <img className='default-project-img' src='/images/homeicon2.jpg' alt='home icon' />
                    <h1 className='title'>{project.title}</h1>
                </header>

                <section className='aside'>
                    <h4 className='project-type'>D.I.Y Project</h4>
                    <h1 className='complete'>{projectComplete()}</h1>
                    {budget()}{cost()}
                </section>

                <section className='details'>
                    <div className='details-header'>
                        <h4 className='description-title'>Project notes</h4>
                        <Link className='edit' to={`/diyProject/${projectId}/editProject`}><BsFillPencilFill className='edit-icon'></BsFillPencilFill>&nbsp;&nbsp;edit project</Link>
                    </div>
                    <p className='description'>{project.description}</p>
                </section>

                <Expenses />
            </article>
        </>
    )
}

export default DiyProject