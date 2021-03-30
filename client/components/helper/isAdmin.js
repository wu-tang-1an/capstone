import {getOrganizationRole} from '../../context/axiosService'

export default async function isAdmin(userId, orgId) {
  let admin = await getOrganizationRole(userId, orgId)

  return admin
}
