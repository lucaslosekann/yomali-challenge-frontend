import { useQuery } from '@tanstack/react-query'
import { useDashboardStatsContext } from '../contexts/DashboardStatsContext'
import { fetchStats } from '../lib/api'

export default function useStatsQuery() {
    const { dateRange, customDate, pageFilter } = useDashboardStatsContext()
    const query = useQuery({
        queryKey: ['stats', pageFilter, dateRange, customDate],
        queryFn: ({ signal }) => {
            return fetchStats(
                {
                    url: pageFilter || undefined,
                    dateRange,
                    startDate: customDate[0] || undefined,
                    endDate: customDate[1] || undefined,
                },
                signal,
            )
        },
        enabled:
            (dateRange === 'custom' &&
                customDate[0] != null &&
                customDate[1] != null) ||
            dateRange !== 'custom',
    })
    return query
}
