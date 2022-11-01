import { useState, createContext, ReactNode, FC } from 'react';

type Props = { children: ReactNode };

type Pages = { title: string; link: string }[];
type PagesState = {
  pages: Pages;
  setPages: (c: Pages) => void;
};

const init = {
  pages: [{ title: 'Dashboard', link: '' }],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPages: () => {}
};

export const PageContext = createContext<PagesState>({
  pages: init.pages,
  setPages: init.setPages
});

export const PageContextProvider: FC<Props> = ({ children }) => {
  const [pages, setPages] = useState<Pages>(init.pages);

  return (
    <PageContext.Provider value={{ pages: pages, setPages: setPages }}>
      {children}
    </PageContext.Provider>
  );
};
