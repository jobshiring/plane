import { useRef, useEffect } from 'react'; // Importing React for component rendering

export default function useIsMountedRef() {
  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  return isMounted;
}
