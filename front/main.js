document.addEventListener('DOMContentLoaded', () => {
    const brawlers = [
        'Shelly', 'Colt', 'Bull', 'Jessie', 'Nita', 'Brock', 'Dynamike', 'Bo', 'El Primo', 'Barley', 'Poco', 'Rosa', 'Rico', 'Darryl', 'Penny', 'Carl', 'Jacky', 'Piper', 'Pam', 'Frank', 'Bibi', 'Bea', 'Nani', 'Edgar', 'Griff', 'Grom', 'Bonnie', 'Mortis', 'Tara', 'Gene', 'Max', 'Mr. P', 'Sprout', 'Byron', 'Squeak', 'Spike', 'Crow', 'Leon', 'Sandy', 'Amber', 'Meg', 'Gale', 'Surge', 'Colette', 'Lou', 'Colonel Ruffs', 'Belle', 'Buzz', 'Ash', 'Lola', 'Fang', 'Eve', 'Janet', 'Otis', 'Sam', 'Buster', 'Mandy', 'Chester', 'Gray', 'RT', 'Willow', 'Maisie', 'Hank', 'Cordelius', 'Doug', 'Pearl', 'Chuck'
    ];

    const gridContainer = document.getElementById('brawlers-grid');

    brawlers.forEach(brawler => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.innerHTML = `<h3>${brawler}</h3>`;
        gridContainer.appendChild(gridItem);
    });
});