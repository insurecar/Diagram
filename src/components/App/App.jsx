import "./App.scss";
import { Chart } from "../Chart/Chart";

export const App = () => {
  return (
    <div className="box">
      <div className="menu">Diagram</div>
      <div className="content">
        <Chart />
      </div>
      <div className="footer">
        <a href="https://geniusee.com/">
          <img
            src="https://ik.imagekit.io/k0jemnbco/Group_7.svg"
            width="124"
            height="30"
            alt="Geniusee logo"
          ></img>
        </a>
      </div>
    </div>
  );
};
