import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getAllExpenses, getIdProject } from '../ApiManager'
import ProCost from '../finalCost/ProCost'
import './ProjectForm.css'

export const EditProject = () => {
    const [project, setProject] = useState({})
    const [expense, setExpense] = useState([])
    const [finalCost, setFinalCost] = useState(0)
    const history = useHistory()
    const { projectId } = useParams()

    const cancelForm = () => {
        history.push(project.pro === false ? history.push(`/diyProject/${project.id}`) : history.push(`/proProject/${project.id}`))
    }

    const complete = (e) => {
        if (e.target.checked) {
            localStorage.setItem('checked', 'true')
        } else {
            localStorage.setItem('checked', 'false')
        }
    }

    const filterExpense = (expensesToFilter) => {
        return expensesToFilter.filter(expense => {
            return expense.projectId === parseInt(projectId)
        }
        )
    }

    const expenseTotal = () => {
        const sum = expense.reduce((total, currentValue) => total = total + currentValue.amount, 0)
        return sum
    }

    const handleChange = (e) => {
        const copy = { ...project }
        copy.finalCost = e.target.value
        setProject(copy)
    }

    useEffect(
        () => {
            setFinalCost(project.pro === true ? project.finalCost : expenseTotal())
        },
        [project]
    )

    useEffect(
        () => {
            getIdProject(projectId)
                .then((res) => {
                    setProject(res)
                })
        },
        []
    )

    useEffect(
        () => {
            getAllExpenses()
                .then((res) => {
                    setExpense(filterExpense(res))
                })
        },
        []
    )

    const updateProject = (event) => {
        event.preventDefault()
        const newProject = {
            title: project.title,
            description: project.description,
            budget: parseInt(project.budget),
            pro: project.pro === false ? false : true,
            complete: project.complete,
            finalCost: parseInt(finalCost)

        }

        fetch(`http://localhost:8088/projects/${projectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProject)
        })
            .then(() => {
                history.push(project.pro === false ? history.push(`/diyProject/${project.id}`) : history.push(`/proProject/${project.id}`))
            })
    }

    return (
        <form className="editForm" style={{ backgroundImage: 'url(/images/shiplap.jpg)' }}>
            <h3 className="edit-form-title">Edit project</h3>
            <fieldset>
                <div className="form-group">
                    <input
                        onChange={
                            (e) => {
                                const copy = { ...project }
                                copy.title = e.target.value
                                setProject(copy)
                            }}
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={project.title || ''}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <textarea
                        onChange={
                            (e) => {
                                const copy = { ...project }
                                copy.description = e.target.value
                                setProject(copy)
                            }}
                        required autoFocus
                        type="textarea"
                        className="form-textarea"
                        value={project.description || ''}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input
                        onChange={
                            (e) => {
                                const copy = { ...project }
                                copy.budget = e.target.value
                                setProject(copy)
                            }}
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={project.budget || ''}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label >Project has been completed&nbsp;</label>
                    <input type="checkbox"
                        onChange={(e) => {
                            const copy = { ...project }
                            copy.complete = e.target.checked
                            setProject(copy)
                            complete(e)
                        }}
                        checked={project.complete || ''}
                    />
                </div>
            </fieldset>
            <fieldset>
                {project.complete ? <ProCost onChange={handleChange} value={finalCost} /> : <></>}

            </fieldset>
            <section className='form-button'>
                <button className="edit-form-btn" onClick={updateProject}>
                    Save
                </button>&nbsp;
                <button className="edit-form-btn" onClick={cancelForm}>
                    Cancel
                </button>
            </section>
        </form>
    )
}

export default EditProject