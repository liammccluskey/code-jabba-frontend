export const getFormDataModified = (formData, project) => ({
    title: formData.title !== project.title,
    url: formData.url !== project.url,
    codeURL: formData.codeURL !== project.codeURL,
    skills: formData.skills !== project.skills,
    description: formData.description !== project.description,
    fieldOfStudy: formData.fieldOfStudy !== project.fieldOfStudy, 
    startMonth: formData.startMonth !== project.startMonth, 
    startYear: formData.startYear !== project.startYear, 
    endMonth: formData.endMonth !== project.endMonth,
    endYear: formData.endYear !== project.endYear,
    isCurrent: formData.isCurrent !== project.isCurrent,
})