export type dispatch = (action: action) => user;

export type user = {
  id?: number;
  username?: string;
  email?: string;
  role?: string;
};

export type obj = {
  auth: {
    loggedIn?: boolean;
    user: user | null;
    checkedToken?: boolean;
  };
  dispatch?: dispatch;
};

export type action = {
  payload?: {
    user?: user;
    loggedIn?: boolean;
  };
  type: 'INITIALISE' | 'LOGIN' | 'LOGOUT';
};
