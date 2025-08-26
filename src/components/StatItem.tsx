interface StatItemProps {
    icon: React.ReactNode
    label: string
    value: string
    color: string
}
export const StatItem = ({ icon, label, value, color }: StatItemProps) => (
    <div className="flex items-center p-3 bg-white rounded-lg">
        <div className={`p-2 rounded-full ${color}`}>{icon}</div>
        <div className="ml-3">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-semibold">{value}</p>
        </div>
    </div>
)
