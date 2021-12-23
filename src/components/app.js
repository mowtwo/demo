import { h, Component } from "preact";
import { getCurrentUrl, Router } from "preact-router";

import Header from "./header";

// Code-splitting is automated for routes
import Home from "../routes/home";
import About from "../routes/about";
import Demo from "../routes/demo";
import OpenFilePicker from "../routes/demo/openFilePicker";
import { PathContext, SET_PATH } from "../ctx/path";
import { useCallback, useContext, useState } from "preact/hooks";

const routeMatch = [
  {
    path: "openFileSystem",
    name: "打开文件系统",
    Comp: OpenFilePicker,
  },
];

export default () => {
  const { dispatch: dispatchPath } = useContext(PathContext);
  const handleRoute = useCallback((e) => {
    const c = getCurrentUrl();
    dispatchPath({
      type: SET_PATH,
      path: {
        value: c,
        name:
          c.indexOf("/demo") === 0
            ? routeMatch.find((fi) => fi.path === c.replace("/demo/", ""))
                .name || ""
            : undefined,
      },
    });
  }, []);
  return (
    <div id="app">
      <Header />
      <Router onChange={handleRoute}>
        <Home path="/" routeMatch={routeMatch} />
        <About path="/about" />
        <Demo path="/demo" />
        {routeMatch.map(({ path, Comp }) => {
          return <Comp path={`/demo/${path}`} key={path} />;
        })}
      </Router>
    </div>
  );
};
