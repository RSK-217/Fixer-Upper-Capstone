import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllEstimates } from '../ApiManager'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { BsFillXCircleFill } from 'react-icons/bs'
import { BsFillPencilFill } from 'react-icons/bs'
import { AddToMyCon } from './AddToMyCon'
import AddEstimate from '../estimates/AddEstimate'
import './Estimate.css'

export const Estimates = () => {
    const [estimates, setEstimates] = useState([])
    const [checked, setChecked] = useState({ checked: false })
    const [Form, setForm] = useState([<AddEstimate />])
    const { projectId } = useParams()

    const filterEstimate = (estimatesToFilter) => {
        return estimatesToFilter.filter(estimate => {
            return estimate.projectId === parseInt(projectId)
        }
        )
    }

    const radioChange = (e) => {
        setChecked({ [e.target.checked]: !false })
    }


    const Delete = (id) => {
        fetch(`http://localhost:8088/estimates/${id}`, {
            method: "DELETE"
        })
            .then(setEstimates(estimate => estimate.filter(estimate => estimate.id !== id)))
    }

    const showForm = () => {
        setForm(!Form)
    }

    useEffect(
        () => {
            getAllEstimates()
                .then((estimate) => {
                    setEstimates(filterEstimate(estimate))
                })
        },
        []
    )

    return (
        <>
        <section className='estimate-section'>
        <div className='estimate-header'>
            <h4 className='estimate-title'>Estimates</h4>
            <Link to={`/proProject/${projectId}/add`} className='add-estimate'>
                <BsFillPlusCircleFill className='estimate-icon' style={{ cursor: "pointer" }} onClick={() => {
                    showForm()
                }}></BsFillPlusCircleFill>  estimate
            </Link>
            </div>
            <ul>
            {estimates.map(estimate => {
                return <li key={`estimate--${estimate.id}`} className='icon-link'>${estimate.estimate.toLocaleString()} -&nbsp;
                    <Link className='estimate-contractor' to={`/contractors`}>{estimate.contractor}</Link> -&nbsp;
                    {estimate.phone}&nbsp;&nbsp;
                    <AddToMyCon estimate={estimate} />&nbsp;&nbsp;
                    <Link to={`/proProject/${estimate.id}/edit`}>
                        <BsFillPencilFill className='estimate-edit' style={{ cursor: "pointer" }} onClick={() => {
                            showForm()
                        }}></BsFillPencilFill>
                    </Link>&nbsp;&nbsp;
                    <BsFillXCircleFill className='estimate-delete' style={{ cursor: "pointer" }} onClick={() => {
                        Delete(estimate.id)
                    }}></BsFillXCircleFill>
                </li>
                
                }
            )
            }</ul>
            </section>
        </>
    )
}

export default Estimates