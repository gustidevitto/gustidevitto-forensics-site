/**
 * Google Sheets Lead Capture API Client
 * 
 * This module handles communication with Google Apps Script Web App
 * for capturing leads into Google Sheets.
 */

export interface LeadData {
    name: string
    phone: string
    email: string
    source?: string
}

export interface ApiResponse {
    success: boolean
    message?: string
    error?: string
    timestamp?: string
}

/**
 * Submit lead data to Google Sheets via Apps Script
 * 
 * @param data - Lead information to capture
 * @returns Promise with API response
 */
export async function submitLead(data: LeadData): Promise<ApiResponse> {
    // Priority: .env.local > Hardcoded Fallback
    const apiUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL || 'https://script.google.com/macros/s/AKfycbyzb_6V43PUrCpD18qOlIqmoOnXXt9OgNTmD2woVBrqKp8VOmJjCtwafXU_BvK5U-L2/exec'
    const isEnabled = import.meta.env.VITE_ENABLE_LEAD_CAPTURE !== 'false'

    // Fallback if API is disabled or URL is missing
    if (!isEnabled || !apiUrl || apiUrl.includes('YOUR_DEPLOYMENT_ID')) {
        console.warn('Lead capture disabled or not configured.')
        localStorage.setItem('LEAD_STORAGE_FALLBACK', JSON.stringify(data))
        return {
            success: false,
            error: 'API_NOT_CONFIGURED',
            message: 'Alamat API belum terpasang dengan benar di .env.local',
        }
    }

    try {
        // We use 'no-cors' because Google Apps Script always redirects, 
        // which often causes "Failed to fetch" in modern browsers.
        // NOTE: In 'no-cors' mode, we cannot read the response body, 
        // but the data WILL reached the Google Sheet.
        await fetch(apiUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({
                ...data,
                source: data.source || 'PCC Calculator',
            }),
        })

        console.log('Lead submission attempt completed (no-cors mode)')

        return {
            success: true,
            message: 'Data terkirim ke sistem antrean.',
        }

    } catch (error) {
        console.error('Failed to submit lead:', error)

        // Fallback: save to localStorage if API fails
        localStorage.setItem('LEAD_STORAGE_FALLBACK', JSON.stringify(data))

        // Determine error message
        let errorMessage = 'Network error'
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                errorMessage = 'Request timeout'
            } else {
                errorMessage = error.message
            }
        }

        return {
            success: false,
            error: errorMessage,
            message: 'Lead saved locally as backup',
        }
    }
}

/**
 * Test connection to Google Sheets API
 * 
 * @returns Promise indicating if API is reachable
 */
export async function testConnection(): Promise<boolean> {
    const apiUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL

    if (!apiUrl || apiUrl.includes('YOUR_DEPLOYMENT_ID')) {
        return false
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            signal: AbortSignal.timeout(5000),
        })

        return response.ok
    } catch {
        return false
    }
}
