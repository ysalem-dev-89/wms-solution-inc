/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, createContext, ReactNode, FC } from 'react';
import { IStockAlert } from '../interfaces/AnalyticsInterface';

type Props = { children: ReactNode };

type IUrgentState = {
  urgent: IStockAlert[];
  setUrgent: (value: IStockAlert[]) => void;
  urgentList: IStockAlert[];
  setUrgentList: (value: IStockAlert[]) => void;
};

const init = {
  urgent: [{ productid: 0, product: '', instock: 0, price: 0, discount: 0 }],
  setUrgent: () => {},
  urgentList: [
    { productid: 0, product: '', instock: 0, price: 0, discount: 0 }
  ],
  setUrgentList: () => {}
};

export const UrgentContext = createContext<IUrgentState>(init);

export const UrgentContextProvider: FC<Props> = ({ children }) => {
  const [urgent, setUrgent] = useState<IStockAlert[]>([]);
  const [urgentList, setUrgentList] = useState<IStockAlert[]>([]);

  return (
    <UrgentContext.Provider
      value={{
        urgent: urgent,
        setUrgent: setUrgent,
        urgentList: urgentList,
        setUrgentList: setUrgentList
      }}
    >
      {children}
    </UrgentContext.Provider>
  );
};
