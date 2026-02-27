import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const pullDistance = Math.max(0, currentY - startY);
  const maxPullDistance = 100;
  const threshold = 60;
  const progress = Math.min(pullDistance / threshold, 1);

  useEffect(() => {
    if (pullDistance > 0 && !isRefreshing) {
      controls.set({ y: Math.min(pullDistance, maxPullDistance) });
    }
  }, [pullDistance, isRefreshing, controls]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0 && !isRefreshing) {
      setStartY(e.touches[0].clientY);
      setCurrentY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY > 0 && !isRefreshing) {
      setCurrentY(e.touches[0].clientY);
    }
  };

  const handleTouchEnd = async () => {
    if (startY > 0 && !isRefreshing) {
      if (pullDistance > threshold) {
        setIsRefreshing(true);
        controls.start({ y: threshold });
        await onRefresh();
        setIsRefreshing(false);
        controls.start({ y: 0 });
      } else {
        controls.start({ y: 0 });
      }
      setStartY(0);
      setCurrentY(0);
    }
  };

  return (
    <div 
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-full w-full"
    >
      <motion.div 
        className="absolute top-0 left-0 right-0 flex justify-center items-center h-16 -mt-16"
        animate={controls}
      >
        <div 
          className="bg-surface border border-white/10 rounded-full p-2 shadow-lg flex items-center justify-center"
          style={{ 
            opacity: progress,
            transform: `scale(${0.5 + progress * 0.5}) rotate(${progress * 180}deg)`
          }}
        >
          <RefreshCw className={`w-5 h-5 text-primary ${isRefreshing ? 'animate-spin' : ''}`} />
        </div>
      </motion.div>
      <motion.div animate={controls}>
        {children}
      </motion.div>
    </div>
  );
}
