export const pendingState = (state: any) => {
  state.isLoading = true;
  state.isError = false;
  state.isFetched = false;
};

export const fulfilledState = (state: any) => {
  state.isLoading = false;
  state.isError = false;
  state.isFetched = true;
};

export const rejectedState = (state: any) => {
  state.isLoading = false;
  state.isError = true;
  state.isFetched = true;
};
