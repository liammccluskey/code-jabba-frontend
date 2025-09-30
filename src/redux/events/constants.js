export const Events = {
    // Legacy -> TODO: remove
    landingPageVisit: 'Landing page vist',

    // Candidate - No Payload
    candidateCreateAccount: 'create_account_candidate',
    candidateDeleteAccount: 'delete_account_candidate',
    candidatePremiumSignup: 'premium_signup_candidate',
    candidatePremiumCancel: 'premium_cancel_candidate',
    viewJobPost: 'view_job_post_candidate',
    sendApplication: 'send_application_candidate',

    // Recruiter - No Payload
    recruiterCreateAccount: 'create_account_recruiter',
    recruiterDeleteAccount: 'delete_account_recruiter',
    recruiterPremiumSignup: 'premium_signup_recruiter',
    recruiterPremiumCancel: 'premium_cancel_recruiter',
    createJob: 'create_job_recruiter',
    repostJob: 'repost_job_recruiter',
    createCompany: 'create_company_recruiter',

    // Errors
    cancelPremiumInvalidStateError: 'error_cancel_premium_invalid_state',
}