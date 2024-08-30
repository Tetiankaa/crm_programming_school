import { EUserRole } from '../enums'

export interface IManager {
    id: string
    name: string
    surname: string
    email: string
    is_active: boolean
    last_login: string
    user_role: EUserRole
}
