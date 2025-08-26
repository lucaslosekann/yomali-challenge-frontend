import { createFileRoute } from '@tanstack/react-router'
import DateRangeSelector from '../components/DateRangeSelector'
import PageFilter from '../components/PageFilter'
import { VisitsCard } from '../components/VisitsCard'
import VisitsChart from '../components/VisitsChart'
import TopPagesTable from '../components/TopPagesTable'
import { SessionStats } from '../components/SessionStats'

export const Route = createFileRoute('/')({
    component: App,
})

function App() {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                    Analytics Dashboard
                </h1>
                <div className="grid grid-cols-1 gap-6 mb-6">
                    <div className="lg:col-span-3">
                        <DateRangeSelector />
                    </div>
                    <div className="lg:col-span-3">
                        <PageFilter />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 mb-6">
                    <VisitsCard />
                    <div className="lg:col-span-2">
                        <SessionStats />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
                        <h2 className="text-lg font-semibold mb-4">
                            Visits Over Time
                        </h2>
                        <VisitsChart />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
                        <h2 className="text-lg font-semibold mb-4">
                            Top Pages
                        </h2>
                        <TopPagesTable />
                    </div>
                </div>
            </div>
        </div>
    )
}
