import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts'
import { DateTime } from 'luxon'
import useStatsQuery from '../queries/useStatsQuery'
import { ChartTooltip, ChartTooltipContent } from './ui/chart'

export const description = 'An area chart with gradient fill'

export default function VisitsChart() {
    const StatsQuery = useStatsQuery()
    const [_overview, ...chartData] = StatsQuery.data?.statsPerDay || []
    return (
        <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={chartData.map((item) => ({
                        ...item,
                        date: DateTime.fromISO(item.day!).toFormat('dd LLL'),
                    }))}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="date"
                        tick={{
                            fontSize: 12,
                        }}
                        tickMargin={10}
                    />
                    <YAxis
                        tick={{
                            fontSize: 12,
                        }}
                        tickFormatter={(value) =>
                            new Intl.NumberFormat('en-US').format(value)
                        }
                    />
                    <ChartTooltip
                        cursor={false}
                        content={
                            <ChartTooltipContent
                                config={{
                                    total_visits: {
                                        label: 'Total Visits',
                                        color: 'var(--chart-2)',
                                    },
                                    total_unique: {
                                        label: 'Unique Visits',
                                        color: 'var(--chart-1)',
                                    },
                                }}
                            />
                        }
                    />
                    <Area
                        type="monotone"
                        dataKey="total_visits"
                        stroke="#10b981"
                        fill="#a7f3d0"
                        strokeWidth={2}
                        name="Total Visits"
                    />
                    <Area
                        type="monotone"
                        dataKey="total_unique"
                        stroke="#3b82f6"
                        fill="#93c5fd"
                        strokeWidth={2}
                        name="Unique Visits"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
