import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllExpenses, getAllProjects } from '../ApiManager'
import { AddExpense } from './AddExpense'
import { BsFillPlusCircleFill } from 'react-icons/bs'

export const Expenses = () => {
    const [expenses, setExpense] = useState([])

    const [Form, setForm] = useState([<AddExpense />])
    const { projectId } = useParams()

    // const expenseFilter = expenses.filter(expense => {
    //     return expense.id === projectId 
    // })
    const showForm = () => {
        setForm(!Form)
    }

    useEffect(
        () => {
            getAllExpenses()
                .then((expense) => {
                    setExpense(expense)
                })
        },
        []
    )
    
    return (
        <>
            <h4>Expenses</h4>
            <Link to={`/diyProject/${projectId}/add`}><BsFillPlusCircleFill style={{ cursor: "pointer" }} onClick={() => {
                showForm()
            }}></BsFillPlusCircleFill>  Add an expense</Link>
            {expenses.map(expense=> {
                return <div key={`expense--${expense.id}`}><p>{expense.type}</p></div> 
            })}
            
        </>
    )
}

export default Expenses