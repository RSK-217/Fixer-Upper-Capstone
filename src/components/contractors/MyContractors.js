import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {  getAllContractors, getAllEstimates } from '../ApiManager'
import { Card, CardImg, CardBody, CardTitle, CardText, CardHeader, CardFooter, Container, Row, Col } from 'reactstrap';
import { BsFillXCircleFill, BsFillPlusCircleFill, BsFillPencilFill } from 'react-icons/bs'
import { AddContractor } from './AddContractor';
import { EditContractor } from './EditContractor';
import './Contractor.css'
import ContractorFilter from '../filter/ContractorFilter';

export const MyContractors = () => {
    const [contractors, setContractors] = useState([])
    const [estimate, setEstimate] = useState([])
    const [Form, setForm] = useState([<AddContractor />])
    const [edit, setEdit] = useState([<EditContractor />])
    const [filterSetting, setFilter] = useState('')

    const showForm = () => {
        setForm(!Form)
    }

    const editForm = () => {
        setEdit(!edit)
    }

    const filterContractors = () => {
        if (filterSetting === 'estimate') {
            return contractors.filter(c => c.estimateId !== estimate.id )
        }
        return contractors
    }

    const Delete = (id) => {
        fetch(`http://localhost:8088/contractors/${id}`, {
            method: "DELETE"
        })
            .then(setContractors(contractor => contractor.filter(contractor => contractor.id !== id)))
    }

    useEffect(
        () => {
            getAllEstimates()
                .then((res) => {
                    setEstimate(res)
                })
        },
        []
    )

    useEffect(
        () => {
            getAllContractors()
                .then((res) => {
                    setContractors(res)
                })
        },
        []
    )

    return (
        <>
            <Container fluid>
                <div className='contractor-head'>
                    <h1>My Contractors</h1>
                    <ContractorFilter value={filterSetting} setFilter={setFilter} />
                    <Link className='new-contractor' to='/contractors/add'><BsFillPlusCircleFill style={{ cursor: "pointer" }} onClick={() => {
                        showForm()
                    }}></BsFillPlusCircleFill>  Add a new contractor</Link>
                </div>
                <Row>
                    <Col>
                        <div className='contractor-wrap'>{filterContractors().map((contractor) => {
                            return <Card className='contractor' key={`contractor--${contractor.id}`}>
                                <CardHeader> <CardImg className='con-img' variant='top' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVq3fPtbcHMZCAAETJoZ9zukfSSUgup298ZQ&usqp=CAU' alt='contractor default image'></CardImg></CardHeader>
                                <CardBody>
                                    <CardTitle className='con-title'><h3>{contractor.name} </h3></CardTitle>
                                    <CardText className='con-text'><b>phone</b><br />{contractor.phone}</CardText>
                                    <CardText className='con-text'><b>email</b><br />{contractor.email}</CardText>
                                    <CardText className='con-text'><b>website</b><br /><a href={contractor.website} target='_blank'>{contractor.website}</a></CardText>
                                </CardBody>
                                <CardFooter className='edit-delete'>
                                    <Link to={`/contractors/${contractor.id}/edit`}>
                                        <BsFillPencilFill color='orange' style={{ cursor: "pointer" }} onClick={() => {
                                            editForm()
                                        }}></BsFillPencilFill></Link>&nbsp;&nbsp;
                                    <BsFillXCircleFill className='delete' color='red' style={{ cursor: "pointer" }} onClick={() => {
                                        Delete(contractor.id)
                                    }}></BsFillXCircleFill>
                                </CardFooter>
                            </Card>
                        }
                        )
                        }
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MyContractors