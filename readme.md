Project Overview:
* Built an end-to-end testing framework using Playwright + JavaScript

Goal: 
* Validate core authentication flows like signup, sign in, invalid sign in, and sign out by real user behavior

Configuration:
* Centralized test data and URLs in playwright.config.js
* Configured multiple browsers (Chromium, Firefox, Edge) for cross-browser validation
* Configured mobile devices: Pixel 5 (Mobile Chrome) and iPhone 12 (Mobile Safari)
* Retry mechanism added for flaky tests
* Screenshots and video recording enabled (screenshot: 'on', video: 'on') for debugging and demo purposes

Test Scenarios:
* Signup Flow (assignmentTask.spec.js)
    * Navigates to registration page
    * Fills out user details and submits form
    * Validates success message and auto-login
    * Handles duplicate signup attempts (This username already exists.)
    * Logs out and confirms return to login page

* Valid Sign In Flow
    * Navigates to login page
    * Enters valid credentials
    * Confirms successful login via Dashboard heading
    * Logs out and validates session end

* Invalid Sign In Flow
    * Navigates to practice login site
    * Attempts login with invalid credentials
    * Validates error alert: "Invalid credentials"

* Mobile-Friendly Testing:
npx playwright test assignmentTask.spec.js --project="Mobile Chrome"
npx playwright test assignmentTask.spec.js --project="Mobile Safari"

* CI/ CD Integration:
    * Add Playwright test execution (npx playwright test) to your pipeline build stage.
    * Videos and screenshots are automatically captured for debugging.
    * Cross‑browser and mobile projects ensure coverage across environments.
    * Retry mechanism reduces flakiness in CI pipelines