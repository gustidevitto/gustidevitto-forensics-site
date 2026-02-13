export const formatCurrency = (amount: number, currency: string = 'USD', locale: string = 'en-US') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

export const formatRupiah = (number: number) => {
    return formatCurrency(number, 'IDR', 'id-ID')
}
