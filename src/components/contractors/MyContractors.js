import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllContractors } from '../ApiManager'
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import { BsFillXCircleFill, BsFillPlusCircleFill, BsFillPencilFill } from 'react-icons/bs'
import { AddContractor } from './AddContractor';
import { EditContractor } from './EditContractor';

export const MyContractors = () => {
    const [contractors, setContractors] = useState([])
    const [Form, setForm] = useState([<AddContractor />])
    const [edit, setEdit] = useState([<EditContractor />])

    const showForm = () => {
        setForm(!Form)
    }

    const editForm = () => {
        setEdit(!edit)
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
                        <CardTitle><h3>{contractor.name} </h3></CardTitle>
                        <CardText>phone: {contractor.phone}</CardText>
                        <CardText>email: {contractor.email}</CardText>
                        <CardText>website: {contractor.website}</CardText>
                        <Link to={`/contractors/${contractor.id}/edit`}>
                        <BsFillPencilFill color='orange' style={{ cursor: "pointer" }} onClick={() => {
                            editForm()
                        }}></BsFillPencilFill></Link>&nbsp;&nbsp;
                        <BsFillXCircleFill color='red' style={{ cursor: "pointer" }} onClick={() => {
                            Delete(contractor.id)
                        }}></BsFillXCircleFill> 
                    </CardBody>
                </Card>
            })}
        </>
    )
}

export default MyContractors