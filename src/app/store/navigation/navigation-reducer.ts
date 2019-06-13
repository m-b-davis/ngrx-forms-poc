import { ROOT_PAGE } from './navigation-graph';

export const NEXT_STEP = 'NEXT_STEP' as 'NEXT_STEP';
export const PREV_STEP = 'PREV_STEP' as 'PREV_STEP';
export const SET_PAGE = 'SET_PAGE' as 'SET_PAGE';
export const PAGE_SET = 'PAGE_SET' as 'PAGE_SET';
export const FORCE_HMR_UI_RELOAD = 'FORCE_HMR_UI_RELOAD' as 'FORCE_HMR_UI_RELOAD';

export const RESTART_NAVIGATION = 'RESTART_NAVIGATION' as 'RESTART_NAVIGATION';

export const nextStep = () => ({
  type: NEXT_STEP,
});

export const setPage = (pageId: string) => ({
  type: SET_PAGE,
  payload: pageId,
});

export const pageSet = (pageId?: string) => ({
  type: PAGE_SET,
  payload: pageId,
});

export const prevStep = () => ({
  type: PREV_STEP,
});

export const restartNavigation = () => ({
  type: RESTART_NAVIGATION,
});

export const initialState = {
  pageId: ROOT_PAGE,
};

export const forceHMRUiReload = () => ({
  type: FORCE_HMR_UI_RELOAD,
});

type NavigationState = typeof initialState;

export type NavigationAction = ReturnType<
  typeof nextStep
  | typeof prevStep
  | typeof setPage
  | typeof pageSet
  | typeof forceHMRUiReload
>;

export default (state: NavigationState = initialState, action: NavigationAction): NavigationState => {
  console.log({ action });

  switch (action.type) {

    case PAGE_SET: {
      return action.payload ? { ...state, pageId: action.payload } : { ...state };
    }

    case FORCE_HMR_UI_RELOAD: {
      return { ...state };
    }

    default: return state;
  }
};
