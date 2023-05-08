export const mapProjectFormDataToProjectData = formData => ({
    projectName: formData.projectName,
    projectType: formData.projectType,
    logoImageURLs: formData.logoImageURLs,
    domainProviderURL: formData.domainProviderURL,
    domainProviderUsername: formData.domainProviderUsername,
    domainProviderPassword: formData.domainProviderPassword,

    heroTitle: formData.heroTitle,
    heroMessage: formData.heroMessage,
    
    selectedThemes: [[formData.lightThemeSelected, 0], [formData.darkThemeSelected, 1], [formData.blueThemeSelected, 2]]
        .filter( ([selected]) => selected )
        .map( ([_, themeIndex]) => themeIndex)
    ,
    defaultTheme: formData.lightThemeDefault ? 0
        : formData.darkThemeDefault ? 1
        : 2
    ,
    selectedTintColors: [[formData.blueTintSelected, 0], [formData.purpleTintSelected, 1], [formData.mintTintSelected, 2], [formData.greenTintSelected, 3]]
        .filter( ([selected]) => selected )
        .map( ([_, tintColorIndex]) => tintColorIndex )
    ,
    defaultTintColor: formData.blueTintSelected ? 0
        : formData.purpleTintSelected ? 1
        : formData.mintTintSelected ? 2
        : 3
    ,
    customTintColor: formData.customTintColor,

    pagesText: formData.pagesText,
    pagesImageURLs: formData.pagesImageURLs,

    hasSubscriptions: formData.hasSubscriptions,
    subscriptionTiers: formData.subscriptionTiers,

    accessCode: formData.accessCode
})