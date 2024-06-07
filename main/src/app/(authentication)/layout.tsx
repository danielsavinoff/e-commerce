export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return(
    <div className="w-full min-h-dvh flex items-center">
      {children}
    </div>
  )
}