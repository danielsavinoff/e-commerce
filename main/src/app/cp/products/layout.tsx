export default async function AdminProductPageLayout({
  children,
  modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return(
    <>
      {children}
      {modal}
    </>
  )
}