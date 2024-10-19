import React from "react";

interface Auth {
  user: string | null;
  signIn: (data: any) => void;
  signOut: () => void;
}

interface State {
  user: string | null;
}

type Action = { type: "SIGN_IN"; user: string } | { type: "SIGN_OUT" };

const AuthContext = React.createContext<Auth>({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

const authReducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...prevState,
        user: action.user,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        user: null,
      };
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    user: null,
  });

  const value = React.useMemo(
    () => ({
      user: state.user,
      signIn: async (data: any) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", user: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
    }),
    [state.user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthContext;
