const api_key = "YOUR_TMDB_API_KEY"; // Get this from themoviedb.org
const base_url = "https://api.themoviedb.org/3";
const img_url = "https://image.tmdb.org/t/p/original";

const requests = {
    fetchTrending: `${base_url}/trending/all/week?api_key=${api_key}&language=en-US`,
    fetchNetflixOriginals: `${base_url}/discover/tv?api_key=${api_key}&with_networks=213`,
};

// Fetch the Hero Banner
fetch(requests.fetchNetflixOriginals)
    .then((res) => res.json())
    .then((data) => {
        const setMovie = data.results[Math.floor(Math.random() * data.results.length - 1)];
        document.getElementById("banner").style.backgroundImage = `url(${img_url}${setMovie.backdrop_path})`;
        document.getElementById("banner_title").innerText = setMovie.name || setMovie.title;
        document.getElementById("banner_description").innerText = setMovie.overview.substring(0, 150) + "...";
    });

// Create Movie Rows
function createRow(title, fetchUrl) {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row";
    
    const rowTitle = document.createElement("h2");
    rowTitle.innerText = title;
    row.appendChild(rowTitle);

    const posters = document.createElement("div");
    posters.className = "row_posters";
    row.appendChild(posters);

    fetch(fetchUrl)
        .then((res) => res.json())
        .then((data) => {
            data.results.forEach((movie) => {
                const img = document.createElement("img");
                img.className = "row_poster";
                img.src = `${img_url}${movie.poster_path}`;
                posters.appendChild(img);
            });
        });
    headrow.appendChild(row);
}

createRow("NETFLIX ORIGINALS", requests.fetchNetflixOriginals);
createRow("Trending Now", requests.fetchTrending);