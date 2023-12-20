const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItems = [nav1, nav2, nav3, nav4, nav5]


function navAnimation(remove, add){
    navItems.forEach((nav, index) =>{
        nav.classList.replace(`slide-${remove}-${index+1}`, `slide-${add}-${index+1}`);
    });

}

function toggleNav(){

    // Toggle: Menu Bars Open/Closed
    menuBars.classList.toggle('change');
    // Toggle: Menu Active
    overlay.classList.toggle('overlay-active');
    if(overlay.classList.contains('overlay-active')){
        //Animate In - Overlay
        overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
        // Animate In - Nav items
        navAnimation('out','in');
    } else {
        // Animate Out - Overlay
        overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
        // Animate Out - Nav items
        navAnimation('in','out');
        
    }
}

//Event Listeners 
menuBars.addEventListener('click', toggleNav)
navItems.forEach((nav) =>{
    nav.addEventListener('click', toggleNav);
});


// Fetching repositories from github API

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.github.com/users/mlaskowski7/repos', true)

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  var statusHTML = '';
  $.each(data, function(i, status) {
    if(status.language != null && !status.private){
        statusHTML += '<tr>';
        if(status.language === 'JavaScript' || status.language === 'HTML' || status.language === 'CSS'){
            statusHTML += `<td><a href="https://mlaskowski7.github.io/${status.name}" target ="_blank">${status.name}</a></td>`;
        } else{
            statusHTML += `<td>${status.name}</td>`;
        }
        statusHTML += `<td><a href="https://github.com/mlaskowski7/${status.name}" target ="_blank">${status.language}</a></td>`;
        statusHTML += '</tr>';
    }
    
  });
  $('tbody').html(statusHTML);
}

// Send request
request.send();