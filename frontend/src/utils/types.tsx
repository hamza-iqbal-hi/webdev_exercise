/**
 * ADD ALL TYPES USED IN APP HERE
 */

export type Skill = {
    id: Number,
    name: string,
}

export type User = {
    id: Number,
    name: string,
    skills: Skill[]

}