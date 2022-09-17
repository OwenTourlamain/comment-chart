import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Label } from 'recharts';
import { DataPoint } from './Types'
 
type Props = {
    data: DataPoint[],
    onClick: Function,
}

const ChartBox = ({ data, onClick }: Props) => {
    function renderDot(props: any) {
        const x = props.cx;
        const y = props.cy;
        const commentCount = props.payload.commentCount;
        const key = props.payload.x;
        return (
            <svg key={key} className='chartDot' x={x - 20} y={y - 20} height={40} width={40}>
                <circle cx="20" cy="20" r="10" fill="blue"></circle>
                <text x="20" y="22" textAnchor="middle" alignmentBaseline="middle" fill="white">{commentCount}</text>
            </svg>
        )
    }

    return (
        <div className='chartBox'>
            <ResponsiveContainer width="90%">
                <LineChart data={data} onClick={(e) => onClick(e.activeLabel)} >
                    <Line type={"monotone"} dataKey={"y"} stroke={"#8884d8"} dot={renderDot}/>
                    <XAxis dataKey={"x"} />
                    <YAxis dataKey={"y"} />
                    <Label value="Test" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ChartBox