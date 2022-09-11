type Props = {
    data: {
        x: number;
        y: number;
        id: number;
    }[]
}

const ChartBox = ({ data }: Props) => {
  return (
    <div className="chartBox">
        <p>
            {data.map((d) => (
                <p>{d.x}, {d.y}</p>
            ))}

        </p>
    </div>
  )
}

export default ChartBox