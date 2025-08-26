import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function cn(...inputs: Array<ClassValue>) {
    return twMerge(clsx(inputs))
}

export const formatDuration = (seconds: number) => {
    if (seconds < 60) {
        return `${Math.floor(seconds)} seg`
    }
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    if (mins < 60) {
        return `${mins}m ${secs}s`
    }
    const hours = Math.floor(mins / 60)
    const remainingMins = mins % 60
    return `${hours}h ${remainingMins}m`
}
