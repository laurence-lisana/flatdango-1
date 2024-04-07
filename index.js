document.addEventListener('DOMContentLoaded', function() {
    var url = 'https://api.npoint.io/f8d1be198a18712d3f29/films/';
    var listHolder = document.getElementById('films');
    var buyTicketBtn = document.getElementById('buy-ticket');

    fetchMovies(url);

    function fetchMovies(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(movies) {
                movies.forEach(function(movie) {
                    displayMovie(movie);
                });
                addClickEvent();
            })
            .catch(function(error) {
                console.error('Error fetching movies:', error);
            });
    }

    function fetchMovieDetails(movieId) {
        fetch(url + movieId)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(movie) {
                setUpMovieDetails(movie);
                buyTicketBtn.textContent = 'Buy Ticket';
            })
            .catch(function(error) {
                console.error('Error fetching movie details:', error);
            });
    }

    function displayMovie(movie) {
        var li = document.createElement('li');
        li.style.cursor = "pointer";
        li.textContent = movie.title.toUpperCase();
        li.addEventListener('click', function() {
            fetchMovieDetails(movie.id);
        });
        listHolder.appendChild(li);
    }

    function setUpMovieDetails(movie) {
        var preview = document.getElementById('poster');
        preview.src = movie.poster;

        document.getElementById('title').textContent = movie.title;
        document.getElementById('runtime').textContent = movie.runtime + ' minutes';
        document.getElementById('film-info').textContent = movie.description;
        document.getElementById('showtime').textContent = movie.showtime;
        var tickets = document.getElementById('ticket-num');
        tickets.textContent = movie.capacity - movie.tickets_sold;
    }
});


