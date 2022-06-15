import React from 'react'

export const ContractorFilter = ({value, setFilter}) => {
    const handleChange = (e) => {
        setFilter(e.target.value)
    }
    return (
        <>
            <select value={value} onChange={handleChange}>
                <option value=''>All</option>
                <option value='estimate'>Estimate submitted</option>
            </select>
        </>
    )
}

export default ContractorFilter