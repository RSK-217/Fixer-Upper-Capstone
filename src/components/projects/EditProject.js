import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getIdProject } from '../ApiManager'

export const EditProject = () => {
    const [project, setProject] = useState([])
    const history = useHistory()
    const { projectId } = useParams()

    const cancelForm = () => {
        history.push(project.pro === false ? history.push(`/diyProject/${project.id}`) : history.push(`/proProject/${project.id}`))
    }

    const complete = (e) => {
        if (e.target.value === true) {
            localStorage.setItem('checked', 'true')
        } else {
            localStorage.setItem('checked', 'false')
        }
    }

    useEffect(
        () => {
            getIdProject(projectId)
                .then((res) => {
                    setProject(res)
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
            complete: project.complete
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
        <form className="projectForm">
            <h2 className="projectForm_title">Lets get started!</h2>
            <fieldset>
                <div className="form-group">
                    <label>Title</label>
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
                        value={project.title}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        onChange={
                            (e) => {
                                const copy = { ...project }
                                copy.description = e.target.value
                                setProject(copy)
                            }}
                        required autoFocus
                        type="textarea"
                        className="form-control"
                        value={project.description}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Budget</label>
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
                        value={project.budget}
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
                        checked={project.complete}
                    />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={updateProject}>
                Save
            </button>&nbsp;
            <button className="btn btn-primary" onClick={cancelForm}>
                Cancel
            </button>
        </form>
    )

}

export default EditProject