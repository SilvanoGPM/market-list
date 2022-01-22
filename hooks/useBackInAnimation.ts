import { useEffect, useRef, useState } from 'react';
import { Animated, ViewStyle } from 'react-native';

type AnimationDirection = 'left' | 'right' | 'top' | 'bottom';

interface UseBackInAnimationProps {
  direction?: AnimationDirection;
  delay?: number;
}

const directions = new Map<AnimationDirection, number>();

directions.set('left', 1000);
directions.set('right', -1000);
directions.set('top', -1000);
directions.set('bottom', 1000);

export function useBackInAnimation({
  direction = 'left',
  delay = 0,
}: UseBackInAnimationProps = {}): Animated.WithAnimatedObject<ViewStyle> {
  const backInInitialValue = directions.get(direction) || 0;

  const horizontalAnimation = direction === 'left' || direction === 'right';
  const backInAnimation = useRef(
    new Animated.ValueXY({
      x: horizontalAnimation ? backInInitialValue : 0,
      y: horizontalAnimation ? 0 : backInInitialValue,
    })
  ).current;

  const [opacityAnimation] = useState<Animated.Value>(new Animated.Value(0.5));
  const [scaleAnimation] = useState<Animated.Value>(new Animated.Value(0.8));

  useEffect(() => {
    const backIn = Animated.spring(backInAnimation, {
      toValue: 0,
      tension: 1000,
      friction: 40,
      delay,
      useNativeDriver: true,
    });

    const opacity = Animated.timing(opacityAnimation, {
      toValue: 1,
      delay,
      useNativeDriver: true,
    });

    const scale = Animated.timing(scaleAnimation, {
      toValue: 1,
      delay,
      useNativeDriver: true,
    });

    Animated.parallel([backIn, opacity, scale]).start();
  }, [backInAnimation, opacityAnimation, scaleAnimation, delay]);

  return {
    opacity: opacityAnimation,
    transform: [
      { translateX: backInAnimation.x },
      { translateY: backInAnimation.y },
      { scale: scaleAnimation },
    ],
  };
}
