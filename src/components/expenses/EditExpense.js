import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { expandedExpenses } from '../ApiManager'

export const EditExpense = () => {
    const [expense, setExpense] = useState([])
    const history = useHistory()
    const { expenseId } = useParams()

    const cancelForm = () => {
        history.push(`/diyProject/${expense.projectId}`)
    }

    useEffect(
        () => {
            expandedExpenses(expenseId)
                .then((res) => {
                    setExpense(res)
                })
        },
        []
    )

    const updateExpense = (event) => {
        event.preventDefault()
        const newExpense = {
            type: expense.type,
            amount: parseInt(expense.amount),
            projectId: expense.projectId
        }

        fetch(`http://localhost:8088/expenses/${expenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newExpense)
        })
            .then(() => {
                history.push(`/diyProject/${expense.projectId}`)
            })
    }

    return (
        <form className="expenseForm" style={{ backgroundImage: 'url(/images/shiplap.jpg)' }}>
            <h2 className="edit-expense-title">Edit expense</h2>
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
                        value={expense.type || ''}
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
                                copy.amount = e.target.value
                                setExpense(copy)
                            }}
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={expense.amount || ''}
                    />
                </div>
            </fieldset>
            <section className='editEx-form-btn'>
                <button className="expense-btn" onClick={updateExpense}>
                    Save
                </button>&nbsp;
                <button className="expense-btn" onClick={cancelForm}>
                    Cancel
                </button>
            </section>
        </form>
    )
}

export default EditExpense