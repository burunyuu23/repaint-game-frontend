import {keycloakUrl} from "@/l5_shared/api/keycloak/keycloak";

const requestMapping = "/auth"

const loginMapping = "/login"
const refreshMapping = "/refresh"


export const loginUrl = `${keycloakUrl}${requestMapping}${loginMapping}`
export const refreshUrl = `${keycloakUrl}${requestMapping}${refreshMapping}`