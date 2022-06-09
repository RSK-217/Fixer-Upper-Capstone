import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllEstimates } from '../ApiManager'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { BsFillXCircleFill } from 'react-icons/bs'
import { BsFillPencilFill } from 'react-icons/bs'
import { AddToMyCon } from './AddToMyCon'
import AddEstimate from '../estimates/AddEstimate'

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
        setChecked({ [e.target.checked]: true })
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
            { }
            <h4>Estimates</h4>
            <Link to={`/proProject/${projectId}/add`}>
                <BsFillPlusCircleFill style={{ cursor: "pointer" }} onClick={() => {
                    showForm()
                }}></BsFillPlusCircleFill>  Add an estimate
            </Link>
            {estimates.map(estimate => {
                return <div key={`estimate--${estimate.id}`}><input type='radio' value='accepted' checked={checked.id} name='estimate' onChange={radioChange} />${estimate.estimate} -&nbsp;
                    <Link to={`/contractors`}>{estimate.contractor}</Link> -&nbsp;
                    {estimate.phone}&nbsp;&nbsp;
                    <AddToMyCon estimate={estimate} />&nbsp;&nbsp;
                    <Link to={`/proProject/${estimate.id}/edit`}>
                        <BsFillPencilFill color='orange' style={{ cursor: "pointer" }} onClick={() => {
                            showForm()
                        }}></BsFillPencilFill>
                    </Link>&nbsp;&nbsp;
                    <BsFillXCircleFill color='red' style={{ cursor: "pointer" }} onClick={() => {
                        Delete(estimate.id)
                    }}></BsFillXCircleFill>
                </div>
            })}

        </>
    )
}

export default Estimates