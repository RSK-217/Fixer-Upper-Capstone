import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { expandedEstimates } from '../ApiManager'
import './EstimateForm.css'

export const EditEstimate = () => {
    const [estimate, setEstimate] = useState([])
    const history = useHistory()
    const { estimateId } = useParams()

    const cancelForm = () => {
        history.push(`/proProject/${estimate.projectId}`)
    }

    useEffect(
        () => {
            expandedEstimates(estimateId)
                .then((res) => {
                    setEstimate(res)
                })
        },
        []
    )

    const updateEstimate = (event) => {
        event.preventDefault()
        const newEstimate = {
            estimate: parseInt(estimate.estimate),
            projectId: estimate.projectId,
            contractor: estimate.contractor,
            phone: estimate.phone
        }

        fetch(`http://localhost:8088/estimates/${estimateId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEstimate)
        })
            .then(() => {
                history.push(`/proProject/${estimate.projectId}`)
            })
    }

    return (
        <form className="estimateForm" style={{ backgroundImage: 'url(/images/shiplap.jpg)' }}>
            <h2 className="edit-estimate-title">Edit estimate</h2>
            <fieldset>
                <div className="form-group">
                    <label>Estimate</label>
                    <input
                        onChange={
                            (e) => {
                                const copy = { ...estimate }
                                copy.estimate = e.target.value
                                setEstimate(copy)
                            }}
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={estimate.estimate || ''}
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
                        value={estimate.contractor || ''}
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
                        value={estimate.phone || ''}
                    />
                </div>
            </fieldset>
            <section className='editEst-form-btn'>
                <button className="btn btn-primary" onClick={updateEstimate}>
                    Save
                </button>&nbsp;
                <button className="btn btn-primary" onClick={cancelForm}>
                    Cancel
                </button>
            </section>
        </form>
    )
}

export default EditEstimate