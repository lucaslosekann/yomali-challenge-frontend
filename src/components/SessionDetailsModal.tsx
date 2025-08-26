import { useQuery } from '@tanstack/react-query'
import {
    ClockIcon,
    GlobeIcon,
    MonitorIcon,
    MousePointerIcon,
} from 'lucide-react'
import { useState } from 'react'
import { DateTime } from 'luxon'
import { formatDuration } from '../lib/utils'
import { useDashboardStatsContext } from '../contexts/DashboardStatsContext'
import { fetchSessions } from '../lib/api'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

type SessionDetailsModalProps = {
    urlOpen: string | null
    onClose: () => void
}

const PAGE_SIZE = 10

export default function SessionDetailsModal({
    urlOpen,
    onClose,
}: SessionDetailsModalProps) {
    const { dateRange, customDate } = useDashboardStatsContext()

    const [page, setPage] = useState(1)

    const SessionDetailsQuery = useQuery({
        queryKey: ['sessionDetails', urlOpen, dateRange, customDate, page],
        queryFn: async ({ signal }) => {
            return fetchSessions(
                {
                    url: urlOpen!,
                    dateRange,
                    startDate: customDate[0] || undefined,
                    endDate: customDate[1] || undefined,
                    page,
                },
                signal,
            )
        },
        enabled: urlOpen != null,
    })

    const totalPages = SessionDetailsQuery.data
        ? Math.ceil(SessionDetailsQuery.data.total / PAGE_SIZE)
        : 0

    return (
        <Dialog
            open={urlOpen != null}
            onOpenChange={(open) => {
                if (!open) onClose()
            }}
        >
            <DialogContent className="max-w-3xl w-full max-h-[80vh] overflow-y-auto">
                <DialogHeader className="border-b border-gray-200 mb-4 pb-2">
                    <DialogTitle>
                        Session Details: {urlOpen} (
                        {dateRange == 'custom' ? 'Custom Range' : dateRange})
                    </DialogTitle>
                </DialogHeader>
                <div>
                    {SessionDetailsQuery.data?.sessions.map((session, idx) => (
                        <div
                            key={session.id}
                            className={`mb-6 pb-6 ${idx % 2 === 0 ? 'border-b border-gray-200' : ''}`}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm">
                                            <GlobeIcon className="h-4 w-4 text-gray-500 mr-2" />
                                            <span className="text-gray-600">
                                                IP:{' '}
                                            </span>
                                            <span className="ml-1 font-medium">
                                                {session.ip}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <MonitorIcon className="h-4 w-4 text-gray-500 mr-2" />
                                            <span className="text-gray-600">
                                                Browser:
                                            </span>
                                            <span className="ml-1 font-medium">
                                                {session.browser}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <MonitorIcon className="h-4 w-4 text-gray-500 mr-2" />
                                            <span className="text-gray-600">
                                                OS:{' '}
                                            </span>
                                            <span className="ml-1 font-medium">
                                                {session.os}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <MousePointerIcon className="h-4 w-4 text-gray-500 mr-2" />
                                            <span className="text-gray-600">
                                                Referrer:
                                            </span>
                                            <span className="ml-1 font-medium truncate max-w-[200px]">
                                                {session.referrer ||
                                                    'Direct / None'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm">
                                            <ClockIcon className="h-4 w-4 text-gray-500 mr-2" />
                                            <span className="text-gray-600">
                                                Start:
                                            </span>
                                            <span className="ml-1 font-medium">
                                                {new Date(
                                                    session.startTime,
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <ClockIcon className="h-4 w-4 text-gray-500 mr-2" />
                                            <span className="text-gray-600">
                                                End:{' '}
                                            </span>
                                            <span className="ml-1 font-medium">
                                                {new Date(
                                                    session.endTime,
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <ClockIcon className="h-4 w-4 text-gray-500 mr-2" />
                                            <span className="text-gray-600">
                                                Duration:
                                            </span>
                                            <span className="ml-1 font-medium">
                                                {formatDuration(
                                                    DateTime.fromISO(
                                                        session.endTime,
                                                    )
                                                        .diff(
                                                            DateTime.fromISO(
                                                                session.startTime,
                                                            ),
                                                        )
                                                        .as('seconds'),
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-1">
                                    User Agent
                                </h4>
                                <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded overflow-x-auto">
                                    {session.userAgent}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {totalPages > 1 && (
                    <div className="flex justify-between items-center ">
                        <div className="text-sm text-gray-600">
                            Mostrando {(page - 1) * PAGE_SIZE + 1}-
                            {Math.min(
                                page * PAGE_SIZE,
                                SessionDetailsQuery.data?.total ??
                                    Number.MAX_SAFE_INTEGER,
                            )}{' '}
                            de {SessionDetailsQuery.data?.total} sessões
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() =>
                                    setPage((prev) => Math.max(prev - 1, 1))
                                }
                                disabled={page === 1}
                                className={`px-3 py-1 rounded text-sm ${page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                Anterior
                            </button>
                            <button
                                onClick={() =>
                                    setPage((prev) =>
                                        Math.min(prev + 1, totalPages),
                                    )
                                }
                                disabled={page === totalPages}
                                className={`px-3 py-1 rounded text-sm ${page === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                Próxima
                            </button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
