# Google Sheets Lead Capture - Setup Guide

## Overview
This guide explains how to set up Google Sheets lead capture for the PCC Calculator gating form.

## Prerequisites
- Google Account
- Google Sheet created (recommended name: "PCC Leads Database")

## Step-by-Step Setup

### 1. Prepare Your Google Sheet

1. **Create a new Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Click "Blank" to create new spreadsheet
   - Rename it to "PCC Leads Database" (or your preferred name)

2. **Set up headers** (Row 1):
   ```
   Timestamp | Nama | WhatsApp | Email | Source
   ```

### 2. Deploy Google Apps Script

1. **Open Apps Script Editor**:
   - In your Google Sheet: `Extensions` → `Apps Script`

2. **Copy the script**:
   - Open `google-apps-script.js` in your project root
   - Copy the entire contents

3. **Paste into Apps Script**:
   - Delete any existing `function myFunction() {}` code
   - Paste the copied script

4. **Deploy as Web App**:
   - Click `Deploy` button (top right) → `New deployment`
   - Click gear icon ⚙️ → Select type: `Web app`
   - Configure:
     - **Description**: "PCC Lead Capture API v1"
     - **Execute as**: `Me (your-email@gmail.com)`
     - **Who has access**: `Anyone`
   - Click `Deploy`
   - **Authorize** the script (Google will ask for permissions)
   - Copy the **Web app URL** (looks like: `https://script.google.com/macros/s/ABC123.../exec`)

### 3. Configure Your Project

1. **Create .env.local file**:
   ```bash
   # In project root, copy the template
   cp .env.local.example .env.local
   ```

2. **Add your Web App URL**:
   ```env
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_WEB_APP_URL/exec
   VITE_ENABLE_LEAD_CAPTURE=true
   ```

3. **Restart dev server** (if running):
   ```bash
   npm run dev
   ```

### 4. Test the Integration

1. **Navigate to** `http://localhost:5173/get-access`
2. **Fill in the form** with test data:
   - Name: Test User
   - WhatsApp: 081234567890
   - Email: test@example.com
3. **Submit** the form
4. **Check your Google Sheet** - new row should appear!

## Troubleshooting

### Issue: "Lead saved locally (API not configured)"
**Cause**: Environment variable not loaded or invalid URL.
**Solution**: 
- Ensure `.env.local` exists in project root
- Restart dev server: `npm run dev`
- Check URL doesn't contain `YOUR_DEPLOYMENT_ID`

### Issue: Network error or timeout
**Cause**: CORS issue or Google Apps Script not properly deployed.
**Solution**:
- Verify "Who has access" is set to `Anyone`
- Redeploy the script: `Deploy` → `Manage deployments` → `Edit` → Save
- Wait 1-2 minutes for changes to propagate

### Issue: Data not appearing in sheet
**Cause**: Wrong sheet or headers mismatch.
**Solution**:
- Ensure headers match: `Timestamp | Nama | WhatsApp | Email | Source`
- Check script is appending to correct sheet (first sheet by default)

## Fallback Behavior

**The system has built-in fallbacks**:
- If Google Sheets API is down: data saves to `localStorage` as backup
- If URL is not configured: form still works, data in `localStorage`
- Users can always access calculator even if API fails

## Security Notes

- ✅ No sensitive data is stored in frontend code
- ✅ Environment variables not committed to git (`.env.local` in `.gitignore`)
- ✅ Google Apps Script validates email format
- ✅ All requests logged for debugging

## Production Deployment

When deploying to Vercel/Netlify:

1. **Add environment variable**:
   - In platform dashboard: Settings → Environment Variables
   - Add: `VITE_GOOGLE_SHEETS_URL` = your Web App URL
   - Add: `VITE_ENABLE_LEAD_CAPTURE` = `true`

2. **Redeploy** your app

3. **Test** the live form

## Monitoring

**View captured leads**:
- Open your Google Sheet
- Leads appear in real-time (you may need to refresh)

**Recommended**: Set up conditional formatting to highlight new leads.

## Need Help?

- Check console logs in browser DevTools
- Review Google Apps Script logs: Apps Script Editor → `Executions`
- Verify network requests in browser Network tab
