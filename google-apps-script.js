/**
 * GOOGLE APPS SCRIPT - LEAD CAPTURE API (FIXED CORS)
 * 
 * INSTRUCTIONS:
 * 1. Replace ALL code in Google Apps Script editor with this
 * 2. Click "Deploy" → "Manage deployments"
 * 3. Click Edit (pencil icon) → "New version"
 * 4. Click "Deploy"
 */

function doPost(e) {
    try {
        // Parse request data
        let data;
        try {
            data = JSON.parse(e.postData.contents);
        } catch (parseError) {
            return createResponse(400, {
                success: false,
                error: 'Invalid JSON format'
            });
        }

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

        // Get the active spreadsheet
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

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

        // Log success
        Logger.log('Lead captured: ' + data.email);

        // Return success response
        return createResponse(200, {
            success: true,
            message: 'Lead captured successfully',
            timestamp: timestamp.toISOString()
        });

    } catch (error) {
        // Log error for debugging
        Logger.log('Error in doPost: ' + error.toString());

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
        message: 'Google Sheets API is running. Use POST to submit leads.',
        timestamp: new Date().toISOString()
    });
}

/**
 * Create standardized JSON response
 */
function createResponse(statusCode, data) {
    const output = ContentService.createTextOutput(JSON.stringify(data));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
}
