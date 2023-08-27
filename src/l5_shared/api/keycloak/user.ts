import {keycloakUrl} from "@/l5_shared/api/keycloak/keycloak";

const requestMapping = "/user"

const createUserMapping = "/create"


export const createUserUrl = `${keycloakUrl}${requestMapping}${createUserMapping}`