const firebaseConfig = {
    apiKey: "AIzaSyC9It5CBbSeaoKZTV-oIjJnYtSRc-wQ9T8",
    authDomain: "team-reporter-app-a74fb.firebaseapp.com",
    projectId: "team-reporter-app-a74fb",
    storageBucket: "team-reporter-app-a74fb.appspot.com",
    messagingSenderId: "757562917969",
    appId: "1:757562917969:web:530205d0d5061dad10e470",
    measurementId: "G-W2V8T7N769"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const login = () => {
    document.getElementById("login-box").classList.remove("hide");
    document.getElementById("buttons").removeAttribute("style");
    document.getElementById("signup").className = "hide";
    document.getElementById("legend").innerText = "Login";
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email === "") {
        return;
    } else {
        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => { // Signed in
            var user = userCredential.user;
            // ...
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            document.getElementById("error").innerText = errorMessage;
        });
    }
}
var num = 0;
const signup = () => {
    document.getElementById("login-box").classList.remove("hide");
    document.getElementById("sign-up").classList.remove("hide");
    document.getElementById("buttons").removeAttribute("style");
    document.getElementById("login").className = "hide";
    document.getElementById("legend").innerText = "Signup ";
    const userName = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    num++;
    if (userName === "") {
        if (num > 1) {
            document.getElementById("error").innerText = "Enter Username";
        }
        return;
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => { // Signed in
            var user = userCredential.user;
            setData(userName)
            logged()
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            document.getElementById("error").innerText = errorMessage;
        });
    }
}
// Logged
const logged = () => {
    document.getElementById("legend").innerText = "Teams";
    document.getElementById("form").className = "hide"
    document.getElementById("teams").style.display = "flex";
    document.getElementById("create-team-btn").classList.remove("hide");
    document.getElementById("logout").classList.remove("hide");
}

const logout = () => {
    firebase.auth().signOut().then(() => { // log-out successful.
        location.reload()
    }).catch((error) => { // An error happened.
    })
};

const setData = (userName) => {
    firebase.auth(user => {
        firebase.database().ref('users/' + user.uid).update({Name: userName, email: user.email})
    })
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        logged()
    } else {}
});

const createTeamBtn = () => {
    document.getElementById("popup-bg").removeAttribute("style");
}
const cancelBtn = () => {
    document.getElementById("popup-bg").setAttribute("style", "display:none;");
}
const reportSet = ()=>{
    document.getElementById("report-set").classList.remove("hide");
    document.getElementById("settings-set").classList.add("hide");
}
const settingsSet = ()=>{
    document.getElementById("settings-set").classList.remove("hide");
    document.getElementById("report-set").classList.add("hide");

}

const createTeam = () => {
    const teamName = document.getElementById("team-name").value;
    const teamCategory = document.getElementById("team-catag").value;
    const addMember = document.getElementById("add-member").value;
    firebase.database().ref("Teams/" + teamName).update({
        teamName, teamCategory
    })
}
