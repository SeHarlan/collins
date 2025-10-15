import { cn } from '@/lib/utils/ui-utils';
import { motion, Variants } from 'motion/react';
import { FC } from 'react';

interface AnimatedIconProps {
  className?: string;
}

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (d: number) => {
    const delay = d;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1.75, bounce: 0.75 },
        opacity: { delay, duration: 0.02 },
      },
    };
  },
};
export const AnimatedXIcon: FC<AnimatedIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('lucide lucide-x-icon lucide-x', className)}
    >
      <motion.path
        d="M18 6 6 18"
        variants={draw}
        custom={0}
        initial={'hidden'}
        animate={'visible'}
        exit={'hidden'}
      />
      <motion.path
        d="m6 6 12 12"
        variants={draw}
        custom={0.2}
        initial={'hidden'}
        animate={'visible'}
        exit={'hidden'}
      />
    </svg>
  );
};

export const AnimatedMenuIcon: FC<AnimatedIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('lucide lucide-menu-icon lucide-menu', className)}
    >
      <motion.path
        d="M4 5h16"
        variants={draw}
        custom={0}
        initial={'hidden'}
        animate={'visible'}
        exit={'hidden'}
      />
      <motion.path
        d="M4 12h16"
        variants={draw}
        custom={0.1}
        initial={'hidden'}
        animate={'visible'}
        exit={'hidden'}
      />
      <motion.path
        d="M4 19h16"
        variants={draw}
        custom={0.2}
        initial={'hidden'}
        animate={'visible'}
        exit={'hidden'}
      />
    </svg>
  );
};
