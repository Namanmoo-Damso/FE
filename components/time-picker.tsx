"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollPickerProps {
    options: string[]
    value: string
    onChange: (value: string) => void
    label?: string
}

const ScrollPicker = ({ options, value, onChange, label }: ScrollPickerProps) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const itemHeight = 60 // Height of each item in px

    useEffect(() => {
        if (scrollRef.current) {
            const index = options.indexOf(value)
            if (index !== -1) {
                scrollRef.current.scrollTop = index * itemHeight
            }
        }
    }, [value, options])

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollTop = scrollRef.current.scrollTop
            const index = Math.round(scrollTop / itemHeight)
            if (options[index] && options[index] !== value) {
                onChange(options[index])
            }
        }
    }

    return (
        <div className="flex flex-col items-center">
            {label && <span className="text-sm font-semibold text-[#8FA963] mb-2">{label}</span>}
            <div className="relative h-[180px] w-24 overflow-hidden rounded-2xl bg-white border-2 border-[#E9F0DF] shadow-inner">
                {/* Selection Highlight */}
                <div className="absolute top-[60px] left-0 right-0 h-[60px] bg-[#F7F9F2] border-y-2 border-[#C2D5A8] pointer-events-none" />

                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide py-[60px]"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {options.map((option) => (
                        <div
                            key={option}
                            className={cn(
                                "h-[60px] flex items-center justify-center snap-center text-2xl font-bold transition-all duration-200",
                                value === option ? "text-[#4A5D23] scale-110" : "text-[#B4C69B] scale-90"
                            )}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

interface TimePickerProps {
    value: string // "HH:mm" format
    onChange: (value: string) => void
}

export function TimePicker({ value, onChange }: TimePickerProps) {
    const [hour, min] = value.split(":")

    // Convert 24h to 12h for easier UI
    const hourInt = parseInt(hour)
    const ampm = hourInt >= 12 ? "오후" : "오전"
    const displayHour = hourInt % 12 || 12
    const paddedDisplayHour = displayHour.toString().padStart(2, "0")

    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"))
    const minutes = Array.from({ length: 6 }, (_, i) => (i * 10).toString().padStart(2, "0"))
    const ampmOptions = ["오전", "오후"]

    const updateTime = (newAmpm: string, newHour: string, newMin: string) => {
        let h = parseInt(newHour)
        if (newAmpm === "오후" && h < 12) h += 12
        if (newAmpm === "오전" && h === 12) h = 0
        const finalValue = `${h.toString().padStart(2, "0")}:${newMin}`
        onChange(finalValue)
    }

    return (
        <div className="flex items-center justify-center gap-4 bg-[#FAFCF6] p-6 rounded-3xl border-2 border-[#C2D5A8] shadow-md">
            <ScrollPicker
                label="오전/오후"
                options={ampmOptions}
                value={ampm}
                onChange={(val) => updateTime(val, paddedDisplayHour, min)}
            />
            <div className="text-3xl font-bold text-[#C2D5A8] self-end mb-12">:</div>
            <ScrollPicker
                label="시"
                options={hours}
                value={paddedDisplayHour}
                onChange={(val) => updateTime(ampm, val, min)}
            />
            <div className="text-3xl font-bold text-[#C2D5A8] self-end mb-12">:</div>
            <ScrollPicker
                label="분"
                options={minutes}
                value={min}
                onChange={(val) => updateTime(ampm, paddedDisplayHour, val)}
            />
        </div>
    )
}
