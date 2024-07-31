import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import MainLayout from "../../Layouts/MainLayout";
import BackButton from "../../components/BackButton/BackButton";
import classes from "./CountryPage.module.css";
import axios from "axios";
import LoadingGrid from "../../components/LoadingGrid/LoadingGrid";

export default function CountryPage() {
  const { cca3 } = useParams();

  const [country, setCountry] = useState(null);

  useEffect(() => {
    const storedCountries = JSON.parse(localStorage.getItem("countries"));

    if (storedCountries) {
      const targetCountry = storedCountries.find(
        (country) => country.cca3.toLowerCase() === cca3.toLowerCase()
      );
      if (targetCountry) {
        if (targetCountry.borders && targetCountry.borders.length > 0) {
          const borderCountries = targetCountry.borders.map((cca3) => {
            const borderCountry = storedCountries.find(
              (country) => country.cca3 === cca3
            );
            return borderCountry ? borderCountry.name.common : cca3;
          });

          setCountry({ ...targetCountry, borders: borderCountries });
        } else {
          // If the country doesn't have any border countries, set the borders property to an empty array
          setCountry({ ...targetCountry, borders: [] });
        }
      }
    }

    if (storedCountries === null || storedCountries.length === 0) {
      const fetchCountryData = async () => {
        try {
          const response = await axios.get(
            "https://restcountries.com/v3.1/alpha?codes=" + cca3.toUpperCase()
          );
          const fetchedCountry = response.data[0];
          if (fetchedCountry.borders && fetchedCountry.borders.length > 0) {
            const borderCountriesPromises = fetchedCountry.borders.map(
              async (cca3) => {
                try {
                  const borderCountryResponse = await axios.get(
                    `https://restcountries.com/v3.1/alpha?codes=${cca3.toUpperCase()}`
                  );
                  return borderCountryResponse.data[0]?.name?.common || cca3;
                } catch (error) {
                  console.error(error);
                  return cca3;
                }
              }
            );

            const borderCountries = await Promise.all(borderCountriesPromises);
            setCountry({ ...fetchedCountry, borders: borderCountries });
          } else {
            // If the country doesn't have any border countries, set the borders property to an empty array
            setCountry({ ...fetchedCountry, borders: [] });
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchCountryData();
    }
  }, [cca3]);

  const uniqueNativeNames = useMemo(() => {
    if (!country?.name.nativeName) return [];
    const names = Object.values(country.name.nativeName)
      .map((name) => name.common)
      .filter((name, index, self) => self.indexOf(name) === index); // remove duplicates
    return names.join(", ");
  }, [country]);

  const currencies = useMemo(() => {
    if (!country?.currencies) return [];
    const currencyNames = Object.values(country.currencies).map(
      (currency) => currency.name
    );
    return currencyNames.join(", ");
  }, [country]);

  const langs = useMemo(() => {
    if (!country?.languages) return [];
    const languages = Object.values(country.languages);
    return languages.join(", ");
  }, [country]);

  return (
    <MainLayout>
      <BackButton />
      {country ? (
        <section className={classes.CountryDescription}>
          <img
            src={country?.flags.svg}
            alt={country?.name.common}
            className={classes.CountryDescription__Flag}
          />
          <div className={classes.CountryDescription__Info}>
            <h2 className={classes.CountryDescription__Name}>
              {country?.name.common}
            </h2>
            <ul className={classes.CountryDescription__List}>
              <li className={classes.CountryDescription__NativeName}>
                <b>Native Name</b>: {uniqueNativeNames}
              </li>
              <li className={classes.CountryDescription__Population}>
                <b>Population</b>: {country?.population.toLocaleString("uk-UA")}
              </li>
              <li className={classes.CountryDescription__Region}>
                <b>Region</b>: {country?.region}
              </li>
              <li className={classes.CountryDescription__SubRegion}>
                <b>Sub Region</b>: {country?.subregion}
              </li>
              <li className={classes.CountryDescription__Capital}>
                <b>Capital</b>:{" "}
                {!country?.capital
                  ? "N/A"
                  : country.capital.length === 1
                  ? country.capital
                  : country.capital.join(", ")}
              </li>
              <li className={classes.CountryDescription__Domain}>
                <b>Top Level Domain</b>:{" "}
                {!country?.tld
                  ? "N/A"
                  : country.tld.length === 1
                  ? country.tld
                  : country.tld.join(", ")}
              </li>
              <li className={classes.CountryDescription__Currencies}>
                <b>Currencies</b>: {currencies}
              </li>
              <li className={classes.CountryDescription__Langs}>
                <b>Languages</b>: {langs}
              </li>
            </ul>
            <ul className={classes.CountryDescription__BorderCountriesList}>
              <b>Border Countries</b>:{" "}
              {country?.borders.length < 1
                ? "N/A"
                : country.borders.length === 1
                ? country.borders
                : country.borders.join(", ")}
            </ul>
          </div>
        </section>
      ) : (
        <LoadingGrid />
      )}
    </MainLayout>
  );
}
