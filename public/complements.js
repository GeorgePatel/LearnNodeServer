document
    .querySelector(".request-complement")
    .addEventListener("click", function() {
        fetch("/complement")
            .then(function(res) {
                return res.json();
            })
            .then(function(data) {
                document.querySelector(".complement").innerText = data.complement;
            })
            .catch(function(err) {
                console.error(err);
            });
    });

document
    .querySelector(".request-insult")
    .addEventListener("click", function() {
        fetch("/insult")
            .then(function(res) {
                return res.json();
            })
            .then(function(data) {
                document.querySelector(".insult").innerText = data.insult;
            })
            .catch(function(err) {
                console.error(err);
            });
    });

const shiba = document.querySelector(".shiba");
const pitbull = document.querySelector(".pitbull");
const shiba_url = "https://dog.ceo/api/breed/shiba/images/random";
const pitbull_url = "https://dog.ceo/api/breed/pitbull/images/random";
const pic_length = 300;

function addNewShiba() {

    if (shiba.hasChildNodes()) {
        shiba.removeChild(shiba.childNodes.item(0));
        // because removing the first element moves the second element to the first index
        shiba.removeChild(shiba.childNodes.item(0));
    }

    const loadingGif = createLoadingGif();
    shiba.appendChild(loadingGif);

    const promise = fetch(shiba_url);
    promise
        .then(function(response) {
            const processingPromise = response.json();
            return processingPromise;
        })
        .then(function(processedResponse) {
            const shiba_pic = createImgTag(processedResponse.message);
            const shiba_msg = createShibaMsg();
            shiba_pic.alt = "Cute shiba";
            shiba_pic.className = "shiba";

            shiba.removeChild(loadingGif);
            shiba.appendChild(shiba_pic);
            shiba.appendChild(shiba_msg);
        });
}

function addNewPitbull() {

    if (pitbull.hasChildNodes()) {
        pitbull.removeChild(pitbull.childNodes.item(0));
        // because removing the first element moves the second element to the first index
        pitbull.removeChild(pitbull.childNodes.item(0));
    }

    const loadingGif = createLoadingGif();
    pitbull.appendChild(loadingGif);

    const promise = fetch(pitbull_url);
    promise
        .then(function(response) {
            const processingPromise = response.json();
            return processingPromise;
        })
        .then(function(processedResponse) {
            const pitbull_pic = createImgTag(processedResponse.message);
            const pitbull_msg = createPitbullLMsg();
            pitbull_pic.alt = "Mean pitbull";
            pitbull_pic.className = "pitbull";

            pitbull.removeChild(loadingGif);
            pitbull.appendChild(pitbull_pic);
            pitbull.appendChild(pitbull_msg);
        });
}

function createImgTag(img_url) {

    const dog_pic = document.createElement("img");
    dog_pic.src = img_url;
    dog_pic.width = pic_length;
    dog_pic.height = pic_length;

    return dog_pic;

}

function createLoadingGif() {

    const img_tag = document.createElement("img");
    img_tag.src = "https://i.gifer.com/VAyR.gif";

    img_tag.width = pic_length;
    img_tag.height = pic_length;
    return img_tag;

}

function createShibaMsg() {
    const msg_tag = document.createElement("p");
    msg_tag.innerText = "Shiba says you'll be alright :D";

    return msg_tag;
}

function createPitbullLMsg() {
    const msg_tag = document.createElement("p");
    msg_tag.innerText = "Pitbull tells you to calm down!";

    return msg_tag;
}

document.querySelector(".request-complement")
    .addEventListener("click", addNewShiba);

document.querySelector(".request-insult")
    .addEventListener("click", addNewPitbull);


import { styler, value, listen, pointer, spring } from "popmotion";

const complementBall = document.querySelector(".request-complement");
const insultBall = document.querySelector(".request-insult");

makeItBounce(complementBall);
makeItBounce(insultBall);

function makeItBounce(ball) {

    const divStyler = styler(ball);
    const ballXY = value({ x: 0, y: 0 }, divStyler.set);

    listen(ball, "mousedown touchstart").start(e => {
        e.preventDefault();
        pointer(ballXY.get()).start(ballXY);
    });

    listen(document, "mouseup touchend").start(() => {
        spring({
            from: ballXY.get(),
            velocity: ballXY.getVelocity(),
            to: { x: 0, y: 0 },
            stiffness: 200
        }).start(ballXY);
    });
}
