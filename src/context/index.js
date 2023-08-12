import React from "react";
export const UserContext = React.createContext();
const Provider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [isLogin, setIsLogin] = React.useState(1);

  return (
    <UserContext.Provider value={{ user, setUser, isLogin, setIsLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default Provider;
