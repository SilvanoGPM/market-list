import React, { createContext, useContext, useMemo } from 'react';
import { DefaultTheme } from 'react-native-paper';
import { useStorage } from '../hooks/useStorage';

interface Color {
  name: string;
  gradient: string[];
  primary: string;
}

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
  });

  const value = useMemo(() => ({ color, setColor }), [color, setColor]);

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}

export function useColor(): ColorContextProps {
  return useContext(ColorContext);
}
