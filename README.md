# Creator Contest Platform

This project is a frontend application built to satisfy the requirements of a technical assessment for a Web Developer role. It is a feature-rich platform for a creator contest, designed to be reliable, responsive, and user-friendly, while strictly adhering to the provided brand guidelines.

This application successfully implements all the required features and fixes:

 1. Video Upload Reliability:** The video upload component ensures every valid MP4 file upload completes successfully and triggers a "Video submitted" toast
 2. Spin-Wheel Animation:** The wheel is guaranteed to complete a full spin and land on a valid segment, providing clear feedback to the user.
 3. Referral Link Stability:** The "Copy Referral Link" functionality works correctly, copying the link to the clipboard and confirming with a toast.
 4. Leaderboard Sort Persistence:** The leaderboard allows sorting by `Top-Rated (Votes)`, `Recency`, and `Name`. The user's chosen sort order is preserved across page reloads using `localStorage`.
 5. Cross-Browser Toasts:** Toast notifications for success, error, and info are implemented and display reliably across modern browsers (Chrome, Firefox, Safari).
 6. Stripe Checkout UX:** The checkout button is correctly disabled during initialization and processing. It provides clear visual feedback for payment success and failure, with an option to retry.
 7. Mobile Navigation:** The header and navigation have been adjusted to prevent content overlap on small screens (e.g., iPhone SE), with a responsive hamburger menu for a smooth mobile experience.

## Prerequisites

-   Node.js (v18 or later)
-   npm (or yarn/pnpm)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/YOUR_USERNAME/creator-contest-platform.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd creator-contest-platform
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:5173`.
