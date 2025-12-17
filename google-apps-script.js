/**
 * GOOGLE APPS SCRIPT - LEAD CAPTURE API
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste this entire code
 * 4. Click "Deploy" → "New Deployment"
 * 5. Select type: "Web app"
 * 6. Execute as: "Me"
 * 7. Who has access: "Anyone"
 * 8. Click "Deploy" and copy the Web App URL
 * 9. Add URL to .env.local as VITE_GOOGLE_SHEETS_URL
 * 
 * SHEET SETUP:
 * Ensure Row 1 has headers: Timestamp | Nama | WhatsApp | Email | Source
 */

function doPost(e) {
    try {
        // Get the active spreadsheet
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // Parse request data
        const data = JSON.parse(e.postData.contents);

        // Validate required fields
        if (!data.name || !data.phone || !data.email) {
            return createResponse(400, {
                success: false,
                error: 'Missing required fields: name, phone, email'
            });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return createResponse(400, {
                success: false,
                error: 'Invalid email format'
            });
        }

        // Prepare row data
        const timestamp = new Date();
        const rowData = [
            timestamp,
            data.name,
            data.phone,
            data.email,
            data.source || 'PCC Calculator'
        ];

        // Append to sheet
        sheet.appendRow(rowData);

        // Return success response
        return createResponse(200, {
            success: true,
            message: 'Lead captured successfully',
            timestamp: timestamp.toISOString()
        });

    } catch (error) {
        // Log error for debugging
        Logger.log('Error: ' + error.toString());

        return createResponse(500, {
            success: false,
            error: 'Internal server error',
            details: error.toString()
        });
    }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
    return createResponse(200, {
        success: true,
        message: 'Google Sheets API is running',
        timestamp: new Date().toISOString()
    });
}

/**
 * Create standardized response with CORS headers
 */
function createResponse(statusCode, data) {
    const output = ContentService.createTextOutput(JSON.stringify(data));
    output.setMimeType(ContentService.MimeType.JSON);

    // Add CORS headers
    return output;
}
