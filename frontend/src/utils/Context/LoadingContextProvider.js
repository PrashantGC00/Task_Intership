import { createContext, useState } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => {
    setLoading((prev) => !prev);
  };

  return (
    <LoadingContext.Provider value={{ loading, setLoading, toggleLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
