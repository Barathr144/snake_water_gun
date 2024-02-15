const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loses: 0,
  ties: 0
}

function playRound(playerMove) {
  const gameMoves = {
     snake: 1 / 3, 
     water: 1 / 3,
     gun: 1 / 3
  };

  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber < gameMoves.snake) {
     computerMove = 'snake';
  } else if (randomNumber < gameMoves.snake + gameMoves.water) {
     computerMove = 'water';
  } else {
     computerMove = 'gun';
  }

  let result = '';

  if (playerMove === computerMove) {
     result = 'Tie.';
  } else if (
     (playerMove === 'snake' && computerMove === 'water') ||
     (playerMove === 'water' && computerMove === 'gun') || 
     (playerMove === 'gun' && computerMove === 'snake')
     ) {
     result = 'You win.';
  } else {
     result = 'You lose.';
  }
  if (result === 'You win.') {
     score.wins = score.wins + 1;
  } else if (result === 'You lose.') {
     score.loses += 1;
  } else if (result === 'Tie.') {
     score.ties = score.ties + 1;
  }
  console.log('computermove');

  
  localStorage.setItem('score',JSON.stringify(score));
  alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
     Wins = ${score.wins} Loses =${score.loses} Ties =${score.ties}`);
}

function resetScore() {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0; 
  
  alert('All the scores are reset to 0. The current score is Zero');

}

const ratingIcons = document.querySelectorAll('.rating i');
const ratingContainer = document.querySelector('.rating');

ratingIcons.forEach((icon, index) => {
    icon.addEventListener('mouseover', () => {
        highlightStars(index);
    });

    icon.addEventListener('click', () => {
        setRating(index + 1);
    });
});

ratingContainer.addEventListener('mouseleave', () => {
    const currentRating = parseInt(ratingContainer.dataset.rating);
    highlightStars(currentRating - 1);
});

function highlightStars(index) {
    ratingIcons.forEach((icon, i) => {
        if (i <= index) {
            icon.textContent = 'star';
        } else {
            icon.textContent = 'star_border';
        }
    });
}

function setRating(rating) {
    ratingContainer.dataset.rating = rating;
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_rating.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        
        console.log(xhr.responseText);
    };
    xhr.send('rating=' + rating);
}

