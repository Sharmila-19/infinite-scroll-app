import { useRef, useEffect, useState } from 'react';

function useInfiniteScroll(callback, hasMore) {
  const observer = useRef(null);
  const lastElementRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setIsIntersecting(true);
      } else {
        setIsIntersecting(false);
      }
    }, { threshold: 0.1 }); // Adjust threshold as needed

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore]);

  useEffect(() => {
    if (isIntersecting) {
      callback();
      setIsIntersecting(false); // Reset for next intersection
    }
  }, [isIntersecting, callback]);

  return { lastElementRef };
}

export default useInfiniteScroll;