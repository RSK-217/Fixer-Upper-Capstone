import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProjects } from '../ApiManager'
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, CardHeader, CardFooter, Container } from 'reactstrap';
import { BsFillXCircleFill, BsFillPlusCircleFill } from 'react-icons/bs'
import Filter from '../filter/Filter';
import './project.css'


export const MyProjects = () => {
    const [projects, setProjects] = useState([])
    const [filterSetting, setFilter] = useState('')

    const Delete = (id) => {
        fetch(`http://localhost:8088/projects/${id}`, {
            method: "DELETE"
        })
            .then(setProjects(project => project.filter(project => project.id !== id)))
    }

    const filterProjects = () => {
        if (filterSetting === 'pro') {
            return projects.filter(p => p.pro === true)
        }
        if (filterSetting === 'diy') {
            return projects.filter(p => p.pro === false)
        }
        if (filterSetting === 'complete') {
            return projects.filter(p => p.complete === true)
        }
        if (filterSetting === 'incomplete') {
            return projects.filter(p => p.complete === false)
        }
        return projects
    }

    // const projectLink = () => {
    //     {filterProjects().map((project) => {
    //     {project.pro === false ? <Link to={`/diyProject/${project.id}`}></Link> : <Link to={`/proProject/${project.id}`}></Link>}
    // })}}

    useEffect(
        () => {
            getAllProjects()
                .then((project) => {
                    setProjects(project)
                })
        },
        []
    )

    return (
        <>
            <Container fluid>
                <h1 className='header-title'>My Projects</h1>
                <div className='filter-link'>
                    <Filter className='filter' value={filterSetting} setFilter={setFilter} />
                    <Link className='new-project' to='/form'><BsFillPlusCircleFill></BsFillPlusCircleFill>   Start a new project</Link>
                </div>
                <Row>
                    <Col>
                        <div className='card-wrap'>{filterProjects().map((project) => {
                            return <Card className='card' key={`project--${project.id}`}>
                                <CardHeader className='card-header'><CardImg className='default-card-img' variant='top' src='https://static.vecteezy.com/system/resources/previews/000/425/085/non_2x/house-icon-vector-illustration.jpg' alt='home icon default' />{project.pro ? 'Pro Project' : 'DIY Project'}</CardHeader>
                                <CardBody>
                                    <CardTitle className='card-title'>{project.pro === false ? <Link to={`/diyProject/${project.id}`}>{project.title}</Link> : <Link to={`/proProject/${project.id}`}>{project.title}</Link>}</CardTitle>
                                    <CardText className='card-description'>{project.description}</CardText>
                                </CardBody>
                                <CardFooter className='card-footer'><BsFillXCircleFill color='red' style={{ cursor: "pointer" }} onClick={() => {
                                    Delete(project.id)
                                }}>Delete</BsFillXCircleFill></CardFooter>
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

export default MyProjects