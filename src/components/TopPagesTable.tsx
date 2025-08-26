import clsx from 'clsx'
import { useState } from 'react'
import useStatsQuery from '../queries/useStatsQuery'
import SessionDetailsModal from './SessionDetailsModal'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

export default function TopPagesTable() {
    const StatsQuery = useStatsQuery()

    const [urlOpen, setUrlOpen] = useState<string | null>(null)

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead>Page URL</TableHead>
                        <TableHead>Unique Visits</TableHead>
                        <TableHead>Total Visits</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {StatsQuery.data?.statsPerPage.map((stats, index) => (
                        <TableRow
                            key={stats.pageUrl}
                            className={clsx(
                                'cursor-pointer hover:bg-blue-50',
                                index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                            )}
                            onClick={() => setUrlOpen(stats.pageUrl)}
                        >
                            <TableCell className="font-medium">
                                {stats.pageUrl}
                            </TableCell>
                            <TableCell>{stats.unique_visits}</TableCell>
                            <TableCell>{stats.total_visits}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <p className="text-xs text-gray-500 mt-2 italic">
                Click on a page to see session details
            </p>
            <SessionDetailsModal
                urlOpen={urlOpen}
                onClose={() => setUrlOpen(null)}
            />
        </div>
    )
}
