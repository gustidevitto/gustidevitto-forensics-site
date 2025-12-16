import { useState } from 'react'

export interface PhantomData {
    omzetKotor: number
    biayaBaku: number
    gajiTotal: number
    avgJamKosong: number
}

export function usePhantomCalculator() {
    const [data, setData] = useState<PhantomData>({
        omzetKotor: 0,
        biayaBaku: 0,
        gajiTotal: 0,
        avgJamKosong: 3.5,
    })

    // Calculation Logic (Derived State)
    // 1. Kerugian Bahan Baku (12.5% of COGS)
    const kerugianBahanBaku = data.biayaBaku * 0.125

    // 2. Kerugian Jam Kosong
    // Formula: (AvgIdle / 8) * (MonthlySalary / 25) * 25
    // Equivalent to: (AvgIdle / 8) * MonthlySalary
    const dailySalary = data.gajiTotal / 25
    const idleHoursRatio = data.avgJamKosong / 8
    const dailyLoss = idleHoursRatio * dailySalary
    const kerugianJamKosong = dailyLoss * 25

    const totalPhantomCost = kerugianBahanBaku + kerugianJamKosong

    return {
        data,
        setData,
        results: {
            kerugianBahanBaku,
            kerugianJamKosong,
            totalPhantomCost,
        },
    }
}
