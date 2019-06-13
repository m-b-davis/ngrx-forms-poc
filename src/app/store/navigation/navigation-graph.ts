import { RootAppState } from '../rootReducer';

const Page = {
  Root: '/',
  PersonForm: 'person',
  AddressForm: 'address',
  UserForm: 'user',
  Success: 'success',
};

export const ROOT_PAGE = Page.Root;

type PageID = keyof typeof Page;

type NavGraph = {
  [key in PageID]?: NavNode;
};

interface NavNode {
  next?: NavRoute;
  prev?: NavRoute;
}

type NavRoute = PageID | ((state: RootAppState) => PageID);

export const navigationGraph: NavGraph = {
  [Page.Root]: {
    next: Page.PersonForm,
  },
  [Page.PersonForm]: {
    next: (state: RootAppState) =>
      // Route to user if over 18
      state.forms.controls.person.controls.age.value < 20
        ? Page.UserForm
        : Page.AddressForm,
    prev: Page.Root,
  },
  [Page.AddressForm]: {
    prev: Page.PersonForm,
    next: Page.Success,
  },
  [Page.UserForm]: {
    prev: Page.PersonForm,
    next: Page.Success,
  },
};
