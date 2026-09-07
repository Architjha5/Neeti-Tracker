import { app } from "./firebase-config.js";

import {
getAuth,
GoogleAuthProvider,
signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const googleLoginButton = document.getElementById("google-login-btn");
const loginMessage = document.getElementById("login-message");

const MAIN_ADMIN = "jhaarchit555@gmail.com";

function getAdditionalAdmins() {

const savedAdmins =
    localStorage.getItem("nitiAdditionalAdmins");

if (savedAdmins === null) {
    return [];
}

try {

    const admins = JSON.parse(savedAdmins);

    if (Array.isArray(admins)) {
        return admins;
    }

    return [];

} catch (error) {

    return [];
}

}

function isAdditionalAdmin(email) {

const admins = getAdditionalAdmins();
const cleanEmail = email.toLowerCase();

for (let i = 0; i < admins.length; i++) {

    if (
        admins[i].email &&
        admins[i].email.toLowerCase() === cleanEmail
    ) {
        return true;
    }
}

return false;

}

function saveLogin(record) {

let history = [];

const savedHistory =
    localStorage.getItem("nitiLoginHistory");

if (savedHistory !== null) {

    try {

        history = JSON.parse(savedHistory);

        if (!Array.isArray(history)) {
            history = [];
        }

    } catch (error) {

        history = [];
    }
}

history.push(record);

localStorage.setItem(
    "nitiLoginHistory",
    JSON.stringify(history)
);

}

googleLoginButton.addEventListener("click", async function () {

loginMessage.textContent = "";

googleLoginButton.disabled = true;
googleLoginButton.textContent = "Signing in...";


try {

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const loginTime = new Date();

    const userData = {
        uid: user.uid || "",
        name: user.displayName || "",
        email: user.email || "",
        photo: user.photoURL || ""
    };


    sessionStorage.setItem(
        "nitiUser",
        JSON.stringify(userData)
    );


    const loginRecord = {
        uid: user.uid || "",
        name: user.displayName || "Unknown",
        email: user.email || "Unknown",
        loginDate: loginTime.toLocaleDateString(),
        loginTime: loginTime.toLocaleTimeString(),
        timestamp: loginTime.toISOString()
    };


    saveLogin(loginRecord);


    const email = (user.email || "").toLowerCase();


    /* Main admin */

    if (email === MAIN_ADMIN.toLowerCase()) {

        sessionStorage.setItem(
            "nitiAdminType",
            "main"
        );

        sessionStorage.setItem(
            "nitiRole",
            "admin"
        );

        window.location.href = "admin.html";

        return;
    }


    /* Additional admin */

    if (isAdditionalAdmin(email)) {

        sessionStorage.setItem(
            "nitiAdminType",
            "additional"
        );

        sessionStorage.setItem(
            "nitiRole",
            "admin"
        );

        window.location.href = "admin.html";

        return;
    }


    /* Normal user */

    window.location.href = "password.html";


} catch (error) {

    console.error("Google login error:", error);

    loginMessage.style.color = "red";
    loginMessage.textContent =
        "Login failed. Please try again.";

    googleLoginButton.disabled = false;
    googleLoginButton.textContent =
        "Continue with Google";
}

});