import { h } from "preact";
import { Link } from "preact-router";
import style from "./style";

const Home = (props) => (
  <div class={style.home}>
    <h1>Home</h1>
    <p>
      <ol>
        {props.routeMatch.map(({ path, name }) => {
          return (
            <li key={path}>
              <Link href={`/demo/${path}`}>{name || path}</Link>
            </li>
          );
        })}
      </ol>
    </p>
  </div>
);

export default Home;
