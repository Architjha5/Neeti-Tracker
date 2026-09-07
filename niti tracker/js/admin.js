const MAIN_ADMIN = "jhaarchit555@gmail.com";

const adminStatus =
document.getElementById("admin-status");

const roleEmail =
document.getElementById("user-email");

const roleSelect =
document.getElementById("user-role");

const governmentLevelGroup =
document.getElementById("government-level-group");

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

const createAdminArea =
document.getElementById("create-admin-area");

const adminManagementSection =
document.getElementById("admin-management-section");

const loginTableBody =
document.getElementById("login-table-body");

const totalLogins =
document.getElementById("total-logins");

const uniqueUsers =
document.getElementById("unique-users");

const latestLogin =
document.getElementById("latest-login");

const clearHistoryButton =
document.getElementById("clear-history");

const logoutButton =
document.getElementById("logout-btn");

/* Current administrator */

const savedUser =
sessionStorage.getItem("nitiUser");

const adminType =
sessionStorage.getItem("nitiAdminType");

if (savedUser === null) {

window.location.href = "login.html";

} else {

try {

    const user = JSON.parse(savedUser);

    if (!user.email) {
        throw new Error("No email");
    }

    const email = user.email.toLowerCase();

    const isMainAdmin =
        email === MAIN_ADMIN.toLowerCase();


    if (!isMainAdmin && adminType !== "additional") {

        window.location.href = "login.html";

    } else {

        if (isMainAdmin) {

            adminStatus.textContent =
                "Main Administrator • Full administrative access";

        } else {

            adminStatus.textContent =
                "Additional Administrator • User management access";
        }

    }

} catch (error) {

    sessionStorage.clear();
    window.location.href = "login.html";

}

}

/* Check whether current admin is main admin */

function isMainAdmin() {

const saved =
    sessionStorage.getItem("nitiUser");

if (saved === null) {
    return false;
}

try {

    const user = JSON.parse(saved);

    return (
        user.email &&
        user.email.toLowerCase() ===
        MAIN_ADMIN.toLowerCase()
    );

} catch (error) {

    return false;
}

}

/* Role selector */

roleSelect.addEventListener("change", function () {

if (roleSelect.value === "government") {

    governmentLevelGroup.style.display =
        "block";

} else {

    governmentLevelGroup.style.display =
        "none";

    governmentLevel.value = "";
}

});

/* Get roles */

function getRoles() {

const saved =
    localStorage.getItem("nitiRoleAssignments");

if (saved === null) {
    return {};
}

try {

    const roles = JSON.parse(saved);

    if (typeof roles === "object") {
        return roles;
    }

    return {};

} catch (error) {

    return {};
}

}

/* Display roles */

function displayRoles() {

const roles = getRoles();

roleTableBody.innerHTML = "";

const emails =
    Object.keys(roles);


if (emails.length === 0) {

    const row =
        document.createElement("tr");

    const cell =
        document.createElement("td");

    cell.colSpan = 3;
    cell.textContent =
        "No manually assigned roles yet.";

    row.appendChild(cell);
    roleTableBody.appendChild(row);

    return;
}


emails.forEach(function (email) {

    const data = roles[email];

    const row =
        document.createElement("tr");

    const emailCell =
        document.createElement("td");

    emailCell.textContent = email;


    const roleCell =
        document.createElement("td");

    roleCell.textContent =
        data.role || "Citizen";


    const levelCell =
        document.createElement("td");

    if (
        data.role === "government" &&
        data.governmentLevel
    ) {

        if (data.governmentLevel === "federal") {
            levelCell.textContent =
                "Federal";
        }

        if (data.governmentLevel === "provincial") {
            levelCell.textContent =
                "Provincial";
        }

        if (data.governmentLevel === "local") {
            levelCell.textContent =
                "Local";
        }

    } else {

        levelCell.textContent = "--";
    }


    row.appendChild(emailCell);
    row.appendChild(roleCell);
    row.appendChild(levelCell);

    roleTableBody.appendChild(row);

});

}

/* Save role */

saveRoleButton.addEventListener("click", function () {

const email =
    roleEmail.value.trim().toLowerCase();

const role =
    roleSelect.value;


if (email === "") {

    roleMessage.style.color = "red";
    roleMessage.textContent =
        "Enter a Gmail address.";

    return;
}


if (!email.includes("@")) {

    roleMessage.style.color = "red";
    roleMessage.textContent =
        "Enter a valid Gmail address.";

    return;
}


if (
    email === MAIN_ADMIN.toLowerCase()
) {

    roleMessage.style.color = "red";
    roleMessage.textContent =
        "The main administrator cannot be changed.";

    return;
}


let level = "";

if (role === "government") {

    level = governmentLevel.value;

    if (level === "") {

        roleMessage.style.color = "red";
        roleMessage.textContent =
            "Select a government level.";

        return;
    }
}


const roles = getRoles();


roles[email] = {
    role: role,
    governmentLevel: level
};


localStorage.setItem(
    "nitiRoleAssignments",
    JSON.stringify(roles)
);


roleMessage.style.color = "green";

roleMessage.textContent =
    "Role assigned successfully.";


displayRoles();

});

/* Get additional admins */

function getAdditionalAdmins() {

const saved =
    localStorage.getItem("nitiAdditionalAdmins");

if (saved === null) {
    return [];
}

try {

    const admins = JSON.parse(saved);

    if (Array.isArray(admins)) {
        return admins;
    }

    return [];

} catch (error) {

    return [];
}

}

/* Save additional admins */

function saveAdditionalAdmins(admins) {

localStorage.setItem(
    "nitiAdditionalAdmins",
    JSON.stringify(admins)
);

}

/* Display admins */

function displayAdditionalAdmins() {

const admins =
    getAdditionalAdmins();

additionalAdminList.innerHTML = "";


if (admins.length === 0) {

    const empty =
        document.createElement("p");

    empty.textContent =
        "No additional administrators.";

    additionalAdminList.appendChild(empty);

    return;
}


admins.forEach(function (admin) {

    const box =
        document.createElement("div");

    box.className =
        "additional-admin-item";


    const email =
        document.createElement("span");

    email.textContent =
        admin.email;


    box.appendChild(email);


    if (isMainAdmin()) {

        const removeButton =
            document.createElement("button");

        removeButton.textContent =
            "Remove";

        removeButton.className =
            "remove-admin";


        removeButton.addEventListener(
            "click",
            function () {

                removeAdditionalAdmin(
                    admin.email
                );

            }
        );


        box.appendChild(removeButton);
    }


    additionalAdminList.appendChild(box);

});

}

/* Create additional admin */

createAdminButton.addEventListener("click", function () {

if (!isMainAdmin()) {

    adminMessage.style.color = "red";
    adminMessage.textContent =
        "Only the main administrator can create admins.";

    return;
}


const email =
    newAdminEmail.value.trim().toLowerCase();


if (email === "") {

    adminMessage.style.color = "red";
    adminMessage.textContent =
        "Enter the new admin's Gmail address.";

    return;
}


if (!email.includes("@")) {

    adminMessage.style.color = "red";
    adminMessage.textContent =
        "Enter a valid Gmail address.";

    return;
}


if (
    email === MAIN_ADMIN.toLowerCase()
) {

    adminMessage.style.color = "red";
    adminMessage.textContent =
        "The main administrator is already protected.";

    return;
}


const admins =
    getAdditionalAdmins();


for (let i = 0; i < admins.length; i++) {

    if (
        admins[i].email.toLowerCase() === email
    ) {

        adminMessage.style.color = "red";
        adminMessage.textContent =
            "This Gmail is already an administrator.";

        return;
    }
}


admins.push({
    email: email
});


saveAdditionalAdmins(admins);


newAdminEmail.value = "";

adminMessage.style.color = "green";

adminMessage.textContent =
    "Additional administrator created.";


displayAdditionalAdmins();

});

/* Remove additional admin */

function removeAdditionalAdmin(email) {

if (!isMainAdmin()) {
    return;
}


const admins =
    getAdditionalAdmins();


const remaining = [];


for (let i = 0; i < admins.length; i++) {

    if (
        admins[i].email.toLowerCase() !==
        email.toLowerCase()
    ) {

        remaining.push(admins[i]);
    }
}


saveAdditionalAdmins(remaining);

displayAdditionalAdmins();

}

/* Login history */

function getLoginHistory() {

const saved =
    localStorage.getItem("nitiLoginHistory");

if (saved === null) {
    return [];
}

try {

    const history = JSON.parse(saved);

    if (Array.isArray(history)) {
        return history;
    }

    return [];

} catch (error) {

    return [];
}

}

function displayLoginHistory() {

const history =
    getLoginHistory();

loginTableBody.innerHTML = "";

totalLogins.textContent =
    history.length;


const users = [];


for (let i = 0; i < history.length; i++) {

    if (
        users.indexOf(history[i].email) === -1
    ) {

        users.push(history[i].email);
    }
}


uniqueUsers.textContent =
    users.length;


if (history.length > 0) {

    latestLogin.textContent =
        history[history.length - 1].loginTime;

} else {

    latestLogin.textContent =
        "--";
}


if (history.length === 0) {

    const row =
        document.createElement("tr");

    const cell =
        document.createElement("td");

    cell.colSpan = 4;
    cell.textContent =
        "No login records yet.";

    row.appendChild(cell);

    loginTableBody.appendChild(row);

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


    const nameCell =
        document.createElement("td");

    nameCell.textContent =
        record.name || "Unknown";


    const emailCell =
        document.createElement("td");

    emailCell.textContent =
        record.email || "Unknown";


    const dateCell =
        document.createElement("td");

    dateCell.textContent =
        record.loginDate || "--";


    const timeCell =
        document.createElement("td");

    timeCell.textContent =
        record.loginTime || "--";


    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(dateCell);
    row.appendChild(timeCell);

    loginTableBody.appendChild(row);

}

}

/* Clear history */

clearHistoryButton.addEventListener(
"click",
function () {

    if (!isMainAdmin()) {

        return;
    }


    const answer =
        window.confirm(
            "Delete all login history?"
        );


    if (answer === true) {

        localStorage.removeItem(
            "nitiLoginHistory"
        );

        displayLoginHistory();
    }

}

);

/* Logout */

logoutButton.addEventListener(
"click",
function () {

    sessionStorage.clear();

    window.location.href =
        "login.html";

}

);

/* Initial state */

if (!isMainAdmin()) {

createAdminArea.style.display =
    "none";

clearHistoryButton.style.display =
    "none";

}

if (!isMainAdmin()) {

adminManagementSection.classList.add(
    "limited-admin"
);

}

displayRoles();
displayAdditionalAdmins();
displayLoginHistory();