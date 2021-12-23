import { createContext } from "preact";
import { useReducer } from "preact/hooks";

export const PathContext = createContext({});

export const SET_PATH = "SET_PATH";
const reducer = (state, action) => {
  switch (action.type) {
    case SET_PATH:
      return action.path;
    default:
      return state;
  }
};

export const Path = (props) => {
  const [path, dispatch] = useReducer(reducer, {
    value: "/",
    name:""
  });
  return (
    <PathContext.Provider value={{ path, dispatch }}>
      {props.children}
    </PathContext.Provider>
  );
};
