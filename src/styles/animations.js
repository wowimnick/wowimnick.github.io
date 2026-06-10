/** Shared Framer Motion presets for consistent entry animations site-wide. */

export const fadeUpInitial = { opacity: 0, y: 20 };
export const fadeUpAnimate = { opacity: 1, y: 0 };
export const viewportOnce = { once: true };

export const fadeUpTransition = (delay = 0) => ({
  duration: 0.5,
  delay,
  ease: 'easeOut',
});

export const fadeUpProps = (delay = 0, { inView = true } = {}) => ({
  initial: fadeUpInitial,
  ...(inView
    ? { whileInView: fadeUpAnimate, viewport: viewportOnce }
    : { animate: fadeUpAnimate }),
  transition: fadeUpTransition(delay),
});

export const staggerDelay = (index, base = 0) => index * 0.1 + base;

export const pageVariants = {
  initial: { opacity: 0, y: 12 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -8 },
};

export const pageTransition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.4,
};

export const carouselFadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export const carouselFadeTransition = {
  duration: 1.2,
  ease: 'easeInOut',
};

export const collapseTransition = {
  duration: 0.3,
  ease: 'easeOut',
};
