/**
 * GOOGLE APPS SCRIPT - LEAD CAPTURE API (ROBUST VERSION)
 * 
 * INSTRUCTIONS:
 * 1. Replace ALL code in Google Apps Script editor with this
 * 2. Click "Deploy" -> "New deployment" (PENTING: Selalu buat deployment baru)
 * 3. Configure:
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click "Deploy"
 */

function doPost(e) {
    const lock = LockService.getScriptLock();
    lock.tryLock(10000); // Wait for 10 seconds to avoid collisions

    try {
        // 1. Parse Data
        let data;
        if (e.postData && e.postData.contents) {
            data = JSON.parse(e.postData.contents);
        } else {
            throw new Error("No data received in postData");
        }

        // 2. Validate Data
        if (!data.name || !data.phone || !data.email) {
            throw new Error("Missing required fields (name, phone, email)");
        }

        // 3. Select Sheet (By name is safer)
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        let sheet = ss.getSheetByName("Leads") || ss.getSheets()[0];

        // Ensure headers exist if sheet is empty
        if (sheet.getLastRow() === 0) {
            sheet.appendRow(["Timestamp", "Nama", "WhatsApp", "Email", "Source"]);
        }

        // 4. Append Data
        const timestamp = new Date();
        sheet.appendRow([
            timestamp,
            data.name,
            data.phone,
            data.email,
            data.source || "Website Form"
        ]);

        // 5. Return Success
        return ContentService.createTextOutput(JSON.stringify({
            success: true,
            message: "Data saved to Google Sheets",
            row: sheet.getLastRow()
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({
            success: false,
            error: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);

    } finally {
        lock.releaseLock();
    }
}

function doGet(e) {
    return ContentService.createTextOutput("API is running! Mode: GET").setMimeType(ContentService.MimeType.TEXT);
}
