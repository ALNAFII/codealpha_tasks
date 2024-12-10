// References to DOM elements
const projectTitleInput = document.getElementById("projectTitle");
const projectDescriptionInput = document.getElementById("projectDescription");
const fundingGoalInput = document.getElementById("fundingGoal");
const createProjectBtn = document.getElementById("createProjectBtn");
const projectsContainer = document.getElementById("projects");

// Array to store projects
let projects = [];

// Create a new project
createProjectBtn.addEventListener("click", () => {
    const title = projectTitleInput.value.trim();
    const description = projectDescriptionInput.value.trim();
    const goal = parseFloat(fundingGoalInput.value.trim());

    if (!title || !description || isNaN(goal) || goal <= 0) {
        alert("Please fill in all fields correctly!");
        return;
    }

    const project = {
        title,
        description,
        goal,
        raised: 0,
        updates: []
    };

    projects.push(project);
    displayProjects();
    clearInputs();
});

// Display all projects
function displayProjects() {
    projectsContainer.innerHTML = "";

    projects.forEach((project, index) => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");

        projectDiv.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p><strong>Funding Goal:</strong> $${project.goal.toFixed(2)}</p>
            <p><strong>Raised:</strong> $${project.raised.toFixed(2)}</p>

            <div class="progress-bar">
                <div class="progress-bar-inner" style="width: ${(project.raised / project.goal) * 100}%"></div>
            </div>

            <input type="number" placeholder="Contribution Amount ($)" id="contribution${index}" />
            <button onclick="contribute(${index})">Contribute</button>
            
            <h4>Project Updates</h4>
            <div id="updates${index}">
                ${project.updates.map(update => `<p>${update}</p>`).join("")}
            </div>
            <textarea id="updateText${index}" placeholder="Write an update"></textarea>
            <button onclick="addUpdate(${index})">Add Update</button>
        `;

        projectsContainer.appendChild(projectDiv);
    });
}

// Contribute to a project
function contribute(index) {
    const contributionInput = document.getElementById(`contribution${index}`);
    const amount = parseFloat(contributionInput.value.trim());

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid contribution amount!");
        return;
    }

    projects[index].raised += amount;
    displayProjects();
}

// Add an update to a project
function addUpdate(index) {
    const updateText = document.getElementById(`updateText${index}`).value.trim();

    if (!updateText) {
        alert("Please write an update!");
        return;
    }

    projects[index].updates.push(updateText);
    displayProjects();
}

// Clear input fields
function clearInputs() {
    projectTitleInput.value = "";
    projectDescriptionInput.value = "";
    fundingGoalInput.value = "";
}
