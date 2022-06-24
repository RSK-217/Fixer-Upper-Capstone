import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import './EstimateForm.css'

export const AddEstimate = () => {
    const [estimate, setEstimate] = useState({})

    const history = useHistory()
    const { projectId } = useParams()

    const cancelForm = () => {
        history.push(`/proProject/${projectId}`)
    }

    const saveEstimate = (e) => {
        e.preventDefault()
        const newEstimate = {
            estimate: estimate.estimate,
            projectId: parseInt(`${projectId}`),
            contractor: estimate.contractor,
            phone: estimate.phone
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEstimate)
        }

        return fetch(`http://localhost:8088/estimates`, fetchOptions)
            .then(response => response.json())
            .then(() => {
                history.push(`/proProject/${projectId}`)
            })
    }

    return (
        <form className="estimateForm" style={{ backgroundImage: 'url(/images/shiplap.jpg)' }}>
            <h2 className="add-estimate-title">Add an estimate</h2>
            <fieldset>
                <div className="form-group">
                    <label>Estimate</label>
                    <input
                        onChange={
                            (e) => {
                                const copy = { ...estimate }
                                copy.estimate = parseInt(e.target.value)
                                setEstimate(copy)
                            }}
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="estimate"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Contractor</label>
                    <input
                        onChange={
                            (e) => {
                                const copy = { ...estimate }
                                copy.contractor = e.target.value
                                setEstimate(copy)
                            }}
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="contractor"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        onChange={
                            (e) => {
                                const copy = { ...estimate }
                                copy.phone = e.target.value
                                setEstimate(copy)
                            }}
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="phone"
                    />
                </div>
            </fieldset>
            <section className='estimate-form-btn'>
                <button className="estimate-btn" onClick={saveEstimate}>
                    Save
                </button>&nbsp;
                <button className="estimate-btn" onClick={cancelForm}>
                    Cancel
                </button>
            </section>
        </form>
    )
}

export default AddEstimate