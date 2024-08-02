import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import classes from "./Card.module.css";

export default function Card({
  data: { flags, name, population, region, capital, cca3 },
  renderReason,
}) {
  const { common: countryName } = name;
  const formattedPopulation = population.toLocaleString("uk-UA");
  return (
    <li className={classes.Card}>
      {renderReason === "search" ? (
        <Link to={`/${cca3.toLowerCase()}`}>
          <img
            className={classes.Card__Flag}
            src={flags.svg}
            alt={countryName}
          />
        </Link>
      ) : (
        <LazyLoad>
          <Link to={`/${cca3.toLowerCase()}`}>
            <img
              className={classes.Card__Flag}
              src={flags.svg}
              alt={countryName}
            />
          </Link>
        </LazyLoad>
      )}
      <div className={classes.Card__Info}>
        <h2 className={classes.Card__Name}>
          <Link to={`/${cca3.toLowerCase()}`}>{countryName}</Link>
        </h2>
        <p className={classes.Card__Population}>
          <b>Population</b>: {formattedPopulation}
        </p>
        <p className={classes.Card__Region}>
          <b>Region</b>: {region}
        </p>
        <p className={classes.Card__Capital}>
          <b>Capital</b>:{" "}
          {!capital
            ? "N/A"
            : capital.length === 1
            ? capital
            : capital.join(", ")}
        </p>
      </div>
    </li>
  );
}
