"use client"

import { cn } from "@/lib/utils"

const PageHead = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn([
      "flex flex-col border-b border-border",
      className
    ])}
    {...props}
  />
)

const PageHeader =  ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn([
      "my-8 space-y-4",
      className
    ])}
    {...props}
  />
)

const PageTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 
    className={cn([
      'flex text-3xl font-bold text-primary',
      className
    ])}
    {...props}
  />
)

const PageDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p 
    className={cn([
      "text-muted-foreground text-base",
      className
    ])}
    {...props}
  />
)

export { PageHeader, PageTitle, PageDescription, PageHead }