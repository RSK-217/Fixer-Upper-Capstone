import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getAllExpenses } from '../ApiManager'
import { Expenses } from '../expenses/Expenses'
import { FinalCost } from '../finalCost/finalCost'

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
        return project.complete === true ? 'PROJECT COMPLETE' : ''
    }

    const cost = () => {
        if(project.complete === true){
            const sum = expense.reduce((total, currentValue) => total = total + currentValue.amount, 0)
            return <FinalCost value={sum}/>
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
            <img className='default-project-img' src='https://static.vecteezy.com/system/resources/previews/000/425/085/non_2x/house-icon-vector-illustration.jpg' alt='home icon default' />
            <h1>{projectComplete()}</h1>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <h4>Budget: </h4><p>${project.budget}</p>{cost()}
            <Link to={`/diyProject/${projectId}/editProject`}>Edit project details</Link>
            <Expenses />

        </>
    )
}

export default DiyProject