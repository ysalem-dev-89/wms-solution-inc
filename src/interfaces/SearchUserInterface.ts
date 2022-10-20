export interface SearchUser {
  filter: {
    id?: string;
    username?: string;
    email?: string;
  };
  attributes: string[];
}
