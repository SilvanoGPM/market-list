import { DefaultTheme } from 'react-native-paper';

const defaultColors: Record<string, Omit<Color, 'name'>> = {
  'purple-blue': {
    primary: DefaultTheme.colors.primary,
    gradient: [DefaultTheme.colors.accent, DefaultTheme.colors.primary],
    icon: '#ffffff',
  },

  'orange-blue': {
    primary: '#e67e22',
    gradient: ['#1abc9c', '#e67e22'],
    icon: '#ffffff',
  },

  'red-pink': {
    primary: '#d63031',
    gradient: ['#d63031', '#fd79a8'],
    icon: '#ffffff',
  },

  'green-yellow': {
    primary: '#6ab04c',
    gradient: ['#6ab04c', '#f6e58d'],
    icon: '#ffffff',
  },
};

export default defaultColors;
