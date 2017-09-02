function setInitialData() {
  return {
    data: {},
    isLoaded: false,
    isLoading: false,
  };
}

export default {
  isLoading: false,
  dashboards: setInitialData(),
  widgets: setInitialData(),
};
