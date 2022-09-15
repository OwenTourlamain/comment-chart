import React from 'react'
import { AxisOptions, Chart } from 'react-charts'
 
type Props = {
    data: Series[],
    onClick: Function,
}

type Series = {
    label: string,
    data: DataPoint[],
}

type DataPoint = {
    x: number,
    y: number,
  }

const ChartBox = ({ data, onClick }: Props) => {
  
  const primaryAxis = React.useMemo(
    (): AxisOptions<DataPoint> => ({
      getValue: datum => datum.x,
    }),
    []
  )

  const secondaryAxes = React.useMemo(
    (): AxisOptions<DataPoint>[] => [
      {
        getValue: datum => datum.y,
      },
    ],
    []
  )

  return (
    <div className='chartBox'>
        <Chart
            options={{
                data,
                primaryAxis,
                secondaryAxes, 
                onClickDatum: (datum) => {onClick(datum?.index)},
            }}
        />
    </div>
  )
}

export default ChartBox