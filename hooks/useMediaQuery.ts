import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);
    const updateMatches = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set initial value
    setMatches(mediaQueryList.matches);

    // Add listener (support both modern and older browsers)
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", updateMatches);
    } else {
      mediaQueryList.addListener(updateMatches);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", updateMatches);
      } else {
        mediaQueryList.removeListener(updateMatches);
      }
    };
  }, [query]);

  return matches;
}
