import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProjects } from '../ApiManager'
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import { BsFillXCircleFill } from 'react-icons/bs'
import { BsFillPlusCircleFill } from 'react-icons/bs'

export const MyProjects = () => {
    const [projects, setProjects] = useState([])


    const Delete = (id) => {
        fetch(`http://localhost:8088/projects/${id}`, {
            method: "DELETE"
        })
            .then(setProjects(project => project.filter(project => project.id !== id)))
    }

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
            <h1>My Projects</h1>
            <Link to='/form'><BsFillPlusCircleFill></BsFillPlusCircleFill>   Start a new project</Link>
            {projects.map((project) => {
                return <Card key={`project--${project.id}`}>
                    <CardBody>
                        <CardImg></CardImg>
                        <CardTitle>{project.pro === false ? <Link to={`/diyProject/${project.id}`}>{project.title}</Link> : <Link to={`/proProject/${project.id}`}>{project.title}</Link>}</CardTitle>
                        <CardText>{project.description}</CardText>
                        <BsFillXCircleFill color='red' style={{ cursor: "pointer" }} onClick={() => {
                            Delete(project.id)
                        }}>Delete</BsFillXCircleFill>
                    </CardBody>
                </Card>
            }
        )
        }
        </>
    )
}

export default MyProjects