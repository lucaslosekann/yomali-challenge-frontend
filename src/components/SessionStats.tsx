import {
    ClockIcon,
    GlobeIcon,
    MonitorIcon,
    MousePointerIcon,
} from 'lucide-react'
import useStatsQuery from '../queries/useStatsQuery'
import { formatDuration } from '../lib/utils'
import { StatItem } from './StatItem'

export function SessionStats() {
    const StatsQuery = useStatsQuery()
    const stats = StatsQuery.data?.sessionStats

    return (
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Session Statistics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatItem
                    icon={<ClockIcon className="h-4 w-4 text-purple-600" />}
                    label="Avg. Duration"
                    value={
                        stats ? formatDuration(stats.avgSessionDuration) : 'N/A'
                    }
                    color="bg-purple-100"
                />
                <StatItem
                    icon={<ClockIcon className="h-4 w-4 text-red-600" />}
                    label="Short Visits (< 1 min)"
                    value={
                        stats
                            ? `${stats.shortVisitPercentage.toFixed(1)}%`
                            : 'N/A'
                    }
                    color="bg-red-100"
                />
                <StatItem
                    icon={<GlobeIcon className="h-4 w-4 text-blue-600" />}
                    label="Top Browser"
                    value={
                        stats
                            ? `${stats.topBrowser.name} (${stats.topBrowser.percentage.toFixed(1)}%)`
                            : 'N/A'
                    }
                    color="bg-blue-100"
                />
                <StatItem
                    icon={<MonitorIcon className="h-4 w-4 text-green-600" />}
                    label="Top OS"
                    value={
                        stats
                            ? `${stats.topOS.name} (${stats.topOS.percentage.toFixed(1)}%)`
                            : 'N/A'
                    }
                    color="bg-green-100"
                />
            </div>
            <div className="mt-4">
                <div className="flex items-center">
                    <MousePointerIcon className="h-4 w-4 text-gray-600 mr-2" />
                    <h3 className="text-sm font-medium text-gray-700">
                        Top Referrer
                    </h3>
                </div>
                <p className="text-sm mt-1 bg-white p-2 rounded ">
                    {stats ? (
                        <>
                            <span className="italic">
                                {stats.topReferrer.name}
                            </span>{' '}
                            ({stats.topReferrer.percentage.toFixed(1)}%)
                        </>
                    ) : (
                        'N/A'
                    )}
                </p>
            </div>
        </div>
    )
}
