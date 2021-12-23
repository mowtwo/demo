import { h } from "preact";
import { useEffect, useState, useContext } from "preact/hooks";
import { Link } from "preact-router/match";
import style from "./style";
import { PathContext } from "../../ctx/path";

const Header = () => {
  const _P = useContext(PathContext);
  const [demoName, setDemoName] = useState("Demo");
  useEffect(() => {
    setDemoName(_P.path.name);
  }, [_P]);
  return (
    <header class={style.header}>
      <h1>Demo大全 </h1>
      <nav>
        <Link activeClassName={style.active} href="/">
          Home
        </Link>
        <Link activeClassName={style.active} href="/about">
          About
        </Link>
        {_P.path.value.indexOf("/demo") === 0 ? (
          <Link activeClassName={style.active} href="/demo/:name">
            {demoName}
          </Link>
        ) : (
          ""
        )}
      </nav>
    </header>
  );
};

export default Header;
