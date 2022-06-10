import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllExpenses } from '../ApiManager'
import { AddExpense } from './AddExpense'
import { EditExpense } from './EditExpense'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { BsFillXCircleFill } from 'react-icons/bs'
import { BsFillPencilFill } from 'react-icons/bs'

export const Expenses = () => {
    const [expenses, setExpense] = useState([])
    const [Form, setForm] = useState([<AddExpense />])
    const [edit, setEdit] = useState([<EditExpense />])

    const { projectId } = useParams()

    const filterExpense = (expensesToFilter) => {
        return expensesToFilter.filter(expense => {
            return expense.projectId === parseInt(projectId)
        }
        )
    }

    const expenseTotal = () => {
        const sum = expenses.reduce((total, currentValue) => total = total + currentValue.amount, 0)
        return sum
    }

    const Delete = (id) => {
        fetch(`http://localhost:8088/expenses/${id}`, {
            method: "DELETE"
        })
            .then(setExpense(expense => expense.filter(expense => expense.id !== id)))
    }

    const showForm = () => {
        setForm(!Form)
    }

    const editForm = () => {
        setEdit(!edit)
    }

    useEffect(
        () => {
            getAllExpenses()
                .then((expense) => {
                    setExpense(filterExpense(expense))
                })
        },
        []
    )

    return (
        <>
            <h4>Expenses</h4>
            <Link to={`/diyProject/${projectId}/add`}>
                <BsFillPlusCircleFill style={{ cursor: "pointer" }} onClick={() => {
                    showForm()
                }}></BsFillPlusCircleFill>  Add an expense
            </Link>
            <ul>
                {expenses.map(expense => {
                    return <li key={`expense--${expense.id}`}>{expense.type}: ${expense.amount}&nbsp;&nbsp;
                        <Link to={`/diyProject/${expense.id}/edit`}>
                            <BsFillPencilFill color='orange' style={{ cursor: "pointer" }} onClick={() => {
                                editForm()
                            }}></BsFillPencilFill>
                        </Link>&nbsp;&nbsp;
                        <BsFillXCircleFill color='red' style={{ cursor: "pointer" }} onClick={() => {
                            Delete(expense.id)
                        }}></BsFillXCircleFill>
                    </li>}
                    )
                }
            </ul>
            <h6>Total: ${expenseTotal()}</h6>

        </>
    )
}

export default Expenses