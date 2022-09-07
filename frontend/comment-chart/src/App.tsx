import React from 'react';
import './App.css';

import { Chart, AxisOptions } from 'react-charts'
 
type MyDatum = { date: number, stars: number }

function App() {
  const data = [ //TODO: source data as json from backend
    {
      label: 'React Charts',
      data: [
        {
          date: 1,
          stars: 1,
        },
        {
          date: 2,
          stars: 1000,
        },
        {
          date: 3,
          stars: 250,
        },
        {
          date: 4,
          stars: 750,
        },
      ],
    },
  ]

  const primaryAxis = React.useMemo(
    (): AxisOptions<MyDatum> => ({
      getValue: datum => datum.date,
    }),
    []
  )

  const secondaryAxes = React.useMemo(
    (): AxisOptions<MyDatum>[] => [
      {
        getValue: datum => datum.stars,
      },
    ],
    []
  )

  return (
    <div className="App">
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }} />
    </div>
  )
}


export default App;
