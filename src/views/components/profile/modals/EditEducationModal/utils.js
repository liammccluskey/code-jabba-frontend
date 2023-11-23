export const getFormDataModified = (formData, education) => ({
    school: formData.school !== education.school, 
    degree: formData.degree !== education.degree, 
    fieldOfStudy: formData.fieldOfStudy !== education.fieldOfStudy, 
    startMonth: formData.startMonth !== education.startMonth, 
    startYear: formData.startYear !== education.startYear, 
    endMonth: formData.endMonth !== education.endMonth,
    endYear: formData.endYear !== education.endYear,
    isCurrent: formData.isCurrent !== education.isCurrent,
})