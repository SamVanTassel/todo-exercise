import type { LayoutServerLoad } from "./$types"
 
export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.auth()
  const { id: routeId } = event.route;
 
  return {
    session,
    routeId
  }
}