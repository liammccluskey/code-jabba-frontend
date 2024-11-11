export const getFormDataModifed = (formData, mongoUser) => {
    return {
        email: formData.email !== mongoUser.email,
        phoneNumber: formData.phoneNumber !== mongoUser.phoneNumber,
        address: formData.address !== mongoUser.address,
        birthdayDay: formData.birthdayDay !== mongoUser.birthdayDay,
        birthdayMonth: formData.birthdayMonth !== mongoUser.birthdayMonth,
        birthdayYear: formData.birthdayYear !== mongoUser.birthdayYear,
    }
}