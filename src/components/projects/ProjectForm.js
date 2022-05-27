import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export const ProjectForm = () => {
    const [project, setProject] = useState({
        title: '',
        description: '',
        budget: 1,
        pro: false
    })

    const history = useHistory()
    

    const saveProject = (e) => {
        e.preventDefault()
        const newProject = {
            title: project.title,
            description: project.description,
            budget: project.budget,
            pro: project.pro
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProject)
        }

        return fetch(`http://localhost:8088/projects`, fetchOptions)
            .then(response => response.json())
            .then(() => {
                project.pro === false ? history.push(`/diyProject`) : history.push("/proProject")
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
                        placeholder="title"
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
                        type="text"
                        className="form-control"
                        placeholder="description"
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
                                copy.budget = parseInt(e.target.value)
                                setProject(copy)
                            }}
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="$"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label >Hire a pro&nbsp;</label>
                    <input type="checkbox"
                        onChange={(e) => {
                            const copy = { ...project }
                            copy.pro = e.target.checked
                            setProject(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label >Do it yourself&nbsp;</label>
                    <input type="checkbox"
                        onChange={(e) => {
                            const copy = { ...project }
                            const isChecked = e.target.checked
                            copy.pro = !isChecked
                            setProject(copy)
                        }} />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={saveProject}>
                Let's go!
            </button>
        </form>
    )

}

export default ProjectForm