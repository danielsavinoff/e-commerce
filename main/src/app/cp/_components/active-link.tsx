'use client'

import Link, { type LinkProps } from "next/link"

import { usePathname } from "next/navigation"
import React from "react"

export const ActiveLink = ({
  href,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps) => {
  const pathname = usePathname()

  return(
    <Link
      href={href}
      data-active={pathname === href}
      {...props}
    />
  )
}