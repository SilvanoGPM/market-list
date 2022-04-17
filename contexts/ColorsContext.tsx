import React, { createContext, useContext, useMemo } from 'react';
import { DefaultTheme } from 'react-native-paper';
import { useStorage } from '../hooks/useStorage';

import { Color } from '../@types/general.types';

interface ColorContextProps {
  color: Color;
  setColor: (color: Color) => void;
}

interface ColorProviderProps {
  children: React.ReactNode;
}

export const ColorContext = createContext<ColorContextProps>(
  {} as ColorContextProps
);

const COLOR_KEY = '@SkyG0D/Color';

export function ColorProvider({ children }: ColorProviderProps): JSX.Element {
  const [color, setColor] = useStorage<Color>(COLOR_KEY, {
    name: 'purple-blue',
    primary: DefaultTheme.colors.primary,
    gradient: [DefaultTheme.colors.accent, DefaultTheme.colors.primary],
    icon: '#ffffff',
  });

  const value = useMemo(() => ({ color, setColor }), [color, setColor]);

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}

export function useColor(): ColorContextProps {
  return useContext(ColorContext);
}
