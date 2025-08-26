import { ExperienceLevels, ExperienceYears } from "../EditJobCard"

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