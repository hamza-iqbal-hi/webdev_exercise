/**
 * 
 * @returns API ENDPOINT
 */
export const getAPIEndpoint = () => {
    return `http://127.0.0.1:5000`
}

/**
 * 
 * @param skillName Name of skill entered by user
 * @returns true if name allowed
 */
export const isValidSkillName = (skillName: string) => {
    return skillName.length < 80;
}
