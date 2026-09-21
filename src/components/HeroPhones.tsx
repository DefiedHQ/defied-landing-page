'use client';

import { m } from 'framer-motion';
import { PhoneFrame } from '@/components/PhoneFrame';
import { HeroWalletCard } from '@/components/HeroWalletCard';

/*
 * HeroPhones - the product on two phones: the wallet (front, right) and
 * the markets view (behind, left), fanned like a product shot. The cluster
 * is laid out at a fixed size and scaled per breakpoint in CSS; on phones
 * only the front device shows, upright.
 *
 * The two feeds tick on offset timers so the eye has one thing to follow
 * at a time. Entrance is one settle-in (opacity + y), then the feeds run.
 * Reduced motion is handled by MotionConfig in CdsProvider (it drops the
 * transform); branching on useReducedMotion here would render differently
 * on the server and the client and break hydration.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroPhones() {
  const entrance = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [...EASE] },
  });

  return (
    <div className="hero-phones">
      <div className="hero-phones-stage">
        {/* className is not typed on m.* (framer-motion 10 + React 19 types),
            so the plain div positions and the motion div only animates */}
        <div className="hero-phone hero-phone--back">
          <m.div {...entrance(0.25)}>
            <PhoneFrame>
              <HeroWalletCard variant="markets" visibleRows={4} tickOffsetMs={1700} />
            </PhoneFrame>
          </m.div>
        </div>
        <div className="hero-phone hero-phone--front">
          <m.div {...entrance(0.1)}>
            <PhoneFrame>
              <HeroWalletCard variant="wallet" visibleRows={4} />
            </PhoneFrame>
          </m.div>
        </div>
      </div>
    </div>
  );
}
