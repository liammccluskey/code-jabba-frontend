import { ExperienceLevels, ExperienceYears } from "../EditJobCard"

export const formatSalary = (salary, frequency) => {

    return salary ? `$${salary.toLocaleString('en-US')} / ${frequency}` : 'Salary not provided'
}

export const formatSalaryRange = (salaryMin, salaryMax, frequency) => {
    return salaryMin && salaryMax && frequency ? `
    $${salaryMin.toLocaleString('en-US')} / ${frequency}
     - 
    $${salaryMax.toLocaleString('en-US')} / ${frequency}
    `
    : 'Salary not provided'
}

export const getJobExperienceLevel = (jobMinExperienceLevel, jobMaxExperienceLevel) => {
    return jobMinExperienceLevel === jobMaxExperienceLevel ? 
    ExperienceLevels.find(level => level.id === jobMinExperienceLevel).title + ' level'
    : `${ExperienceLevels.find(level => level.id === jobMinExperienceLevel).title} - ${ExperienceLevels.find(level => level.id === jobMaxExperienceLevel).title} level`
}

export const getJobExperienceYears = (jobMinExperienceYears, jobMaxExperienceYears) => {
    return jobMinExperienceYears == jobMaxExperienceYears ? 
        ExperienceYears.find(years => years.id == jobMinExperienceYears).title + ' years'
        : `${ExperienceYears.find(years => years.id == jobMinExperienceYears).min} - ${ExperienceYears.find(years => years.id == jobMaxExperienceYears).max} years`
}