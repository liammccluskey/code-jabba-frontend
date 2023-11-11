export const formatSalary = (salary, frequency) => {
    return `$${salary.toLocaleString('en-US')} / ${frequency}`
}

export const formatSalaryRange = (salaryMin, salaryMax, frequency) => {
    return `
    $${salaryMin.toLocaleString('en-US')} / ${frequency}
     - 
    $${salaryMax.toLocaleString('en-US')} / ${frequency}
    `
}