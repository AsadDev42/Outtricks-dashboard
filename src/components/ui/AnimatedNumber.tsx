import React, { useRef, useState } from 'react';
import { useGSAP, gsap } from '../../lib/gsap';

export interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  formatter?: (val: number) => string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 0.8,
  className = '',
  formatter,
}) => {
  const safeValue = typeof value === 'number' && !isNaN(value) && isFinite(value) ? value : Number(value) || 0;

  const formatRaw = (n: number) => {
    try {
      return n.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    } catch {
      return String(n);
    }
  };

  const [displayValue, setDisplayValue] = useState<string>(() => {
    if (formatter) return formatter(safeValue);
    return `${prefix}${formatRaw(safeValue)}${suffix}`;
  });

  const numberRef = useRef<HTMLSpanElement>(null);
  const tweenObj = useRef<{ current: number }>({ current: 0 });

  useGSAP(
    () => {
      gsap.to(tweenObj.current, {
        current: safeValue,
        duration: duration,
        ease: 'power2.out',
        onUpdate: () => {
          const val = tweenObj.current.current;
          if (formatter) {
            setDisplayValue(formatter(val));
          } else {
            setDisplayValue(`${prefix}${formatRaw(val)}${suffix}`);
          }
        },
      });
    },
    { dependencies: [safeValue, duration, decimals, prefix, suffix], scope: numberRef }
  );

  return (
    <span ref={numberRef} className={className}>
      {displayValue}
    </span>
  );
};