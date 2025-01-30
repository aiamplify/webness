import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface InfiniteScrollProps {
  dataLength: number;
  next: () => void;
  hasMore: boolean;
  loader: ReactNode;
  children: ReactNode;
}

const InfiniteScroll = ({
  dataLength,
  next,
  hasMore,
  loader,
  children,
}: InfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        next();
      }
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasMore, next]);

  return (
    <div>
      {children}
      <div ref={lastElementRef}>{hasMore && loader}</div>
    </div>
  );
};

export default InfiniteScroll;
