# Memovies - Timeless movies, endless memories

Step back in time and rediscover the magic of your movie memories - Memovies.

**Memovies** is a movie app that blends modern tech with vintage soul — powered by [TMDB API](https://www.themoviedb.org/).

![image](https://github.com/user-attachments/assets/ef45f250-c25a-4c90-86e2-c9f5d5816879)

---

## ✨ Features

**Home Page:**

- This page is a mix of current movies and a nostalgic journey back in time to various years.
- Enter your year of birth and receive tips on movies from that year. You can then click on a link 'Discover more movies' to navigate to /[year]
  
![image](https://github.com/user-attachments/assets/9d681bc2-bd73-4e53-9d06-a66d18e68d3c)

- Browse popular movies from different years, now playing movies and keep up with the latest.

**Movie List (/[year]):**

- Displays a paginated list of movie-cards, first depending on your year of birth but you can also select an age range and retrieve movies from the selected years. The age ranges depend on your current age.
  

![image](https://github.com/user-attachments/assets/36fa0edf-b577-4937-86c4-1ecc3e2184cb)

- Search movies by title (or part of a title)

![image](https://github.com/user-attachments/assets/e3e5f6ab-501d-48a0-8969-8006a82517a5)

- "Sort by" dropdown to sort movies by popularity, rating, vote count release year or movie title (desc or asc).
  
![image](https://github.com/user-attachments/assets/cf8a8b3c-80cc-4691-8865-f79c7e20854f)

- Filter movies by category, release year, rating and/or runtime.

![image](https://github.com/user-attachments/assets/a25a3bb3-7bd0-4e3f-a91e-a8b897d47169)

![image](https://github.com/user-attachments/assets/8f5ffd7b-e098-41e0-9a9b-6f558d8893b2)

- It is possible to clear a specific filter or to clear both the sorting and all filters at once.

![image](https://github.com/user-attachments/assets/fb9ccf1c-55d4-40c7-ae0e-9538478382d7)

![image](https://github.com/user-attachments/assets/615e14c9-0fff-4b4c-84c0-32fc331da579)



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
