# Infinite Scroll with Search & Debounce

This project demonstrates an infinite scroll list with a search bar and debounce functionality, fetching user data from JSONPlaceholder.

## Features

-   **Search Bar**: Dynamically filter users by name or email.
-   **Debounced Search**: API calls are debounced with a 500ms delay to optimize performance.
-   **Infinite Scroll**: Automatically loads more users as you scroll to the bottom of the list.
-   **Loading Spinner**: Indicates when data is being fetched.
-   **Optimized Rendering**: Uses `React.memo` and `useCallback` for performance.
-   **No Results Found**: Displays a message when no users match the search criteria.

## Technologies Used

-   React (with Hooks)
-   Axios (for API calls)
-   Intersection Observer API (for infinite scrolling)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

-   Node.js
-   npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone (https://github.com/Sharmila-19/infinite-scroll-app.git)
    cd infinite-scroll-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    npm start
    ```

    The application will open in your browser at `http://localhost:3000`.

## Project Structure
