import React from 'react'

export const Filter = ({value, setFilter}) => {
    const handleChange = (e) => {
        setFilter(e.target.value)
    }
    return (
        <>
            <select value={value} onChange={handleChange}>
                <option value=''>All</option>
                <option value='complete'>completed projects</option>
                <option value='incomplete'>incomplete projects</option>
                <option value='diy'>diy projects</option>
                <option value='pro'>pro projects
                </option>

            </select>
        </>
    )
}

export default Filter