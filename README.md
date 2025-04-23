# Memovies - Timeless movies, endless memories

Step back in time and rediscover the magic of your movie memories - Memovies.

**Memovies** is a movie app that blends modern tech with vintage soul — powered by [TMDB API](https://www.themoviedb.org/).

---

## ✨ Features

**Home Page:**

- This page is a mix of current movies and a nostalgic journey back in time to various years.
- Enter your year of birth and receive tips on movies from that year. You can then click on a link 'Discover more movies' to navigate to /[year] (query = year of birth)
- Browse popular movies from different years, now playing movies and keep up with the latest.

**Movie List (/[year]):**

- Displays a paginated list of cards, first depending on your year of birth but you can also select an age range and retrieve movies from the selected years.
- Search movies by title (or part of a title)
- "Sort by" dropdown to sort movies by popularity, rating, vote count release year or movie title (desc or asc).
- Filter movies by category, release year, rating and/or runtime.
- It is possible to clear a specific filter or to clear both the sorting and all filters at once.

**Movie Details (/movies/[id]):**

- View full details of a selected movie.
- Retrieve the movies cast list

---

## 🔧 Tech Stack

- **Next.js (App Router)** – File-based routing and server-side rendering. [Next.js Documentation](https://nextjs.org/docs).
- **Tailwind CSS** – Utility-first styling for pixel-perfect retro vibes
- **shadcn/ui** – Accessible, themeable components with a modern look
- **TypeScript** – Type-safe development for smoother scaling
- **Lucide Icons** – A modern open-source icon library
- **TMDB API** – Movie data. [TMDB API](https://www.themoviedb.org/documentation/api)
- **Accessibility** – Tested with WAVE and Lighthouse.

---

## 🚀 Installation

1. Clone the repository:

```sh
git clone https://github.com/SandraHKannerberg/movies
cd movies
```

2. Install dependencies:

```sh
npm install
```

3. Environment variables:
   To use the API, you'll need to sign up at themoviedb.org and obtain an API key.
   Create a `.env.local` file in the project root and add the necessary variables for the API:

```plaintext
API_SECRET_KEY="your-secret-key"
ACCESS_TOKEN_AUTH="your-secret-key"
```

4. Run the development server:

   ```sh
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Workflow

**Development Workflow:**
This project follow an agile methodology and include sprint plannings, daily stand ups and code reviews.

**Git Workflow:**
Feature branches for each task.
Pull requests to the dev branch.
Regular commits to ensure continuity.
At the end of each sprint, dev branch are merged into the main branch.

---

## 💡 Idea & Inspiration

This app was born from a love for rainy Saturday afternoons, old VHS rentals, and unforgettable movie memories.
It's not just an app – it's a portal back to movie magic.

---

## 🔮 Future features

- Sign in / sign up
- Add movies to different lists, for example Favourites and Watchlist
- User statistics
- Dark / Light-mode toggle
- Animations for a more interactive experience
- Develop the current search function into a Advanced search-function
- Movie quiz
