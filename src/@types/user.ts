export interface User {
    _id: string
    email: string
    password: string
    emailVerified: boolean
    verificationToken?: string
    resetToken?: string
    resetTokenExpiration?: number
    personalData: {
        firstName: string
        lastName: string
        birthDate?: Date
        gender?: string
        paisCode?: string
        phone?: string
        nationality?: string
        additionalCitizenship?: string[]
        currentCity?: string
        minorityGroups?: Array<
            | 'Católico'
            | 'Judío'
            | 'LGBT'
            | 'Afrodescendiente'
            | 'Migrante y/o Refugiado'
        >
    }
    academicData?: Array<{
        institution?: string
        degree?: string
        discipline?: string
        startMonth?: number
        startYear?: number
        endMonth?: number
        endYear?: number
    }>
    workData?: {
        jobExperience?: string
    }
    hobbies?: string[]
    languages?: Array<{
        language?: string
        level?: string
    }>
    socialMedia?: {
        linkedin?: string
        instagram?: string
        twitter?: string
    }
    scholarshipProfile?: {
        areasOfInterest?: string[]
        regionsOfInterest?: string[]
        countriesOfInterest?: string[]
        scholarshipTypes?: string[]
        startDate?: Date
        economicVulnerability?: boolean
        researchTopics?: string[]
    }
    role: string
    createdAt?: Date
    updatedAt?: Date
}
