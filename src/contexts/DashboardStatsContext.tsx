import React, { createContext, useContext, useState } from 'react'

export type DashboardStatsContextProps = {
    dateRange: '24h' | '7d' | '30d' | 'custom'
    setDateRange: React.Dispatch<
        React.SetStateAction<'24h' | '7d' | '30d' | 'custom'>
    >
    customDate: [Date | null, Date | null]
    setCustomDate: React.Dispatch<
        React.SetStateAction<[Date | null, Date | null]>
    >
    pageFilter: string
    setPageFilter: React.Dispatch<React.SetStateAction<string>>
}

const DashboardStatsContext = createContext<DashboardStatsContextProps>(
    {} as DashboardStatsContextProps,
)

const DashboardStatsProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [dateRange, setDateRange] =
        useState<DashboardStatsContextProps['dateRange']>('24h')
    const [customDate, setCustomDate] = useState<
        DashboardStatsContextProps['customDate']
    >([null, null])
    const [pageFilter, setPageFilter] = useState<string>('')

    return (
        <DashboardStatsContext
            value={{
                customDate,
                dateRange,
                setCustomDate,
                setDateRange,
                pageFilter,
                setPageFilter,
            }}
        >
            {children}
        </DashboardStatsContext>
    )
}

const useDashboardStatsContext = (): DashboardStatsContextProps => {
    const context = useContext(DashboardStatsContext)
    return context
}

export { DashboardStatsProvider, useDashboardStatsContext }
