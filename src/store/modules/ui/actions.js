import themes from 'enums/themes';
import DashboardsLayoutEnum from 'enums/dashboards-layout';
import * as mutationTypes from 'store/mutation-types';
import {error} from 'services/logger';

const THEME_LOCAL_STORAGE_KEY = 'active-theme';
const DASHBOARDS_LAYOUT_STORAGE_KEY = 'dashboards-layout';

export default function({localStorageService}) {
  return {
    setTheme({commit}, themeId) {
      const id = themeId || localStorageService.getItem(THEME_LOCAL_STORAGE_KEY) || '1';
      const theme = themes[id];

      document.documentElement.style.setProperty('--color-primary', `var(--base-${theme.primaryColor})`);
      document.documentElement.style.setProperty('--color-secondary', `var(--base-${theme.secondaryColor})`);
      commit(mutationTypes.SET_THEME, theme.id);
      localStorageService.setItem(THEME_LOCAL_STORAGE_KEY, theme.id);
    },

    setDashboardsLayout({commit}, dashboardLayoutId) {
      const layoutId = dashboardLayoutId ||
        localStorageService.getItem(DASHBOARDS_LAYOUT_STORAGE_KEY) ||
        DashboardsLayoutEnum.LIST;

      if (!DashboardsLayoutEnum.values.includes(layoutId)) {
        error(`[SET DASHBOARDS LAYOUT] "${layoutId}" is not a vaild enum value`);
        return;
      }

      localStorageService.setItem(DASHBOARDS_LAYOUT_STORAGE_KEY, layoutId);
      commit(mutationTypes.SET_DASHBOARDS_LAYOUT, layoutId);
    }
  };
}
