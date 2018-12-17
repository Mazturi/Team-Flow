// Toggle Dropdowns

let listers = document.querySelectorAll('.lister');


for(let lister of listers) {
    
    lister.addEventListener('click', function(e) {
        e.preventDefault();
        let target = document.querySelector('.' + this.getAttribute('data-target'));
        target.classList.toggle('is-open');
    });
}


// Close Dropdown on Document Click

document.addEventListener('click', function(e) {
    if(document.querySelector('.is-open') && !e.target.classList.contains('lister')) {
        document.querySelector('.is-open').classList.remove('is-open');
    }
});

// Sidebar Navigation

let links = document.querySelectorAll('.c-menu__link');

for (let link of links) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.c-menu__link--active').classList.remove('c-menu__link--active');
        this.classList.add('c-menu__link--active');
        let hashval = this.getAttribute('href');
        document.querySelector('.section.active').classList.replace('active', 'hidden');
        let target = document.querySelector(hashval);
        target.classList.replace('hidden', 'active');
    });
}

let selectLaunchers = document.querySelectorAll('.c-select__launcher');

for(let launcher of selectLaunchers) {
    
    launcher.addEventListener('click', function(e) {
        launchSelect(this);
    })
    let options = launcher.nextElementSibling.querySelectorAll('.c-select__option');
    updateSelect(options, launcher);    
}

function updateSelect(options, launcher) {
    for(let option of options) {
        option.addEventListener('click',  function() {
            let val = this.innerText;
            launcher.querySelector('.selection').innerText = val;
            launcher.nextElementSibling.style.display = "none";
            launchSelect(launcher);
            setTimeout(function() {
                launcher.nextElementSibling.style.display = "block";
            }, 50)
        });
    }
}

function launchSelect(launcher) {
    launcher.parentElement.classList.toggle('c-select--launched');
    launcher.classList.toggle('c-select--launcher--active');
    const options = launcher.parentElement.querySelectorAll('.c-select__option');
    let i = 1;
    for(let option of options) {
        i++;
        setTimeout(function() {
            option.classList.toggle('c-select__option--faded');
        }, 100*i)
    }
}

let expand = document.querySelector('.expand');

expand.addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.toggle('spin');
    console.log('hhh');
    
    let sections = document.querySelectorAll('.section');
    
    for(let section of sections) {
        section.classList.toggle('u-condensed');
        document.querySelector('.c-header .wrapper').classList.toggle('u-condensed');
        document.querySelector('.c-sidebar').classList.toggle('condensed');
    }
});

// Chart JS

let meetingsChart = document.querySelector('.chart__meetings').getContext('2d'),
    projectsChart = document.querySelector('.chart__projects').getContext('2d'),
    completedProjectsChart = document.querySelector('.chart__projects--completed').getContext('2d'),
    progressingProjectsChart = document.querySelector('.chart__projects--progressing').getContext('2d'),
    pendingProjectsChart = document.querySelector('.chart__projects--pending').getContext('2d');

Chart.defaults.global.defaultFontFamily = 'barlow';
/*Chart.defaults.global.defaultFontSize = '12';*/
Chart.defaults.global.defaultFontColor = '#777';


let meetings = new Chart(meetingsChart, {
    type: 'bar',
    data: {
        labels: ['Janvier' ,'Février' ,'Mars' ,'Avril' ,'Mai' ,'Juin' ,'Juillet' ,'Août' ,'Septembre' ,'Octobre' ,'Novembre' ,'Décembre'],
        datasets: [{
            label: 'Réunions',
            data: [
                '105', 
                '80', 
                '101', 
                '66', 
                '75', 
                '99', 
                '112', 
                '60', 
                '59', 
                '85', 
                '67', 
                '88' 
            ],
            backgroundColor: '#AC3BFA',
        }]
    },
    options: {
        title:{
            fontSize: 14,
            padding: 15,
            fontStyle: 500,
            display: true,
            text: 'Nombres de réunions par mois'
        },
        legend: {
            display: false,
        }
    },
});

let projects = new Chart(projectsChart, {
    type: 'line',
    data: {
        labels: ["Trimestre 1", "Trimestre 2", "Trimestre 3", "Trimestre 4"],
        datasets: [{
            label: 'Nombre de projets par trimestre',
            data: [2, 3, 3, 5],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        title:{
            fontSize: 14,
            padding: 15,
            fontStyle: 500,
            display: true,
            text: 'Nombres de projets par trimestre en 2018'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        legend: {
            display: false,
        }
    }
});
let completedProjects = new Chart(completedProjectsChart,{
    type: 'pie',
    data: {
        labels: ["aboutis"],
        datasets: [{
            label: 'Nombre annuel des projets',
            backgroundColor: [
                '#AC3BFA',
                '#dddddd'
            ],
            data: [2, 3],
        }] 
    },
    options: {
        title:{
            fontSize: 72,
            padding: 15,
            position: 'right',
            fontStyle: 500,
            display: true,
            text: '200'
        },
        legend: {
            display: false,
        },
        cutoutPercentage: 75,
    }
});
let progressingProjects = new Chart(progressingProjectsChart,{
    type: 'pie',
    data: {
        labels: ["aboutis"],
        datasets: [{
            label: 'Nombre annuel des projets',
            backgroundColor: [
                '#FF4677',
                '#DDDDDD'
            ],
            data: [2, 5],
        }] 
    },
    options: {
        title:{
            fontSize: 72,
            padding: 15,
            position: 'right',
            fontStyle: 500,
            display: true,
            text: '120'
        },
        legend: {
            display: false,
        },
        cutoutPercentage: 75,
    }
});
let pendingProjects = new Chart(pendingProjectsChart,{
    type: 'pie',
    data: {
        labels: ["aboutis"],
        datasets: [{
            label: 'Nombre annuel des projets',
            backgroundColor: [
                '#5A01AB',
                '#dddddd'
            ],
            data: [2, 1],
        }] 
    },
    options: {
        title:{
            fontSize: 72,
            padding: 15,
            position: 'right',
            fontStyle: 500,
            display: true,
            text: '250'
        },
        legend: {
            display: false,
        },
        cutoutPercentage: 75,
    }
});