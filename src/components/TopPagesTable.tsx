import useStatsQuery from '../queries/useStatsQuery'

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

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Page URL</TableHead>
                    <TableHead>Unique Visits</TableHead>
                    <TableHead>Total Visits</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {StatsQuery.data?.statsPerPage.map((stats) => (
                    <TableRow key={stats.pageUrl}>
                        <TableCell className="font-medium">
                            {stats.pageUrl}
                        </TableCell>
                        <TableCell>{stats.unique_visits}</TableCell>
                        <TableCell>{stats.total_visits}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
