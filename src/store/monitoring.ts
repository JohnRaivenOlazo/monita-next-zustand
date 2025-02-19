export interface MonitoringState {
  store: any;
  containers: any[];
  setContainers: () => Promise<void>;
}

export const createMonitoring = (props: { store: any }): MonitoringState => {
  return {
    store: props.store,
    containers: [],
    async setContainers() {
      console.log('Setting containers');
    }
  };
};

// This is important - export the function directly as default
export default (props: { store: any }) => createMonitoring(props);
