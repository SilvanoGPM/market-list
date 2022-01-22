import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

type AnimationType = 'in' | 'out';

interface UseBackInAnimationProps {
  type?: AnimationType;
  duration?: number;
  delay?: number;
}

function getAnimationValue(value: number) {
  return useRef(new Animated.Value(value)).current;
}

export function useZoomAnimation({
  type = 'in',
  duration = 200,
  delay = 0,
}: UseBackInAnimationProps = {}) {
  const initialZoomValue = type === 'in' ? 0 : 1;
  const toValue = type === 'in' ? 1 : 0;

  const zoomAnimation = getAnimationValue(initialZoomValue);

  useEffect(() => {
    Animated.timing(zoomAnimation, {
      toValue,
      duration,
      delay: delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return {
    transform: [
      { scale: zoomAnimation },
    ],
  };
}
