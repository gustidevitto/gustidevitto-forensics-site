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
        omzet: data.omzetKotor,
        setOmzet: (val: number) => setData(d => ({ ...d, omzetKotor: val })),

        biayaBaku: data.biayaBaku,
        setBiayaBaku: (val: number) => setData(d => ({ ...d, biayaBaku: val })),

        gaji: data.gajiTotal,
        setGaji: (val: number) => setData(d => ({ ...d, gajiTotal: val })),

        jamKosong: data.avgJamKosong,
        setJamKosong: (val: number) => setData(d => ({ ...d, avgJamKosong: val })),

        kerugianBahanBaku,
        kerugianJamKosong,
        totalPhantomCost,

        reset: () => setData({
            omzetKotor: 0,
            biayaBaku: 0,
            gajiTotal: 0,
            avgJamKosong: 0
        })
    }
}
