import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './ProjectForm.css'

export const ProjectForm = () => {
    const [selected, setSelected] = useState({
        selectedOption: ''
    })
    const [project, setProject] = useState({
        title: '',
        description: '',
        budget: 1,
        pro: false,
        complete: false
    })

    const history = useHistory()

    const handleChange = (changeEvent) => {
        setSelected({
            selectedOption: changeEvent.target.value
        })
    }

    const saveProject = (event) => {
        event.preventDefault()

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        }

        return fetch(`http://localhost:8088/projects`, fetchOptions)
            .then(response => response.json())
            .then((projectres) => {
                projectres.pro === false ? history.push(`/diyProject/${projectres.id}`) : history.push(`/proProject/${projectres.id}`)
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
                    <label className ='form-description'>Description</label>
                    <textarea
                        onChange={
                            (e) => {
                                const copy = { ...project }
                                copy.description = e.target.value
                                setProject(copy)
                            }}
                        required autoFocus
                        type="text"
                        className="form-textarea"
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
            <section className='form-radio'>
            <fieldset>
                <div className="form-group">
                    <input type="radio"
                        onChange={(e) => {
                            const copy = { ...project }
                            copy.pro = e.target.checked
                            setProject(copy)
                            handleChange(e)
                        }} 
                        value='option1'
                        checked={selected.selectedOption === 'option1'}
                        />
                        <label>&nbsp;Hire a pro</label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input type="radio"
                        onChange={(e) => {
                            const copy = { ...project }
                            const isChecked = e.target.checked
                            copy.pro = !isChecked
                            setProject(copy)
                            handleChange(e)
                        }} 
                        value='option2'
                        checked={selected.selectedOption === 'option2'}
                        />
                        <label>&nbsp;Do it yourself</label>
                </div>
            </fieldset>
            </section>
            <button className="btn btn-primary" onClick={saveProject}>
                Let's go!
            </button>
        </form>
    )

}

export default ProjectForm