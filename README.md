<h1 align="center">
    <img src="https://readme-typing-svg.herokuapp.com/?font=Righteous&size=35&center=true&vCenter=true&width=1100&height=70&duration=4000&lines=GlobeNews+App;News+at+Your+Fingertips" />
</h1>

**GlobeNews** is a mobile news application built using React Native and Expo, providing users with up-to-date news from various sources. It uses the NewsData.io API to fetch the latest news articles and display them in an easy-to-read format.

## Technologies Used

- **React Native**: A framework for building native mobile apps using React.
- **Expo**: A platform to build universal apps for Android, iOS, and the web with React Native.
- **Axios**: A promise-based HTTP client for making API requests.
- **Moment.js**: A library for parsing, validating, and formatting dates.
- **React Navigation**: A navigation library for React Native apps.
- **Firebase**: Used for optional features like user authentication (if integrated).

## Features

- **News Feed**: Browse the latest news articles across various categories.
- **Article Details**: View complete articles with descriptions, images, and full content.
- **Search Functionality**: Search for specific news articles or categories.
- **Responsive UI**: The app works seamlessly across various device sizes, providing an optimal reading experience.
- **Offline Support**: Ability to access previously loaded news even without an internet connection (if implemented).

## Installation

### Prerequisites

- Node.js (>= 16.x)
- Expo CLI installed globally

If you don’t have Expo CLI installed, run:
```bash
npm install -g expo-cli
```
1) Clone the Repository:
   ```bash
   https://github.com/sasobapriyanjana11/GlobeNews-Mobile-App.git
   ```
2) Install dependencies:
   ```bash
   npm install
   ```
   
3) Create an .env file in the root directory of the project and add your API key from NewsData.io:
   - EXPO_PUBLIC_API_KEY=your-api-key-here
     
4) Start the app:
   ```bash
   expo start
```
- This will open Expo DevTools in your browser. You can scan the QR code with the Expo Go app on your phone, or press a for Android, i for iOS, or w for web.


## API Usage
- GlobeNews fetches news data from the NewsData.io [https://newsdata.io/] API. To use the API, sign up at NewsData.io and get your API key.

- example:
```bash
https://newsdata.io/api/1/news?apikey=your-api-key&country=us

```
### License
This project is licensed under the MIT License - see the LICENSE file for details.

   
