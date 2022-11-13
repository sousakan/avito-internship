import { useEffect, useState } from 'react';

export default function useOnScreen(
  ref: React.MutableRefObject<HTMLElement | null>,
  rootMargin = '0px'
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    let observerRefValue: HTMLElement | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);

        if (entry.isIntersecting) observer.unobserve(ref.current!);
      },
      {
        rootMargin,
      }
    );

    if (ref.current) {
      observerRefValue = ref.current;
      observer.observe(ref.current);
    }

    return () => {
      if (observerRefValue) observer.unobserve(observerRefValue);
    };
  }, [ref, rootMargin]);
  return isIntersecting;
}
