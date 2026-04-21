'use client'

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'motion/react';
import { Quote } from 'lucide-react';

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company: string;
  result: string;
  img: string;
}

interface TestimonialCarouselProps {
  items: TestimonialItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring' as const, stiffness: 300, damping: 30 };

interface CarouselItemProps {
  item: TestimonialItem;
  index: number;
  itemWidth: number;
  trackItemOffset: number;
  x: ReturnType<typeof useMotionValue<number>>;
  transition: typeof SPRING_OPTIONS | { duration: number };
}

function TestimonialCard({ item, index, itemWidth, trackItemOffset, x, transition }: CarouselItemProps) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      className="relative shrink-0 flex flex-col overflow-hidden cursor-grab active:cursor-grabbing"
      style={{
        width: itemWidth,
        height: '100%',
        rotateY: rotateY,
        borderRadius: 24,
      }}
      transition={transition}
    >
      <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-white/[0.02] h-full flex flex-col justify-between group hover:border-acid/20 transition-all duration-500 relative">
        {/* Quote Icon Background */}
        <div className="absolute top-4 right-6 text-white/5">
          <Quote size={56} strokeWidth={1} />
        </div>

        <div>
          <div className="mb-6 flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10 group-hover:border-acid/30">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-display text-base text-white">{item.name}</div>
              <div className="font-mono text-[9px] uppercase text-paper/40 tracking-widest">{item.role}, {item.company}</div>
            </div>
          </div>

          <p className="text-paper/70 text-sm leading-relaxed font-light mb-6 italic">
            &ldquo;{item.quote}&rdquo;
          </p>
        </div>

        <div className="pt-5 border-t border-white/5 flex items-center justify-between">
          <div>
            <div className="font-mono text-[8px] uppercase text-paper/30 tracking-widest mb-1">Measured Outcome</div>
            <div className="font-display text-base text-white group-hover:text-acid transition-colors">{item.result}</div>
          </div>
          <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-acid group-hover:border-acid group-hover:text-ink transition-all">
            <span className="text-xs">→</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialCarousel({
  items,
  baseWidth = 320,
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnHover = true,
  loop = true,
}: TestimonialCarouselProps) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState<number>(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return;
    const container = containerRef.current;
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return;
    if (pauseOnHover && isHovered) return;
    const timer = setInterval(() => {
      setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => setIsAnimating(true);

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) { setIsAnimating(false); return; }
    const lastCloneIndex = itemsForRender.length - 1;
    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false); });
      return;
    }
    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false); });
      return;
    }
    setIsAnimating(false);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD ? 1
      : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD ? -1
      : 0;
    if (direction === 0) return;
    setPosition(prev => {
      const next = prev + direction;
      return Math.max(0, Math.min(next, itemsForRender.length - 1));
    });
  };

  const dragProps = loop ? {} : {
    dragConstraints: {
      left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
      right: 0,
    }
  };

  const activeIndex = items.length === 0 ? 0
    : loop ? (position - 1 + items.length) % items.length
    : Math.min(position, items.length - 1);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden p-4 pb-12 rounded-[24px]"
      style={{ width: `${baseWidth}px`, height: '480px' }}
    >
      <motion.div
        className="flex h-full"
        drag={isAnimating ? false : 'x'}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <TestimonialCard
            key={`${item.name}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>

      {/* Dots */}
      <div className="flex w-full justify-center mt-4">
        <div className="flex gap-2">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className="h-1.5 rounded-full cursor-pointer"
              animate={{
                width: activeIndex === index ? 24 : 6,
                backgroundColor: activeIndex === index ? '#EAB308' : 'rgba(255,255,255,0.2)',
              }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.25 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
