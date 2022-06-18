import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import './ExpenseForm.css'

export const AddExpense = () => {
    const [expense, setExpense] = useState({
        type: '',
        amount: 1,
        projectId: 1
    })

    const history = useHistory()
    const { projectId } = useParams()
    
    const cancelForm = () => {
        history.push(`/diyProject/${projectId}`)
    }

    const saveExpense = (e) => {
        e.preventDefault()
        const newExpense = {
            type: expense.type,
            amount: expense.amount,
            projectId: parseInt(`${projectId}`)
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newExpense)
        }

        return fetch(`http://localhost:8088/expenses`, fetchOptions)
            .then(response => response.json())
            .then(() => {
                history.push(`/diyProject/${projectId}`)
            })
    }

    return (
        <form className="expenseForm">
            <h2 className="addExpense_title">Add an expense</h2>
            <fieldset>
                <div className="form-group">
                    <label>Expense</label>
                    <input
                        onChange={
                            (e) => {
                                const copy = { ...expense }
                                copy.type = e.target.value
                                setExpense(copy)
                            }}
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="expense"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Cost</label>
                    <input
                        onChange={
                            (e) => {
                                const copy = { ...expense }
                                copy.amount = parseInt(e.target.value)
                                setExpense(copy)
                            }}
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="$"
                    />
                </div>
            </fieldset>
            <section className='expense-form-btn'>
            <button className="btn btn-primary" onClick={saveExpense}>
                Save
            </button>&nbsp;
            <button className="btn btn-primary" onClick={cancelForm}>
                Cancel
            </button>
            </section>
        </form>
    )
}

export default AddExpense