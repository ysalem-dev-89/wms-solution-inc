export interface SearchUser {
  filter: {
    id?: number;
    username?: string;
    email?: string;
  };
  attributes: string[];
}
