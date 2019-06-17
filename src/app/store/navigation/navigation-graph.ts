import { RootAppState } from '../root-reducer';

const Page = {
  Root: '/',
  PersonForm: 'person',
  AddressForm: 'address',
  UserForm: 'user',
  Success: 'success',
  BeerForm: 'beer',
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

const personAgeUnder20 = (state: RootAppState) => state.forms.controls.person.controls.age.value < 20;

export const navigationGraph: NavGraph = {
  [Page.Root]: {
    next: Page.BeerForm,
  },
  [Page.PersonForm]: {
    next: state =>
      // Route to user if over 18
      personAgeUnder20(state)
        ? Page.UserForm
        : Page.AddressForm,
    prev: Page.BeerForm,
  },
  [Page.AddressForm]: {
    prev: Page.PersonForm,
    next: Page.Success,
  },
  [Page.UserForm]: {
    prev: Page.PersonForm,
    next: Page.Success,
  },
  [Page.BeerForm]: {
    prev: Page.Root,
    next: Page.PersonForm,
  }
};
