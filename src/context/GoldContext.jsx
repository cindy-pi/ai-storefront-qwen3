import React, { createContext, useContext, useEffect, useState } from 'react';

const GoldContext = createContext();

export const useGold = () => {
  const context = useContext(GoldContext);
  if (!context) {
    throw new Error('useGold must be used within a GoldProvider');
  }
  return context;
};

export const GoldProvider = ({ children }) => {
  const [balance, setBalance] = useState(1000);

  useEffect(() => {
    const savedBalance = localStorage.getItem('fizban_gold_balance');
    if (savedBalance) {
      setBalance(parseInt(savedBalance));
    } else {
      localStorage.setItem('fizban_gold_balance', '1000');
    }
  }, []);

  const deductGold = (amount) => {
    if (balance >= amount) {
      const newBalance = balance - amount;
      setBalance(newBalance);
      localStorage.setItem('fizban_gold_balance', newBalance.toString());
      return true;
    }
    return false;
  };

  const resetBalance = () => {
    setBalance(1000);
    localStorage.setItem('fizban_gold_balance', '1000');
  };

  const value = {
    balance,
    deductGold,
    resetBalance
  };

  return (
    <GoldContext.Provider value={value}>
      {children}
    </GoldContext.Provider>
  );
};