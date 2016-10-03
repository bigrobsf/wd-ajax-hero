(function() {
  'use strict';

  var movies = [];

  var renderMovies = function() {
    $('#listings').empty();

    for (var movie of movies) {
      var $col = $('<div class="col s6">');
      var $card = $('<div class="card hoverable">');
      var $content = $('<div class="card-content center">');
      var $title = $('<h6 class="card-title truncate">');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50, });
      $title.text(movie.title);

      var $poster = $('<img class="poster">');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      var $action = $('<div class="card-action center">');
      var $plot = $('<a class="waves-effect waves-light btn modal-trigger">');

      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      var $modal = $(`<div id="${movie.id}" class="modal">`);
      var $modalContent = $('<div class="modal-content">');
      var $modalHeader = $('<h4>').text(movie.title);
      var $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      var $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  window.onload = function() {
    document.getElementsByTagName('button')[0].addEventListener('click', doAjax);
  }

  function doAjax(event) {
    event.preventDefault();

    let searchWord = document.getElementById('search').value;

    if (searchWord.length === 0) return false;

    // The object we use to start the AJAX request using JQuery's format
    let requestObject = {
      url: `https://www.omdbapi.com/?s=${searchWord}&y=&r=json`,
      method: "GET",
      success: handleSuccess
    };

    // Actually start the AJAX request
    $.ajax(requestObject);
  }
  // The event handler for a successful ajax request, used in doAjax
  function handleSuccess(data) {
    let movieArray = data["Search"];

    movies = [];

    var Movie = function(id, poster, title, year) {
      this.id = id || "";
      this.poster = poster || "";
      this.title = title || "";
      this.year = year || "";
      this.plot = "";
    }

    for (var i = 0; i < movieArray.length; i++) {
      var movieElement = new Movie (movieArray[i].imdbID, movieArray[i].Poster,
        movieArray[i].Title, movieArray[i].Year);

      // movieElement.plot = getPlot(movieArray[i].imdbID);

      movies.push(movieElement);

    }

    document.getElementById('search').value = "";

    // let inputField = document.getElementById('search');
    // inputField.reset();

    renderMovies();
  }

  // function getPlot(imdbID) {
  //   return $.ajax({
  //     method: "GET",
  //     url: "http://omdbapi.com/?i=${imdbID}",
  //     // url: "http://omdbapi.com/?i=tt1392190",
  //     // url: "http://omdbapi.com/?i=${imdbID}&plot=full&r=json",
  //     success: function(info) {
  //       console.log(info.Plot);
  //     },
  //     error: function(err){
  //       console.log("FAIL")
  //       console.log(err)
  //     }
  //   });
  // }

})();
