const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password");
const showPasswordButton = document.getElementById("show-password");
const passwordMessage = document.getElementById("password-message");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const dobInput = document.getElementById("dob");

showPasswordButton.addEventListener("click", function () {

if (passwordInput.type === "password") {

    passwordInput.type = "text";
    showPasswordButton.textContent = "Hide";

} else {

    passwordInput.type = "password";
    showPasswordButton.textContent = "Show";
}

});

function getLoggedInUser() {

const savedUser =
    sessionStorage.getItem("nitiUser");

if (savedUser === null) {
    return null;
}

try {
    return JSON.parse(savedUser);
} catch (error) {
    return null;
}

}

function getRoleForEmail(email) {

const savedRoles =
    localStorage.getItem("nitiRoleAssignments");

if (savedRoles === null) {
    return {
        role: "citizen",
        governmentLevel: ""
    };
}

try {

    const roles = JSON.parse(savedRoles);
    const key = email.toLowerCase();

    if (
        roles[key] &&
        roles[key].role
    ) {

        return {
            role: roles[key].role,
            governmentLevel:
                roles[key].governmentLevel || ""
        };
    }

} catch (error) {
    console.error("Role data error:", error);
}

return {
    role: "citizen",
    governmentLevel: ""
};

}

passwordForm.addEventListener("submit", function (event) {

event.preventDefault();


const name = nameInput.value.trim();
const phone = phoneInput.value.trim();
const dob = dobInput.value;
const password = passwordInput.value;


if (name === "") {

    passwordMessage.style.color = "red";
    passwordMessage.textContent =
        "Please enter your name.";

    return;
}


if (phone === "") {

    passwordMessage.style.color = "red";
    passwordMessage.textContent =
        "Please enter your phone number.";

    return;
}


if (dob === "") {

    passwordMessage.style.color = "red";
    passwordMessage.textContent =
        "Please enter your date of birth.";

    return;
}


if (password === "") {

    passwordMessage.style.color = "red";
    passwordMessage.textContent =
        "Please enter your password.";

    return;
}


const user = getLoggedInUser();


if (user === null || !user.email) {

    passwordMessage.style.color = "red";
    passwordMessage.textContent =
        "Please log in with Google again.";

    return;
}


const email = user.email.toLowerCase();

const assigned = getRoleForEmail(email);


const details = {
    uid: user.uid || "",
    email: user.email,
    name: name,
    phone: phone,
    dob: dob
};


/*
 * Do not store the actual password.
 * It is collected here for future authentication work.
 */

sessionStorage.setItem(
    "nitiUserDetails",
    JSON.stringify(details)
);


sessionStorage.setItem(
    "nitiRole",
    assigned.role
);


if (assigned.role === "government") {

    sessionStorage.setItem(
        "governmentLevel",
        assigned.governmentLevel
    );
}


passwordMessage.style.color = "green";


if (assigned.role === "contractor") {

    passwordMessage.textContent =
        "Contractor access granted.";

    setTimeout(function () {

        window.location.href =
            "contractor-home.html";

    }, 500);

    return;
}


if (assigned.role === "judiciary") {

    passwordMessage.textContent =
        "Judiciary access granted.";

    setTimeout(function () {

        window.location.href =
            "judiciary-home.html";

    }, 500);

    return;
}


if (assigned.role === "government") {

    passwordMessage.textContent =
        "Government access granted.";

    setTimeout(function () {

        window.location.href =
            "government-home.html";

    }, 500);

    return;
}


passwordMessage.textContent =
    "Citizen access granted.";

setTimeout(function () {

    window.location.href =
        "citizen-home.html";

}, 500);

});