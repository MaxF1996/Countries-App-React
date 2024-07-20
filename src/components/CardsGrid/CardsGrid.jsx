import classes from './CardsGrid.module.css';
import Card from '../Card/Card';
import LoadingGrid from '../LoadingGrid/LoadingGrid';
import { useState, useEffect } from 'react';

import axios from 'axios';

export default function CardsGrid() {
  const [data, setData] = useState(() => JSON.parse(localStorage.getItem('countries')) || []);

  useEffect(() => {
    const fetchData = async () => {
      const storedDate = JSON.parse(localStorage.getItem('date'));

      if (!storedDate || !isWithin3Days(new Date(storedDate))) {
        try {
          const response = await axios.get('https://restcountries.com/v3.1/all');
          const sortedData = response.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
          storeDataAndDate(sortedData);
          setData(sortedData);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [data]);

  const isWithin3Days = (date) => {
    const today = new Date();
    const diffTime = Math.abs(today - date);
    return diffTime <= 3 * 24 * 60 * 60 * 1000;
  };

  const storeDataAndDate = (countries) => {
    localStorage.setItem('countries', JSON.stringify(countries));
    localStorage.setItem('date', JSON.stringify(new Date()));
  };

  return (
    <section className={classes.CardsGrid}>
      <ul className={classes.CardsGrid__List}>
        {data.length > 0 ? data.map((card) => <Card key={card.name.common} data={card} />) : <LoadingGrid />}
      </ul>
    </section>
  );
}
