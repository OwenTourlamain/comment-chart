import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Label } from 'recharts';
 
type Props = {
    data: DataPoint[],
    onClick: Function,
}

type DataPoint = {
    x: number,
    y: number,
    commentCount: number
  }

const ChartBox = ({ data, onClick }: Props) => {
    return (
        <div className='chartBox'>
            <ResponsiveContainer width="90%">
                <LineChart data={data} onClick={(e) => onClick(e.activeLabel)} >
                    <Line type={"monotone"} dataKey={"y"} stroke={"#8884d8"} />
                    <XAxis dataKey={"x"} />
                    <YAxis dataKey={"y"} />
                    <Label value="Test" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ChartBox