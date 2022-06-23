import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
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

    const myProjects = () => {
        history.push(`/projects`)
    }

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
        <form className='projectForm' style={{ backgroundImage: 'url(/images/Home7.jpg)' }}>

            <h2 className='projectForm-title'>Lets get started on your</h2>
            <h1 className='projectForm-title-name'>Fixer Upper!</h1>

            <fieldset>
                <div>
                    <input
                        onChange={
                            (e) => {
                                const copy = { ...project }
                                copy.title = e.target.value
                                setProject(copy)
                            }}
                        required autoFocus
                        type='text'
                        className='form-control'
                        placeholder='project title'
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <textarea
                        onChange={
                            (e) => {
                                const copy = { ...project }
                                copy.description = e.target.value
                                setProject(copy)
                            }}
                        required autoFocus
                        type='text'
                        className='form-textarea'
                        placeholder='notes, details, etc.'
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <input
                        onChange={
                            (e) => {
                                const copy = { ...project }
                                copy.budget = parseInt(e.target.value)
                                setProject(copy)
                            }}
                        required autoFocus
                        type='text'
                        className='form-control'
                        placeholder='$ budget'
                    />
                </div>
            </fieldset>
            <section className='form-radio'>
                <fieldset>
                    <div>
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
                        <label className='radio-label'>Hire a pro</label>
                    </div>
                </fieldset>
                <fieldset>
                    <div>
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
                        <label className='radio-label'>Do it yourself</label>
                    </div>
                </fieldset>
            </section>
            <button className='btn btn-primary' onClick={saveProject}>
                continue
            </button>
            <Link className='skip-project' to='/projects'>
                Skip to my projects
            </Link>
        </form>
    )

}

export default ProjectForm