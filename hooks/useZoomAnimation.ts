import { useEffect, useState } from 'react';
import { Animated, ViewStyle } from 'react-native';

type AnimationType = 'in' | 'out';

interface UseBackInAnimationProps {
  type?: AnimationType;
  duration?: number;
  delay?: number;
}

export function useZoomAnimation({
  type = 'in',
  duration = 200,
  delay = 0,
}: UseBackInAnimationProps = {}): Animated.WithAnimatedObject<ViewStyle> {
  const initialZoomValue = type === 'in' ? 0 : 1;
  const toValue = type === 'in' ? 1 : 0;

  const [zoomAnimation] = useState<Animated.Value>(
    new Animated.Value(initialZoomValue)
  );

  useEffect(() => {
    Animated.timing(zoomAnimation, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, [duration, delay, toValue, zoomAnimation]);

  return {
    transform: [{ scale: zoomAnimation }],
  };
}
