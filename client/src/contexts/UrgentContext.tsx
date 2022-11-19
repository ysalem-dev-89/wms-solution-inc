/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, createContext, ReactNode, FC } from 'react';
import { IStockAlert } from '../interfaces/AnalyticsInterface';

type Props = { children: ReactNode };

type IUrgentState = {
  urgent: IStockAlert[];
  setUrgent: (value: IStockAlert[]) => void;
};

const init = {
  urgent: [{ productid: 0, product: '', instock: 0, price: 0, discount: 0 }],
  setUrgent: () => {}
};

export const UrgentContext = createContext<IUrgentState>(init);

export const UrgentContextProvider: FC<Props> = ({ children }) => {
  const [urgent, setUrgent] = useState<IStockAlert[]>(init.urgent);

  return (
    <UrgentContext.Provider value={{ urgent: urgent, setUrgent: setUrgent }}>
      {children}
    </UrgentContext.Provider>
  );
};
