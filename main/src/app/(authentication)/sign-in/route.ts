import { signIn } from "@/auth"

export async function GET() {
  return Response.redirect(await signIn('keycloak'))
}