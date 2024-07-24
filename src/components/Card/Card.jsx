import LazyLoad from 'react-lazyload';
import classes from './Card.module.css';

export default function Card({ data: { flags, name, population, region, capital } }) {
  const { common: countryName } = name;
  const formattedPopulation = population.toLocaleString('uk-UA');
  return (
    <li className={classes.Card}>
      <LazyLoad>
        <img className={classes.Card__Flag} src={flags.svg} alt={countryName} />
      </LazyLoad>
      <div className={classes.Card__Info}>
        <h2 className={classes.Card__Name}>{countryName}</h2>
        <p className={classes.Card__Population}>
          <b>Population</b>: {formattedPopulation}
        </p>
        <p className={classes.Card__Region}>
          <b>Region</b>: {region}
        </p>
        <p className={classes.Card__Capital}>
          <b>Capital</b>: {!capital ? 'N/A' : capital.length === 1 ? capital : capital.join(', ')}
        </p>
      </div>
    </li>
  );
}
