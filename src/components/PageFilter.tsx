import { SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDashboardStatsContext } from '../contexts/DashboardStatsContext'

export default function PageFilter() {
    const { setPageFilter, pageFilter } = useDashboardStatsContext()
    const [filter, setFilter] = useState(pageFilter)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPageFilter(filter)
        }, 500)

        return () => {
            clearTimeout(timeout)
        }
    }, [filter])

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm h-full">
            <label
                htmlFor="page-filter"
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                Filter by page
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    id="page-filter"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="/home, /about, etc."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
        </div>
    )
}
