function setInitialData() {
  return {
    data: {},
    isLoaded: false,
    isLoading: false,
  };
}

export default {
  dashboards: setInitialData(),
  widgets: setInitialData(),
};
