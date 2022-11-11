/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, createContext, ReactNode, FC, useContext } from 'react';

type Props = { children: ReactNode };

export type LoadingType = { 0: boolean; 1: boolean; 2: boolean; 3: boolean };

type LoadingState = {
  isLoading: LoadingType;
  setIsLoading: (c: LoadingType) => void;
  setLoadingValue: (index: number, value: boolean) => void;
};

const init = {
  isLoading: { 0: false, 1: false, 2: false, 3: false },
  setIsLoading: (c: LoadingType) => c,
  setLoadingValue: (index: number, value: boolean) => {}
};

export const LoadingContext = createContext<LoadingState>({
  isLoading: init.isLoading,
  setIsLoading: init.setIsLoading,
  setLoadingValue: init.setLoadingValue
});

export const LoadingContextProvider: FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<LoadingType>(init.isLoading);

  const setLoadingValue = (index: number, value: boolean) => {
    setIsLoading({ ...isLoading, [index]: value });
  };

  return (
    <LoadingContext.Provider
      value={{ isLoading, setIsLoading, setLoadingValue }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
