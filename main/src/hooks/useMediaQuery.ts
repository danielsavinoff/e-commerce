import { useEffect, useState } from "react"

export function useMediaQuery(query: string) {
  const [isMatch, setIsMatch] = useState<boolean>(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    const onResize = () => setIsMatch(media.matches)
    setIsMatch(media.matches)

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [isMatch])

  return isMatch
}