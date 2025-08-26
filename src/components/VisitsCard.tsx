import { EyeIcon, UsersIcon } from 'lucide-react'
import { useDashboardStatsContext } from '../contexts/DashboardStatsContext'
import useStatsQuery from '../queries/useStatsQuery'

const rangeTextMap = {
    '24h': 'in the last 24 hours',
    '7d': 'in the last 7 days',
    '30d': 'in the last 30 days',
    custom: 'in the selected range',
}

export function VisitsCard() {
    const { dateRange } = useDashboardStatsContext()
    const StatsQuery = useStatsQuery()
    const formattedUniqueVisits = new Intl.NumberFormat('pt-BR').format(
        StatsQuery.data?.statsPerDay[0]?.total_unique || 0,
    )
    const formattedTotalVisits = new Intl.NumberFormat('pt-BR').format(
        StatsQuery.data?.statsPerDay[0]?.total_visits || 0,
    )

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <UsersIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">
                            Unique Visits
                        </h3>
                        <div className="flex items-baseline">
                            <p className="text-2xl font-bold text-gray-800">
                                {StatsQuery.isPending
                                    ? '...'
                                    : formattedUniqueVisits}
                            </p>
                            <p className="ml-2 text-xs text-gray-600">
                                {rangeTextMap[dateRange]}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                        <EyeIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">
                            Total Visits
                        </h3>
                        <div className="flex items-baseline">
                            <p className="text-2xl font-bold text-gray-800">
                                {StatsQuery.isPending
                                    ? '...'
                                    : formattedTotalVisits}
                            </p>
                            <p className="ml-2 text-xs text-gray-600">
                                {rangeTextMap[dateRange]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
