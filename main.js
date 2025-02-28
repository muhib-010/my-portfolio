import { projects } from "./projectsData.js";
const projectsGrid = document.querySelector(".projects-grid")
const hideProjectsDiv = document.querySelector(".hide-projects-div")
const showProjectsBtn = document.querySelector(".show-projects-button")
const projectData = projects
const projectRenderCount = 4
let arrIndex = 0
document.addEventListener("scroll", () => {
    const gradientNameDecoy = document.querySelector(".gradient-name-decoy");
    const gradientName = document.querySelector(".gradient-name");
    const scrollY = window.scrollY;
    console.log(scrollY)
    // Adjust these values based on the design
    const fadeStart = 100; // Scroll position where sliding starts
    const fadeEnd = 600; // Scroll position where sliding completes
    const slideDistance = 500; // Distance to slide to the right

    if (scrollY >= fadeStart && scrollY <= fadeEnd) {
        const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        console.log(progress);
        // Adjust opacity for gradientName
        gradientName.style.opacity = progress >= 0.2 ? progress : 0;
        // Change brightness for gradient name
        gradientNameDecoy.style.filter = `brightness(${1-(progress-0.2)})`
        // Slide and rotate gradientNameDecoy
        gradientNameDecoy.style.transform = `translate(calc(-50% + ${progress * slideDistance}px), -50%)`;
        // Set display to initial as long as progress is not 100%
        gradientNameDecoy.style.display = "initial";
    } else if (scrollY >= fadeEnd) {
        // Completely slid out, set display to none
        gradientNameDecoy.style.transform = `translate(calc(-50% + ${slideDistance}px), 50%)`;
        gradientNameDecoy.style.display = "none"; // Hide the element completely
    } else {
        // Reset to initial state and make it visible
        gradientNameDecoy.style.transform = "translate(-50%, -50%) rotateY(0deg)";
        gradientNameDecoy.style.opacity = "initial"; // Make sure it's visible again
    }
});

window.navExtend = function () {
    console.log("pressed");
    
    const navContainer = document.querySelector('.nav-elem-container'); // Get the navbar container
    const navLinks = document.querySelectorAll(".nav-elem"); // Get all nav elements
    const gradientName = document.querySelector('.gradient-name');
    
    // Toggle the 'show' class on each nav element
    navLinks.forEach(link => {
        link.classList.toggle("show");
    });

    // Toggle the 'nav-elem-container-extend' class on the container
    navContainer.classList.toggle('nav-elem-container-extend');
    gradientName.classList.toggle('hide');
};

let currentIndex = 0; // Tracks the starting point for the next render
let projectShown = false

window.renderProjects = function (projects = projectData) {
    let startIndex = currentIndex;
    let endIndex = startIndex + projectRenderCount;
    let projectsToRender = projects.slice(startIndex, endIndex);
    projectShown = true
    hideProjectsDiv.innerHTML = `<button class="show-projects-button noselect" onclick="hideProjects()">
                                    Hide Projects
                                </button>`
    showProjectsBtn.innerHTML = "Show more"
    projectsToRender.forEach(project => {
        projectsGrid.innerHTML += `
            <a href="${project.url}" target="_blank">
                <div class="project-card">
                    <div class="project-card-grid">
                        <img class="project-image" src="${project.imageSrc}" alt="${project.altText}">
                        <div class="project-info">
                            <p class="project-title">${project.title}</p>
                            <p class="project-description">${project.description}</p>
                        </div>
                    </div>
                </div>
            </a>
        `;
    });

    currentIndex += projectRenderCount; // Move to the next batch

    // Optional: Stop when all projects are rendered
    if (currentIndex >= projects.length) {
        console.log("All projects rendered!");
    }
};

window.hideProjects = function() {
    projectShown = false
    projectsGrid.innerHTML = ``
    hideProjectsDiv.innerHTML = ``
    currentIndex = 0
    showProjectsBtn.innerHTML = "Show projects"
}