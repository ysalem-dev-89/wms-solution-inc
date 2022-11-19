/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, createContext, ReactNode, FC } from 'react';
import { IStockAlert } from '../interfaces/AnalyticsInterface';

type Props = { children: ReactNode };

type IUrgentState = {
  urgent: IStockAlert[];
  setUrgent: (value: IStockAlert[]) => void;
};

export const UrgentContext = createContext<any>(null);

export const UrgentContextProvider: FC<Props> = ({ children }) => {
  const [urgent, setUrgent] = useState<IUrgentState>({
    urgent: [{ productid: 0, product: '', instock: 0, price: 0, discount: 0 }],
    setUrgent: () => {}
  });

  return (
    <UrgentContext.Provider value={{ urgent: urgent, setUrgent: setUrgent }}>
      {children}
    </UrgentContext.Provider>
  );
};
