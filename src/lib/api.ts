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
