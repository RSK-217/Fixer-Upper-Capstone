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