import { CalendarIcon } from 'lucide-react'
import { DateTime } from 'luxon'
import { useDashboardStatsContext } from '../contexts/DashboardStatsContext'
import { cn } from '../lib/utils'

export default function DateRangeSelector() {
    const { customDate, dateRange, setCustomDate, setDateRange } =
        useDashboardStatsContext()
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={() => setDateRange('24h')}
                    className={cn(
                        'px-4 py-2 text-sm font-medium rounded-md',
                        dateRange === '24h'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                    )}
                >
                    Last 24h
                </button>
                <button
                    onClick={() => setDateRange('7d')}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${dateRange === '7d' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                    Last 7 days
                </button>
                <button
                    onClick={() => setDateRange('30d')}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${dateRange === '30d' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                    Last 30 days
                </button>
                <button
                    onClick={() => setDateRange('custom')}
                    className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${dateRange === 'custom' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Custom period
                </button>
            </div>
            {dateRange === 'custom' && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="start-date"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="start-date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={
                                customDate[0]
                                    ? customDate[0].toISOString().split('T')[0]
                                    : ''
                            }
                            onChange={(e) =>
                                setCustomDate((old) => [
                                    e.target.value
                                        ? new Date(e.target.value)
                                        : null,
                                    old[1],
                                ])
                            }
                            max={DateTime.now().toFormat('YYYY-MM-DD')}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="end-date"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Final Date
                        </label>
                        <input
                            type="date"
                            id="end-date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={
                                customDate[1]
                                    ? customDate[1].toISOString().split('T')[0]
                                    : ''
                            }
                            onChange={(e) =>
                                setCustomDate((old) => [
                                    old[0],
                                    e.target.value
                                        ? new Date(e.target.value)
                                        : null,
                                ])
                            }
                            max={DateTime.now().toFormat('YYYY-MM-DD')}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
