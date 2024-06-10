import { signOut } from "@/auth"

export async function GET() {
  return Response.redirect(
    await signOut({ 
      redirect: false
  }).then(object => object.redirect))
}