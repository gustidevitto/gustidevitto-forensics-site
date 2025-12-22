/**
 * GOOGLE APPS SCRIPT - LEAD CAPTURE API (FINAL ROBUST)
 * 
 * INSTRUCTIONS:
 * 1. HAPUS SEMUA kode lama di Google Apps Script.
 * 2. PASTE kode ini seluruhnya.
 * 3. Klik "Deploy" -> "New deployment".
 * 4. Pilih Type: "Web App".
 * 5. Execute as: "Me".
 * 6. Who has access: "Anyone" (PENTING!).
 * 7. Klik "Deploy" & Copy URL barunya.
 */

function doPost(e) {
    const lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        let contents = e.postData.contents;
        let data = JSON.parse(contents);

        // Ambil Spreadsheet & Sheet pertama
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        const sheet = ss.getSheets()[0];

        // Masukkan Data
        const timestamp = new Date();
        sheet.appendRow([
            timestamp,
            data.name || "No Name",
            data.phone || "No Phone",
            data.email || "No Email",
            data.source || "Website"
        ]);

        return ContentService.createTextOutput(JSON.stringify({ success: true }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        Logger.log("Error: " + error.toString());
        return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}

function doGet(e) {
    return ContentService.createTextOutput("API Aktif!").setMimeType(ContentService.MimeType.TEXT);
}
