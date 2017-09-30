import themes from 'enums/themes';
import * as mutationTypes from 'store/mutation-types';

const THEME_LOCAL_STORAGE_KEY = 'active-theme';

export default function({localStorageService}) {
  return {
    setTheme({commit}, themeId) {
      const id = themeId || localStorageService.getItem(THEME_LOCAL_STORAGE_KEY) || '1';
      const theme = themes[id];

      document.documentElement.style.setProperty('--color-primary', `var(--base-${theme.primaryColor})`);
      document.documentElement.style.setProperty('--color-secondary', `var(--base-${theme.secondaryColor})`);
      commit(mutationTypes.SET_THEME, theme.id);
      localStorageService.setItem(THEME_LOCAL_STORAGE_KEY, theme.id);
    }
  };
}
