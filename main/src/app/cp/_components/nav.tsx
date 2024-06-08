import { cn } from "@/lib/utils"

const Navbar = ({
  className,
  ...props
}: React.ComponentProps<'header'>) => (
  <header
    className={cn([
      'w-full h-16 flex items-center px-4 bg-background border-b border-border',
      className
    ])}
    {...props}
  />
)

const Nav = ({
  className,
  underlineActiveLink,
  ...props
}: React.ComponentProps<'nav'> & { underlineActiveLink?: boolean }) => (
  <nav
    className={cn([
      'flex items-center *:box-border *:px-4 *:py-3 text-foreground/60 [&>*:hover]:text-foreground/80 [&>[data-active=true]]:text-primary *:transition-colors',
      underlineActiveLink && '*:border-b-2 *:border-b-transparent [&>[data-active=true]]:border-primary',
      className
    ])}
    {...props}
  />
)

export { Navbar, Nav }