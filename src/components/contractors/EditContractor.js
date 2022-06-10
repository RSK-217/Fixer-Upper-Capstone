import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getContractorId } from '../ApiManager'

export const EditContractor = () => {
    const [contractor, setContractor] = useState([])
    const history = useHistory()
    const { contractorId } = useParams()

    const cancelForm = () => {
        history.push(`/contractors`)
    }

    useEffect(
        () => {
            getContractorId(contractorId)
                .then((res) => {
                    setContractor(res)
                })
        },
        []
    )

    const updateContractor = (e) => {
        e.preventDefault()
        const newContractor = {
            name: contractor.name,
            phone: contractor.phone,
            email: contractor.email,
            website: contractor.website
        }

        fetch(`http://localhost:8088/contractors/${contractorId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContractor)
        })
            .then(() => {
                history.push(`/contractors`)
            })
    }
        

    return (
        <form className="contractorForm">
            <h2 className="editCon_title">Edit contractor</h2>
        <fieldset>
            <div className="form-group">
                <label>Name or company</label>
                <input
                    onChange={
                        (e) => {
                            const copy = { ...contractor }
                            copy.name = e.target.value
                            setContractor(copy)
                        }}
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={contractor.name}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label>Phone number</label>
                <input
                    onChange={
                        (e) => {
                            const copy = { ...contractor }
                            copy.phone = e.target.value
                            setContractor(copy)
                        }}
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={contractor.phone}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label>email</label>
                <input
                    onChange={
                        (e) => {
                            const copy = { ...contractor }
                            copy.email = e.target.value
                            setContractor(copy)
                        }}
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={contractor.email}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label>Website</label>
                <input
                    onChange={
                        (e) => {
                            const copy = { ...contractor }
                            copy.website = e.target.value
                            setContractor(copy)
                        }}
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={contractor.website}
                />
            </div>
        </fieldset>
        <section className='editCon-form-btn'>
        <button className="btn btn-primary" onClick={updateContractor}>
            Save
        </button>&nbsp;
        <button className="btn btn-primary" onClick={cancelForm}>
            Cancel
        </button>
        </section>
    </form>
    )
}

export default EditContractor