import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './ContractorForm.css'

export const AddContractor = () => {
    const [contractor, setContractor] = useState({
        name: '',
        phone: '',
        email: '',
        website: ''
    })

    const history = useHistory()

    const cancelForm = () => {
        history.push('/contractors')
    }

    const saveContractor = (e) => {
        e.preventDefault()
        const newContractor = {
            name: contractor.name,
            phone: contractor.phone,
            email: contractor.email,
            website: contractor.website
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newContractor)
        }

        return fetch(`http://localhost:8088/contractors`, fetchOptions)
            .then(response => response.json())
            .then(() => {
                history.push('/contractors')
            })
    }

    return (
        <form className="contractorForm" style={{backgroundImage: 'url(/images/tile2.webp)'}}>
             <h2 className="addCon_title">Add contractor</h2>
            <fieldset>
                <div className="form-group">
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
                        placeholder="Name or company"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
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
                        placeholder="phone"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
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
                        placeholder="email"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
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
                        placeholder="website"
                    />
                </div>
            </fieldset>
            <section className='contractor-form-btn'>
            <button className="con-btn" onClick={saveContractor}>
                Save
            </button>&nbsp;
            <button className="con-btn" onClick={cancelForm}>
                Cancel
            </button>
            </section>
        </form>
    )
}

export default AddContractor