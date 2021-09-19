const firebaseConfig = {
    apiKey: "AIzaSyDDmWQRZhmwdjIQlvYBsDtEPijRJQATZoo",
    authDomain: "balloon-pop-game-1c2d6.firebaseapp.com",
    databaseURL: "https://balloon-pop-game-1c2d6-default-rtdb.firebaseio.com",
    projectId: "balloon-pop-game-1c2d6",
    storageBucket: "balloon-pop-game-1c2d6.appspot.com",
    messagingSenderId: "678600683045",
    appId: "1:678600683045:web:7599e65ad724f5845bd9cc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const login = () => {
    document.getElementById("login-box").classList.remove("hide");
    document.getElementById("back").classList.remove("hide");
    document.getElementById("buttons").removeAttribute("style");
    document.getElementById("signup").className = "hide";
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email === "") {
        return;
    } else {
        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
            var user = userCredential.user;
            logged()
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
    document.getElementById("back").classList.remove("hide");
    document.getElementById("sign-up").classList.remove("hide");
    document.getElementById("buttons").removeAttribute("style");
    document.getElementById("login").className = "hide";
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
        firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
            const user = userCredential.user;
            firebase.firestore().collection('users').doc(user.uid).set({ userName, email }).then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
            logged()
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            document.getElementById("error").innerText = errorMessage;
        });
    }
}
// Logged
const logged = () => {
    document.getElementById("form").className = "hide";
    document.getElementById("logout").classList.remove("hide");
    document.getElementById("game").removeAttribute("style");
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        .get().then((doc) => {
            const data = doc.data();
            document.getElementById("highest-score").innerHTML = `<b>Your Highest Score</b><br>${data.score}`
            document.getElementById("last-logged").innerHTML = `<b>Last Logged: ${data.lastlogged}`
        })

}
// Logout
const logout = () => {
    firebase.auth().signOut().then(() => {
        location.reload()
    })
};

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        logged()
    }
});
// Start
let lifes = 3;
let level = 1;
let score = 0;
const colours = ["red", "blue", "grey", "yellow"]
const clr = colours[Math.round(Math.random() * 3)]

const startGame = () => {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then((doc) => {
        const level_ = doc.data().level;
        if (level_ === 2) {
            level_2(true)
        }
        if (level_ === 3) {
            level_3(true)
        }
    })
    document.getElementById("levels").innerHTML = `<b>Level 1</b><br>Pop all
    ${clr} Balloons`
    document.getElementById("score").innerHTML = `<b>Score:</b>${score}`
    document.getElementById("lifes").innerHTML = `<b>Lifes: ${lifes}</b>`
    for (let i = 0; i < 24; i++) {
        const ballon = document.createElement("div");
        ballon.setAttribute("style", `background:${colours[Math.round(Math.random() * 3)]}`);
        ballon.setAttribute("onmouseover", `pop(${i})`)
        document.getElementById("container").append(ballon);
    }
    changeColour()
    timer(60000)
    document.getElementById("start-game").setAttribute("onclick", "level_2(true)")
    document.getElementById("start-game").innerText = "Next Level";
    document.getElementById("start-game").className = "hide";
}
//Level 2
const level_2 = (boolean) => {
    if (flag) {
        for (let i = 0; i < 24; i++) {
            const container = document.getElementById("container");
            const ballon = container.getElementsByTagName("div")[i];
            ballon.classList.add("hide")
        }
        document.getElementById("start-game").classList.remove("hide")
        flag = false
        return;
    }
    document.getElementById("levels").innerHTML = `<b>Level 2</b><br>Pop all
    ${clr} Balloons faster`
    if (boolean) {
        for (let j = 0; j < 24; j++) {
            const container = document.getElementById("container");
            container.getElementsByTagName("div")[j].classList.remove("hide");
        }
    }
    setTimeout(() => {
        for (let j = 0; j < 24; j++) {
            const container = document.getElementById("container");
            const ballon = container.getElementsByTagName("div")[j];
            ballon.setAttribute("style", `background:${colours[Math.round(Math.random() * 3)]}`)
            ballon.innerText = "";
            ballon.classList.remove("hide")
            ballon.classList.remove("pop")
        }
        level_2(false)
    }, 2000)
    document.getElementById("start-game").setAttribute("onclick", "level_3(true)")
    document.getElementById("start-game").innerText = "Next Level";
    document.getElementById("start-game").className = "hide";
    timer(60000)
}
// level 3
const level_3 = (boolean) => {
    if(flag){
        for (let j = 0; j < 24; j++) {
            const container = document.getElementById("container");
            const ballon = container.getElementsByTagName("div")[j];
            ballon.classList.add("hide");
            container.innerHTML = "<b>You Finished The Game</b>"
            document.getElementById("start-game").setAttribute("onclick", "location.reload();")
            document.getElementById("start-game").innerText = "Play Again";
        }
    }
    document.getElementById("levels").innerHTML = `<b>Level 3</b><br>Pop all
    ${clr} Balloons`
    if(boolean){
        for (let j = 0; j < 24; j++) {
        const container = document.getElementById("container");
        const ballon = container.getElementsByTagName("div")[j];
        ballon.classList.remove("hide")
    }
    }
    setTimeout(() => {
        for (let j = 0; j < 24; j++) {
            const container = document.getElementById("container");
            const ballon = container.getElementsByTagName("div")[j];
            ballon.setAttribute("style", `background:${colours[Math.round(Math.random() * 3)]}`)
            ballon.innerText = "";
            ballon.classList.remove("hide")
            ballon.classList.remove("pop")
        }
        level_3(false)
    }, 1000)
    document.getElementById("start-game").setAttribute("onclick", "level_4(true)")
    document.getElementById("start-game").innerText = "Next Level";
    document.getElementById("start-game").className = "hide";
    timer(60000)
}

const timer = (timer) => {
    setTimeout(() => {
        flag = true;
    }, timer)
}

let flag = false;

// Balloon color changer
const changeColour = () => {
    if (flag) {
        for (let i = 0; i < 24; i++) {
            const container = document.getElementById("container");
            const ballon = container.getElementsByTagName("div")[i];
            ballon.classList.add("hide")
        }
        document.getElementById("start-game").classList.remove("hide")
        flag = false
        return;
    }
    setTimeout(() => {
        for (let j = 0; j < 24; j++) {
            const container = document.getElementById("container");
            const ballon = container.getElementsByTagName("div")[j];
            ballon.setAttribute("style", `background:${colours[Math.round(Math.random() * 3)]}`)
            ballon.innerText = "";
            ballon.classList.remove("pop")
        }
        changeColour()
    }, 3000)
}
// On Pop
const pop = (ballonNum) => {
    const container = document.getElementById("container");
    const ballon = container.getElementsByTagName("div")[ballonNum];
    const ballonNumber = ballonNum;
    if (clr === ballon.getAttribute("style").slice(11)) {
        ballon.setAttribute("style", `color:${ballon.getAttribute("style").slice(11)};`)
        ballon.innerText = "!POP";
        ballon.classList.add("pop")
        score += 10;
    }
    else {
        const container = document.getElementById("container");
        const ballon = container.getElementsByTagName("div")[ballonNum];
        ballon.setAttribute("style", `color:${ballon.getAttribute("style").slice(11)};`)
        ballon.innerText = "!OPPS";
        ballon.classList.add("pop")
        lifes--;
        document.getElementById("lifes").innerHTML = `<b>Lifes: ${lifes}</b>`
    }
    if (lifes === 0) {
        for (let i = 0; i < 24; i++) {
            container.getElementsByTagName("div")[i].classList.add("hide")
        }
        const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then((doc) => {
            const data = doc.data();
            if (data.score <= score) {
                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                    .update({
                        score, level, lastlogged: date
                    })
            }
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                .update({
                    level, lastlogged: date
                })
        })
        const retry = document.getElementById("start-game");
        retry.classList.remove("hide")
        retry.setAttribute("onclick","location.reload();")
        retry.innerText = "Retry";
        container.innerHTML = "<b>Game Over</b>"

    }
    ballon.removeAttribute("onmouseover");
    document.getElementById("score").innerHTML = `<b>Score:</b>${score}`
    setTimeout(() => {
        ballon.setAttribute("onmouseover", `pop(${ballonNumber})`)
    }, 2500)
}