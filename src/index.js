// Your code here
let url = "http://localhost:3000/films"
//console.log(document.getElementById('films'))
document.getElementsByClassName('film item')[0].remove()
fetchMovies(url)
//Create fetch function
function fetchMovies(url){
    fetch(url)
    .then(response => response.json())
    .then(movies => {
        movies.forEach(movie => {
            displayMovie(movie)
           // console.log(movie)
        });
    })
}
let movieTicketsSold=0;
let movieCapacity=0;
let pointsf;


//to display list of movies
function displayMovie(movie) {
    let movi = document.createElement("li");
    movi.textContent = movie.title;
    movi.runtime = movie.runtime; 
    movi.capacity = movie.capacity; 
    movi.description = movie.description; 
    movi.showtime = movie.showtime; 
    movi.ticketsSold = movie.tickets_sold; 
    movi.poster = movie.poster; 
    movi.className = "filmitem";
    movi.id = movie.id;
    document.getElementById("films").appendChild(movi);
    movi.addEventListener("click", updatetherest);
}

//to add an event listener to every movie
function updatetherest(event) {
    pointsf=event.target
    //console.log(pointsf.capacity)
    const movieTitle = event.target.textContent;
    const movieruntime = event.target.runtime; 
    movieCapacity = event.target.capacity; 
    const movieDescription = event.target.description; 
    const movieShowtime = event.target.showtime; 
    movieTicketsSold = event.target.ticketsSold; 
    const moviePoster = event.target.poster; 
    
    //alert("You clicked the movie with title: " + movieTitle);
    document.getElementById("title").textContent = ("["+movieTitle+"]")
    document.getElementById("runtime").textContent = "["+movieruntime+"] minutes"
    document.getElementById("film-info").textContent = movieDescription
    document.getElementById("showtime").textContent = ("["+movieShowtime+"]")
    document.getElementById("ticket-num").textContent = ("["+(movieCapacity-movieTicketsSold)+"]")
    document.getElementById("poster").src = moviePoster
}
//to add an event listener to the butto
document.getElementById("buy-ticket").addEventListener("click", updatebtn)
function updatebtn(){

    alert("Please note that on every click you are updating the server and its not reversible")
    let ticketssoldsupdate={
        "id":pointsf.id,
        "tickets_sold":movieTicketsSold+1
    }
    //console.log(pointsf.id)
    console.log(ticketssoldsupdate)

    //to update the server
    fetch(url + '/' + pointsf.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(ticketssoldsupdate)
      })
        .then(response => response.json()) 
        .then(data => console.log("Tickets updated successfully:", data))
        .catch(error => console.error("Error updating tickets:", error));




    //to update the available tickets for the movie after sale
    let availableTickets =movieCapacity-movieTicketsSold
    if(availableTickets>1){
        movieTicketsSold +=1;
        availableTickets -=1;

        //console.log("local ticketsold"+pointsf.ticketsSold)

       // this only for the button
        document.getElementById("ticket-num").textContent = "[" + availableTickets + "]";}
    else ((document.getElementById("ticket-num").textContent = "[" + "SOLD OUT!!" + "]")
          (console.log("SOLD OUT!!")))}``

