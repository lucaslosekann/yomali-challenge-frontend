import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

export type Stats = {
    statsPerDay: Array<{
        total_visits: number
        total_unique: number
        bucket?: string
    }>
    statsPerPage: Array<{
        pageUrl: string
        total_visits: number
        unique_visits: number
    }>
    sessionStats: {
        avgSessionDuration: number
        shortVisitPercentage: number
        topBrowser: {
            name: string
            percentage: number
        }
        topOS: {
            name: string
            percentage: number
        }
        topReferrer: {
            name: string
            percentage: number
        }
    }
    hourly: boolean
}

export async function fetchStats(
    params: {
        dateRange: string
        startDate?: Date
        endDate?: Date
        url?: string
    },
    signal?: AbortSignal,
) {
    const response = await api.get<Stats>('/stats', {
        params,
        signal,
    })
    return response.data
}

export type Session = {
    id: number
    ip: string
    userAgent: string
    browser: string | null
    os: string | null
    referrer: string | null
    startTime: string
    endTime: string
}

export async function fetchSessions(
    params: {
        dateRange: string
        startDate?: Date
        endDate?: Date
        url: string
        page: number
    },
    signal?: AbortSignal,
) {
    const response = await api.get<{ sessions: Array<Session>; total: number }>(
        '/stats/sessions',
        {
            params,
            signal,
        },
    )
    return response.data
}
