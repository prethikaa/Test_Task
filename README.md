# Country Finder - Front-End Test Task

A responsive data table component built with React and TypeScript that displays country information fetched from a GraphQL API. The table includes features like pagination, filtering, and search, allowing users to explore countries based on their continent, currency, country code, and name.

## Demo

The application is deployed on [Vercel](https://vercel.com/) and can be accessed at the following link:

[Country Finder Demo](https://test-task1-seven.vercel.app/?page=1&entries=10)

##  Getting Started

### 1. Clone the Repository

git clone https://github.com/prethikaa/Test_Task.git

### 2. Install Dependencies

npm install

### 3. Run the Frontend

npm run dev

## Features Implemented

### 1. **Data Display**
   - The app fetches country data from a GraphQL endpoint (`https://countries.trevorblades.com/graphql`).
   - The table displays the following columns:
     - **Country Name**
     - **Country Code**
     - **Continent**
     - **Currency**

### 2. **Pagination**
   - Implemented pagination with options to display:
     - 10 entries
     - 20 entries
     - 50 entries
     - 100 entries
   - Navigation for previous and next pages.
   - The URL dynamically updates based on the current page and entries per page.

### 3. **Search Functionality**
   - Implemented a search bar to allow searching by:
     - **Country Code** (exact match)
     - **Country Name** (fuzzy search)
   - Applied **debouncing** to optimize performance when searching.

### 4. **Filtering**
   - Added dropdown filters for:
     - **Continent** (allows users to filter countries by continent)
     - **Currency** (allows users to filter countries by currency)
   - Filters are combinable and update results in real-time.

### 5. **Responsive Design**
   - The application is fully responsive and works seamlessly across various screen sizes (mobile, tablet, and desktop) styled using Tailwind CSS.

### 6. **Error Handling**
   - Added error handling to display user-friendly messages when no results are found or if an issue arises during the API call.

### 7. **Loading State**
   - Displayed a loading spinner while fetching data from the API, improving the user experience.

### 8. **GraphQL Integration**
   - Integrated Apollo Client for fetching country data using a GraphQL query.



