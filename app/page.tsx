'use client'

import { fetchCars } from "@utils";
import { HomeProps } from "@types";
import { fuels, yearsOfProduction } from "@constants";
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@components";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home({ searchParams }: HomeProps) {

  const [ allCars, setAllCars ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  // now search states

  const [ manufacturer, setManuFacturer ] = useState('');
  const [ model, setModel ] = useState('');
  
  // now filter states
  const [ fuel, setFuel ] = useState('');
  const [ year, setYear ] = useState(2022);

  // now pagination states
  const [ limit, setLimit ] = useState(10);

  const getCars = async () => {
    try {

      const result = await fetchCars({ 
        manufacturer: manufacturer || '',
        model: model || '', 
        fuel: fuel || '',
        year: year || 2022,
        limit: limit || 10
      });
      
      setAllCars(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log( fuel, year, limit, manufacturer, model )
    getCars();
  }, [manufacturer, model, fuel, year, limit]);

  // under in the [] of useEffect, we have the states that will trigger the useEffect, or simply we are checking changes in these states


  

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar
            setManuFacturer={setManuFacturer}
            setModel={setModel}
          />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} setFilter={setFuel}/>
            <CustomFilter title='year' options={yearsOfProduction} setFilter={setYear}/>
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image 
                  src={'/loader.svg'}
                  alt='loader'
                  width={50}
                  height={50}
                  className="obejct-contain"
                />
              </div>
            )}

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
