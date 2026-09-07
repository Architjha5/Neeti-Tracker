const MAIN_ADMIN = "jhaarchit555@gmail.com";


/* ========================= */
/* ELEMENTS */
/* ========================= */

const viewModeButton =
    document.getElementById("view-mode-btn");

const editModeButton =
    document.getElementById("edit-mode-btn");

const viewMode =
    document.getElementById("view-mode");

const editMode =
    document.getElementById("edit-mode");

const adminStatus =
    document.getElementById("admin-status");

const adminBadge =
    document.getElementById("admin-badge");

const logoutButton =
    document.getElementById("logout-btn");


const totalProjects =
    document.getElementById("total-projects");

const activeProjects =
    document.getElementById("active-projects");

const completedProjects =
    document.getElementById("completed-projects");

const totalReviews =
    document.getElementById("total-reviews");


const projectList =
    document.getElementById("project-list");

const projectSearch =
    document.getElementById("project-search");

const projectDetailTitle =
    document.getElementById("project-detail-title");

const projectDetailContent =
    document.getElementById("project-detail-content");


const loginTableBody =
    document.getElementById("login-table-body");


const userEmail =
    document.getElementById("user-email");

const userRole =
    document.getElementById("user-role");

const governmentField =
    document.getElementById("government-field");

const governmentLevel =
    document.getElementById("government-level");

const saveRoleButton =
    document.getElementById("save-role");

const roleMessage =
    document.getElementById("role-message");

const roleTableBody =
    document.getElementById("role-table-body");


const newAdminEmail =
    document.getElementById("new-admin-email");

const createAdminButton =
    document.getElementById("create-admin");

const adminMessage =
    document.getElementById("admin-message");

const additionalAdminList =
    document.getElementById("additional-admin-list");

const additionalAdminControls =
    document.getElementById("additional-admin-controls");


/* ========================= */
/* ADMIN CHECK */
/* ========================= */

function getCurrentUser() {

    const savedUser =
        sessionStorage.getItem("nitiUser");

    if (savedUser === null) {

        window.location.href = "login.html";

        return null;
    }

    try {

        return JSON.parse(savedUser);

    } catch (error) {

        sessionStorage.clear();

        window.location.href = "login.html";

        return null;
    }
}


const currentUser =
    getCurrentUser();


if (currentUser === null) {

    throw new Error("No logged-in user.");

}


const currentEmail =
    (currentUser.email || "").toLowerCase();


const isMainAdmin =
    currentEmail === MAIN_ADMIN.toLowerCase();


let adminType =
    sessionStorage.getItem("nitiAdminType");


if (!isMainAdmin && adminType !== "additional") {

    window.location.href = "login.html";
}


/* ========================= */
/* ADMIN STATUS */
/* ========================= */

if (isMainAdmin) {

    adminBadge.textContent =
        "Main Administrator";

    adminStatus.textContent =
        "Full administrative access";

} else {

    adminBadge.textContent =
        "Additional Administrator";

    adminStatus.textContent =
        "User management access";
}


/* ========================= */
/* MODE SWITCHING */
/* ========================= */

viewModeButton.addEventListener(
    "click",
    function () {

        viewMode.classList.remove("hidden");
        editMode.classList.add("hidden");

        viewModeButton.classList.add("active");
        editModeButton.classList.remove("active");

    }
);


editModeButton.addEventListener(
    "click",
    function () {

        viewMode.classList.add("hidden");
        editMode.classList.remove("hidden");

        viewModeButton.classList.remove("active");
        editModeButton.classList.add("active");

    }
);


/* ========================= */
/* DEMO PROJECT DATA */
/* ========================= */

const projects = [

    {
        id: 1,

        name: "Janakpur Road Improvement Project",

        category: "Infrastructure",

        location: "Janakpur, Madhesh Province",

        contractor: "Himalayan Infrastructure Pvt. Ltd.",

        government: "Department of Roads",

        budget: "NPR 4.8 Cr",

        progress: 100,

        status: "Completed",

        startDate: "2025-02-10",

        expectedCompletion: "2026-01-15",

        updates: [

            {
                date: "2026-01-15",
                title: "Project Completed",
                description:
                    "Final construction and inspection completed."
            },

            {
                date: "2025-11-20",
                title: "Road Construction Completed",
                description:
                    "Main road construction reached 100 percent."
            },

            {
                date: "2025-06-10",
                title: "Construction Started",
                description:
                    "Primary construction work officially began."
            }

        ],

        reviews: [

            {
                user: "Citizen A",
                rating: 5,
                text:
                    "The road condition has improved significantly."
            },

            {
                user: "Citizen B",
                rating: 4,
                text:
                    "Good improvement, although drainage could be better."
            }

        ]

    },


    {
        id: 2,

        name: "Community School Renovation",

        category: "Education",

        location: "Dhanusha, Madhesh Province",

        contractor: "Janaki Construction Group",

        government: "Education Development Office",

        budget: "NPR 2.2 Cr",

        progress: 68,

        status: "In Progress",

        startDate: "2025-08-01",

        expectedCompletion: "2026-12-30",

        updates: [

            {
                date: "2026-08-25",
                title: "Roof Renovation Completed",
                description:
                    "Roof repair and structural reinforcement completed."
            },

            {
                date: "2026-05-10",
                title: "Renovation Work Started",
                description:
                    "Renovation activities started in the main school building."
            }

        ],

        reviews: [

            {
                user: "Parent A",
                rating: 5,
                text:
                    "The school environment is becoming much better."
            },

            {
                user: "Citizen C",
                rating: 4,
                text:
                    "Progress looks good so far."
            }

        ]

    },


    {
        id: 3,

        name: "Urban Drinking Water Project",

        category: "Water Supply",

        location: "Janakpur, Madhesh Province",

        contractor: "Madhesh Water Solutions",

        government: "Urban Development Office",

        budget: "NPR 3.6 Cr",

        progress: 52,

        status: "In Progress",

        startDate: "2026-01-15",

        expectedCompletion: "2027-04-10",

        updates: [

            {
                date: "2026-07-12",
                title: "Pipeline Installation",
                description:
                    "Approximately half of the primary pipeline network installed."
            },

            {
                date: "2026-02-02",
                title: "Project Started",
                description:
                    "Initial survey and pipeline preparation began."
            }

        ],

        reviews: [

            {
                user: "Citizen D",
                rating: 3,
                text:
                    "The project is useful but progress appears slow."
            }

        ]

    }

];


/* ========================= */
/* PROJECT STATS */
/* ========================= */

function updateProjectStats() {

    let active = 0;
    let completed = 0;
    let reviews = 0;


    projects.forEach(function (project) {

        if (project.status === "Completed") {
            completed++;
        } else {
            active++;
        }

        reviews += project.reviews.length;

    });


    totalProjects.textContent =
        projects.length;

    activeProjects.textContent =
        active;

    completedProjects.textContent =
        completed;

    totalReviews.textContent =
        reviews;
}


/* ========================= */
/* DISPLAY PROJECTS */
/* ========================= */

function displayProjects(list) {

    projectList.innerHTML = "";


    if (list.length === 0) {

        const empty =
            document.createElement("p");

        empty.textContent =
            "No projects found.";

        projectList.appendChild(empty);

        return;
    }


    list.forEach(function (project) {

        const card =
            document.createElement("div");

        card.className =
            "project-card";


        if (
            projectDetailTitle.textContent ===
            project.name
        ) {
            card.classList.add("selected");
        }


        const top =
            document.createElement("div");

        top.className =
            "project-card-top";


        const category =
            document.createElement("span");

        category.className =
            "project-category";

        category.textContent =
            project.category;


        const status =
            document.createElement("span");

        status.className =
            "project-status";


        if (project.status === "Completed") {

            status.classList.add(
                "status-completed"
            );

        } else {

            status.classList.add(
                "status-active"
            );

        }


        status.textContent =
            project.status;


        top.appendChild(category);
        top.appendChild(status);


        const title =
            document.createElement("h3");

        title.textContent =
            project.name;


        const location =
            document.createElement("p");

        location.className =
            "project-location";

        location.textContent =
            project.location;


        const bottom =
            document.createElement("div");

        bottom.className =
            "project-card-bottom";


        const budget =
            document.createElement("div");

        const budgetLabel =
            document.createElement("span");

        budgetLabel.textContent =
            "Budget";

        const budgetValue =
            document.createElement("strong");

        budgetValue.textContent =
            project.budget;

        budget.appendChild(budgetLabel);
        budget.appendChild(budgetValue);


        const progress =
            document.createElement("div");

        const progressLabel =
            document.createElement("span");

        progressLabel.textContent =
            "Progress";

        const progressValue =
            document.createElement("strong");

        progressValue.textContent =
            project.progress + "%";

        progress.appendChild(progressLabel);
        progress.appendChild(progressValue);


        bottom.appendChild(budget);
        bottom.appendChild(progress);


        const progressLine =
            document.createElement("div");

        progressLine.className =
            "progress-line";


        const progressFill =
            document.createElement("div");

        progressFill.className =
            "progress-line-fill";

        progressFill.style.width =
            project.progress + "%";


        progressLine.appendChild(
            progressFill
        );


        card.appendChild(top);
        card.appendChild(title);
        card.appendChild(location);
        card.appendChild(bottom);
        card.appendChild(progressLine);


        card.addEventListener(
            "click",
            function () {

                showProjectDetails(project);

            }
        );


        projectList.appendChild(card);

    });

}


/* ========================= */
/* PROJECT DETAILS */
/* ========================= */

function showProjectDetails(project) {

    projectDetailTitle.textContent =
        project.name;


    projectDetailContent.innerHTML =
        "";


    const detailGrid =
        document.createElement("div");

    detailGrid.className =
        "detail-grid";


    createDetailBox(
        detailGrid,
        "Budget",
        project.budget
    );

    createDetailBox(
        detailGrid,
        "Contractor",
        project.contractor
    );

    createDetailBox(
        detailGrid,
        "Government Body",
        project.government
    );

    createDetailBox(
        detailGrid,
        "Progress",
        project.progress + "%"
    );

    createDetailBox(
        detailGrid,
        "Start Date",
        project.startDate
    );

    createDetailBox(
        detailGrid,
        "Expected Completion",
        project.expectedCompletion
    );

    createDetailBox(
        detailGrid,
        "Status",
        project.status
    );

    createDetailBox(
        detailGrid,
        "Location",
        project.location
    );


    projectDetailContent.appendChild(
        detailGrid
    );


    const historySection =
        document.createElement("div");

    historySection.className =
        "history-section";


    const historyHeading =
        document.createElement("h3");

    historyHeading.textContent =
        "Update History";


    historySection.appendChild(
        historyHeading
    );


    project.updates.forEach(
        function (update) {

            const item =
                document.createElement("div");

            item.className =
                "history-item";


            const dot =
                document.createElement("div");

            dot.className =
                "history-dot";


            const date =
                document.createElement("div");

            date.className =
                "history-date";

            date.textContent =
                update.date;


            const title =
                document.createElement("div");

            title.className =
                "history-title";

            title.textContent =
                update.title;


            const description =
                document.createElement("div");

            description.className =
                "history-description";

            description.textContent =
                update.description;


            item.appendChild(dot);
            item.appendChild(date);
            item.appendChild(title);
            item.appendChild(description);


            historySection.appendChild(item);

        }
    );


    projectDetailContent.appendChild(
        historySection
    );


    const reviewSection =
        document.createElement("div");

    reviewSection.className =
        "review-section";


    const reviewHeading =
        document.createElement("h3");

    reviewHeading.textContent =
        "Citizen Reviews";


    reviewSection.appendChild(
        reviewHeading
    );


    if (project.reviews.length === 0) {

        const noReviews =
            document.createElement("p");

        noReviews.textContent =
            "No reviews yet.";

        reviewSection.appendChild(
            noReviews
        );

    } else {

        project.reviews.forEach(
            function (review) {

                const reviewCard =
                    document.createElement("div");

                reviewCard.className =
                    "review-card";


                const reviewTop =
                    document.createElement("div");

                reviewTop.className =
                    "review-top";


                const user =
                    document.createElement("span");

                user.className =
                    "review-user";

                user.textContent =
                    review.user;


                const rating =
                    document.createElement("span");

                rating.className =
                    "review-rating";

                rating.textContent =
                    "★".repeat(review.rating);


                reviewTop.appendChild(user);
                reviewTop.appendChild(rating);


                const text =
                    document.createElement("p");

                text.className =
                    "review-text";

                text.textContent =
                    review.text;


                reviewCard.appendChild(
                    reviewTop
                );

                reviewCard.appendChild(
                    text
                );


                reviewSection.appendChild(
                    reviewCard
                );

            }
        );

    }


    projectDetailContent.appendChild(
        reviewSection
    );


    displayProjects(
        getFilteredProjects()
    );

}


/* ========================= */
/* DETAIL BOX */
/* ========================= */

function createDetailBox(
    parent,
    label,
    value
) {

    const box =
        document.createElement("div");

    box.className =
        "detail-box";


    const labelElement =
        document.createElement("span");

    labelElement.textContent =
        label;


    const valueElement =
        document.createElement("strong");

    valueElement.textContent =
        value;


    box.appendChild(
        labelElement
    );

    box.appendChild(
        valueElement
    );


    parent.appendChild(box);
}


/* ========================= */
/* SEARCH */
/* ========================= */

function getFilteredProjects() {

    const query =
        projectSearch.value
            .trim()
            .toLowerCase();


    if (query === "") {

        return projects;
    }


    return projects.filter(
        function (project) {

            return (
                project.name
                    .toLowerCase()
                    .includes(query) ||

                project.location
                    .toLowerCase()
                    .includes(query) ||

                project.category
                    .toLowerCase()
                    .includes(query)
            );

        }
    );
}


projectSearch.addEventListener(
    "input",
    function () {

        displayProjects(
            getFilteredProjects()
        );

    }
);


/* ========================= */
/* LOGIN HISTORY */
/* ========================= */

function getLoginHistory() {

    const saved =
        localStorage.getItem(
            "nitiLoginHistory"
        );


    if (saved === null) {
        return [];
    }


    try {

        const data =
            JSON.parse(saved);

        if (Array.isArray(data)) {
            return data;
        }

        return [];

    } catch (error) {

        return [];
    }
}


function displayLoginHistory() {

    const history =
        getLoginHistory();


    loginTableBody.innerHTML =
        "";


    if (history.length === 0) {

        const row =
            document.createElement("tr");

        const cell =
            document.createElement("td");

        cell.colSpan = 4;

        cell.textContent =
            "No login records yet.";

        row.appendChild(cell);

        loginTableBody.appendChild(
            row
        );

        return;
    }


    for (
        let i = history.length - 1;
        i >= 0;
        i--
    ) {

        const record =
            history[i];


        const row =
            document.createElement("tr");


        const name =
            document.createElement("td");

        name.textContent =
            record.name || "Unknown";


        const email =
            document.createElement("td");

        email.textContent =
            record.email || "Unknown";


        const date =
            document.createElement("td");

        date.textContent =
            record.loginDate || "--";


        const time =
            document.createElement("td");

        time.textContent =
            record.loginTime || "--";


        row.appendChild(name);
        row.appendChild(email);
        row.appendChild(date);
        row.appendChild(time);


        loginTableBody.appendChild(row);

    }

}


/* ========================= */
/* USER ROLES */
/* ========================= */

function getRoleAssignments() {

    const saved =
        localStorage.getItem(
            "nitiRoleAssignments"
        );


    if (saved === null) {
        return {};
    }


    try {

        return JSON.parse(saved);

    } catch (error) {

        return {};
    }
}


function saveRoleAssignments(data) {

    localStorage.setItem(
        "nitiRoleAssignments",
        JSON.stringify(data)
    );

}


function displayRoles() {

    const roles =
        getRoleAssignments();


    roleTableBody.innerHTML =
        "";


    const emails =
        Object.keys(roles);


    if (emails.length === 0) {

        const row =
            document.createElement("tr");

        const cell =
            document.createElement("td");

        cell.colSpan = 4;

        cell.textContent =
            "No user roles assigned yet.";

        row.appendChild(cell);

        roleTableBody.appendChild(row);

        return;
    }


    emails.forEach(
        function (email) {

            const data =
                roles[email];


            const row =
                document.createElement("tr");


            const emailCell =
                document.createElement("td");

            emailCell.textContent =
                email;


            const roleCell =
                document.createElement("td");

            roleCell.textContent =
                data.role;


            const levelCell =
                document.createElement("td");

            if (
                data.role === "government" &&
                data.governmentLevel
            ) {

                if (
                    data.governmentLevel ===
                    "federal"
                ) {

                    levelCell.textContent =
                        "Federal";

                } else if (
                    data.governmentLevel ===
                    "provincial"
                ) {

                    levelCell.textContent =
                        "Provincial";

                } else {

                    levelCell.textContent =
                        "Local";
                }

            } else {

                levelCell.textContent =
                    "--";
            }


            const actionCell =
                document.createElement("td");


            const removeButton =
                document.createElement("button");

            removeButton.className =
                "remove-role-button";

            removeButton.textContent =
                "Remove Role";


            removeButton.addEventListener(
                "click",
                function () {

                    if (email ===
                        MAIN_ADMIN.toLowerCase()
                    ) {

                        return;
                    }


                    const currentRoles =
                        getRoleAssignments();


                    delete currentRoles[email];


                    saveRoleAssignments(
                        currentRoles
                    );


                    displayRoles();

                }
            );


            actionCell.appendChild(
                removeButton
            );


            row.appendChild(emailCell);
            row.appendChild(roleCell);
            row.appendChild(levelCell);
            row.appendChild(actionCell);


            roleTableBody.appendChild(row);

        }
    );

}


/* ========================= */
/* GOVERNMENT FIELD */
/* ========================= */

userRole.addEventListener(
    "change",
    function () {

        if (
            userRole.value ===
            "government"
        ) {

            governmentField.style.display =
                "block";

        } else {

            governmentField.style.display =
                "none";

            governmentLevel.value =
                "";
        }

    }
);


/* ========================= */
/* SAVE ROLE */
/* ========================= */

saveRoleButton.addEventListener(
    "click",
    function () {

        const email =
            userEmail.value
                .trim()
                .toLowerCase();


        const role =
            userRole.value;


        if (
            email === "" ||
            !email.includes("@")
        ) {

            roleMessage.style.color =
                "red";

            roleMessage.textContent =
                "Enter a valid Gmail address.";

            return;
        }


        if (
            email ===
            MAIN_ADMIN.toLowerCase()
        ) {

            roleMessage.style.color =
                "red";

            roleMessage.textContent =
                "The main administrator cannot be changed.";

            return;
        }


        let level = "";


        if (
            role === "government"
        ) {

            level =
                governmentLevel.value;


            if (level === "") {

                roleMessage.style.color =
                    "red";

                roleMessage.textContent =
                    "Select a government level.";

                return;
            }

        }


        const roles =
            getRoleAssignments();


        roles[email] = {

            role: role,

            governmentLevel:
                level
        };


        saveRoleAssignments(
            roles
        );


        roleMessage.style.color =
            "green";

        roleMessage.textContent =
            "Role assigned successfully.";


        displayRoles();

    }
);


/* ========================= */
/* ADDITIONAL ADMINS */
/* ========================= */

function getAdditionalAdmins() {

    const saved =
        localStorage.getItem(
            "nitiAdditionalAdmins"
        );


    if (saved === null) {
        return [];
    }


    try {

        const data =
            JSON.parse(saved);

        if (Array.isArray(data)) {
            return data;
        }

        return [];

    } catch (error) {

        return [];
    }
}


function saveAdditionalAdmins(
    admins
) {

    localStorage.setItem(
        "nitiAdditionalAdmins",
        JSON.stringify(admins)
    );

}


function displayAdditionalAdmins() {

    const admins =
        getAdditionalAdmins();


    additionalAdminList.innerHTML =
        "";


    if (admins.length === 0) {

        const empty =
            document.createElement("p");

        empty.textContent =
            "No additional administrators.";

        empty.style.color =
            "#7b8798";

        empty.style.fontSize =
            "12px";

        additionalAdminList.appendChild(
            empty
        );

        return;
    }


    admins.forEach(
        function (admin) {

            const item =
                document.createElement("div");

            item.className =
                "additional-admin-item";


            const email =
                document.createElement("span");

            email.className =
                "additional-admin-email";

            email.textContent =
                admin.email;


            item.appendChild(email);


            /*
             * Only the MAIN ADMIN
             * receives the remove button.
             */

            if (isMainAdmin) {

                const remove =
                    document.createElement(
                        "button"
                    );

                remove.className =
                    "remove-admin";

                remove.textContent =
                    "Remove";


                remove.addEventListener(
                    "click",
                    function () {

                        removeAdditionalAdmin(
                            admin.email
                        );

                    }
                );


                item.appendChild(remove);
            }


            additionalAdminList.appendChild(
                item
            );

        }
    );

}


/* ========================= */
/* CREATE ADMIN */
/* ========================= */

createAdminButton.addEventListener(
    "click",
    function () {

        if (!isMainAdmin) {

            adminMessage.style.color =
                "red";

            adminMessage.textContent =
                "Only the main administrator can create admins.";

            return;
        }


        const email =
            newAdminEmail.value
                .trim()
                .toLowerCase();


        if (
            email === "" ||
            !email.includes("@")
        ) {

            adminMessage.style.color =
                "red";

            adminMessage.textContent =
                "Enter a valid Gmail address.";

            return;
        }


        if (
            email ===
            MAIN_ADMIN.toLowerCase()
        ) {

            adminMessage.style.color =
                "red";

            adminMessage.textContent =
                "The main administrator already exists.";

            return;
        }


        const admins =
            getAdditionalAdmins();


        for (
            let i = 0;
            i < admins.length;
            i++
        ) {

            if (
                admins[i].email.toLowerCase() ===
                email
            ) {

                adminMessage.style.color =
                    "red";

                adminMessage.textContent =
                    "This user is already an administrator.";

                return;
            }

        }


        admins.push({
            email: email
        });


        saveAdditionalAdmins(
            admins
        );


        newAdminEmail.value =
            "";


        adminMessage.style.color =
            "green";

        adminMessage.textContent =
            "Additional administrator created.";


        displayAdditionalAdmins();

    }
);


/* ========================= */
/* REMOVE ADMIN */
/* ========================= */

function removeAdditionalAdmin(
    email
) {

    if (!isMainAdmin) {
        return;
    }


    const admins =
        getAdditionalAdmins();


    const remaining =
        admins.filter(
            function (admin) {

                return (
                    admin.email.toLowerCase() !==
                    email.toLowerCase()
                );

            }
        );


    saveAdditionalAdmins(
        remaining
    );


    displayAdditionalAdmins();

}


/* ========================= */
/* LIMIT ADDITIONAL ADMINS */
/* ========================= */

if (!isMainAdmin) {

    additionalAdminControls.style.display =
        "none";

}


/* ========================= */
/* LOGOUT */
/* ========================= */

logoutButton.addEventListener(
    "click",
    function () {

        sessionStorage.clear();

        window.location.href =
            "login.html";

    }
);


/* ========================= */
/* INITIALIZE */
/* ========================= */

governmentField.style.display =
    "none";

updateProjectStats();

displayProjects(projects);

displayLoginHistory();

displayRoles();

displayAdditionalAdmins();