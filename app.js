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
let num = 0;
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
            firebase.database().ref('users/' + user.uid)
                .update({ Name: userName, email: user.email })
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
// Logout
const logout = () => {
    firebase.auth().signOut().then(() => { // log-out successful.
        location.reload()
    }).catch((error) => { // An error happened.
    })
};

const setData = () => {
    // Your Teams Check
    firebase.database().ref("Teams/" + firebase.auth().currentUser.uid).once("child_added", (data) => {
        const teamsData = data.val();
        if (teamsData.admin === firebase.auth().currentUser.email) {
            const div = document.createElement("div");
            div.className = "teams";
            div.setAttribute("onclick", "teamReport()");
            for (let i = 0; i < teamsData.members.length; i++) {
                const members = document.createElement("div");
                members.className = "members";
                members.innerHTML = teamsData.members[i] + "<button>X</button>"
                document.getElementById("members-manage").append(members)
            }
            const membersNum = teamsData.members.length - 1;
            if (membersNum === 0) {
                div.innerHTML = `<h3> ${teamsData.teamCategory} </h3> <b>Members:</b> ${teamsData.members[0]}`;
            }
            else {
                div.innerHTML = `<h3> ${teamsData.teamCategory} </h3> <b>Members:</b> ${teamsData.members[0]} and ${membersNum} other`;
            }
            document.getElementById("teams-own").append(div)
    // Set Reports
            setReports(teamsData)
        }
    })
    // Teams you're part of
    firebase.database().ref("cache/" + firebase.auth().currentUser.email.replace(".", "")).once("child_added", (data) => {
        const inviteData = data.val();
        firebase.database().ref("Teams/" + inviteData.admin + "/" + inviteData.teamName).once("value", (data) => {
            const teamData = data.val();
            const div = document.createElement("div");
            div.className = "teams";
            div.setAttribute("onclick", "fillReport()");
            const membersNum = teamData.members.length - 1;
            if (membersNum === 0) {
                div.innerHTML = `<h3> ${teamData.teamCategory} </h3> <b>Members:</b> ${teamData.members[0]}`;
            }
            else {
                div.innerHTML = `<h3> ${teamData.teamCategory} </h3> <b>Members:</b> ${teamData.members[0]} and ${membersNum} other`;
            }
            document.getElementById("q1").innerText = teamData.Questions[0];
            document.getElementById("q2").innerText = teamData.Questions[1];
            document.getElementById("q3").innerText = teamData.Questions[2];
            document.getElementById("teams-in").append(div)
        })
    })
}

const setReports = (teamData) => {
    firebase.database().ref("Reports/" + teamData.members[0].replace(".", "")).once("value", (data) => {
        const reportData = data.val()
        console.log(reportData)
        const report = document.createElement("div");
        const div = document.createElement("div");
        const q1 = reportData.Questions[0];
        const q2 = reportData.Questions[1];
        const q3 = reportData.Questions[2];
        const a1 = reportData.Answers[0];
        const a2 = reportData.Answers[1];
        const a3 = reportData.Answers[2];
        div.innerHTML=`Q.<p>${q1}</p>
                       A.<p>${a1}</p>
                       Q.<p>${q2}</p>
                       A.<p>${a2}</p>
                       Q.<p>${q3}</p>
                       A.<p>${a3}</p>
                       `
        div.className = "report"
        report.innerHTML = `${reportData.name}: ${reportData.Date}`;
        report.append(div)
        document.getElementById("reports").append(report)
    })
}









firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        logged()
        setData()
    } else { }
});
// button functions
const createTeamBtn = () => {
    document.getElementById("popup-bg").removeAttribute("style");
}
const cancelBtn = () => {
    document.getElementById("popup-bg").setAttribute("style", "display:none;");
}
const reportSet = () => {
    document.getElementById("report-set").classList.remove("hide");
    document.getElementById("settings-set").classList.add("hide");
}
const settingsSet = () => {
    document.getElementById("settings-set").classList.remove("hide");
    document.getElementById("report-set").classList.add("hide");

}
const cancel = () => {
    document.getElementById("teams").setAttribute("style", "display:flex;")
    document.getElementById("team-container").classList.add("hide");
}

const reportBack = () => {
    document.getElementById("teams").setAttribute("style", "display:flex;")
    document.getElementById("team-container").classList.add("hide");
    document.getElementById("member-view").classList.add("hide");
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
document.getElementById("report-Date").append(new Date().getDate() + "th " + months[new Date().getMonth()] + " " + new Date().getFullYear());

// const addMember = () => {
//     const member = document.getElementById("add-members").value;
//     firebase.database().ref("Teams/" + "idk").once("value", (data) => {
//         const dataa = data.val();
//         const teamName = dataa.teamName;
//         const teamCategory = dataa.teamCategory;
//         firebase.database().ref("Teams/" + firebase.auth().currentUser.uid + "/" + teamName + "/" + dataa.members).update({
//             members:[member]
//         })
//         firebase.database().ref("cache/" + member.replace(".", "")).push({
//             teamName, teamCategory, admin: firebase.auth().currentUser.uid
//         })
//     })
// }

const createTeam = () => {
    const teamName = document.getElementById("team-name").value;
    const teamCategory = document.getElementById("team-catag").value;
    const members = document.getElementById("add-member").value;
    if (teamName === "" || teamCategory === "Category" || members === "" || !members.endsWith("@gmail.com")) {
        document.getElementById("team-error").innerText = "Fill all fields correctly"
    } else {
        firebase.database().ref("Teams/" + firebase.auth().currentUser.uid + "/" + teamName).update({
            admin: firebase.auth().currentUser.email, teamName, teamCategory, members: [members]
        })
        const member = members.replace(".", "")
        firebase.database().ref("cache/" + member).push({
            teamName, teamCategory, admin: firebase.auth().currentUser.uid
        })
        setTimeout(() => location.reload(), 1000)
    }
}
const teamReport = () => {
    document.getElementById("teams").setAttribute("style", "display:none;")
    document.getElementById("team-container").classList.remove("hide");
}

const fillReport = () => {
    document.getElementById("teams").setAttribute("style", "display:none;")
    document.getElementById("member-view").classList.remove("hide");
}
const settingsSave = () => {
    const questions = document.getElementById("questions")
    const q1 = questions.getElementsByTagName("input")[0].value;
    const q2 = questions.getElementsByTagName("input")[1].value;
    const q3 = questions.getElementsByTagName("input")[2].value;
    firebase.database().ref("Teams/" + firebase.auth().currentUser.uid).once("child_added", (data) => {
        const teamName = data.val().teamName;
        firebase.database().ref("Teams/" + firebase.auth().currentUser.uid + "/" + teamName).update({
            Questions: [q1, q2, q3]
        })
    })
    document.getElementById("teams").setAttribute("style", "display:flex;")
    document.getElementById("team-container").classList.add("hide");
}

const submitReport = () => {
    const a1 = document.getElementById("a1").value;
    const a2 = document.getElementById("a2").value;
    const a3 = document.getElementById("a3").value;
    const q1 = document.getElementById("q1").innerText;
    const q2 = document.getElementById("q2").innerText;
    const q3 = document.getElementById("q3").innerText;
    firebase.database().ref("users/" + firebase.auth().currentUser.uid).once("value", (data) => {
        const name = data.val().Name;
        firebase.database().ref("Reports/" + firebase.auth().currentUser.email.replace(".", "")).update({
            name, Questions: [q1, q2, q3], Answers: [a1, a2, a3], Date: new Date().getDate() + "th " + months[new Date().getMonth()] + " " + new Date().getFullYear()
        })
    })
    document.getElementById("teams").setAttribute("style", "display:flex;")
    document.getElementById("team-container").classList.add("hide");
    document.getElementById("member-view").classList.add("hide");
}