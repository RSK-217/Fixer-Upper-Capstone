import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllContractors } from '../ApiManager'
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import { BsFillXCircleFill } from 'react-icons/bs'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { AddContractor } from './AddContractor';

export const MyContractors = () => {
    const [contractors, setContractors] = useState([])
    const [Form, setForm] = useState([<AddContractor />])

    const showForm = () => {
        setForm(!Form)
    }

    const Delete = (id) => {
        fetch(`http://localhost:8088/contractors/${id}`, {
            method: "DELETE"
        })
            .then(setContractors(contractor => contractor.filter(contractor => contractor.id !== id)))
    }

    useEffect(
        () => {
            getAllContractors()
                .then((contractor) => {
                    setContractors(contractor)
                })
        },
        []
    )

    return (
        <>
            <h1>My Contractors</h1>
            <Link to='/contractors/add'><BsFillPlusCircleFill style={{ cursor: "pointer" }} onClick={() => {
                showForm()
            }}></BsFillPlusCircleFill>  Add a new contractor</Link>
            {contractors.map((contractor) => {
                return <Card key={`contractor--${contractor.id}`}>
                    <CardBody>
                        <CardImg></CardImg>
                        <CardTitle><h3>{contractor.name}</h3></CardTitle>
                        <CardText>phone: {contractor.phone}</CardText>
                        <CardText>email: {contractor.email}</CardText>
                        <CardText>website: {contractor.website}</CardText>
                        Delete contractor  <BsFillXCircleFill color='red' style={{ cursor: "pointer" }} onClick={() => {
                            Delete(contractor.id)
                        }}></BsFillXCircleFill> 
                    </CardBody>
                </Card>
            })}
        </>
    )
}

export default MyContractors