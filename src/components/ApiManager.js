export const getAllProjects = () => {
    return fetch(`http://localhost:8088/projects`)
    .then(res => res.json())
}

export const getAllContractors = () => {
    return fetch(`http://localhost:8088/contractors`)
    .then(res => res.json())
}

export const getAllExpenses = () => {
    return fetch(`http://localhost:8088/expenses`)
    .then(res => res.json())
}


export const getAllEstimates = () => {
    return fetch(`http://localhost:8088/estimates`)
    .then(res => res.json())
}

export const expandedExpenses = (id) => {
    return fetch(`http://localhost:8088/expenses/${id}?_expand=project`)
    .then(res => res.json())
}

export const expandedEstimates = (id) => {
    return fetch(`http://localhost:8088/estimates/${id}?_expand=project`)
    .then(res => res.json())
}

export const getContractorId = (id) => {
    return fetch(`http://localhost:8088/contractors/${id}`)
    .then(res => res.json())
}

export const getIdProject = (id) => {
    return fetch(`http://localhost:8088/projects/${id}`)
    .then(res => res.json())
}