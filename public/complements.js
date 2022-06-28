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

const shiba = document.querySelector(".shiba");
const shiba_url = "https://dog.ceo/api/breed/shiba/images/random";
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
            const shiba_pic = createShibaImgTag(processedResponse.message);
            const shiba_msg = createShibaMsg();

            shiba.removeChild(loadingGif);
            shiba.appendChild(shiba_pic);
            shiba.appendChild(shiba_msg);
        });
}

function createShibaImgTag(img_url) {

    const shiba_pic = document.createElement("img");
    shiba_pic.src = img_url;

    shiba_pic.width = pic_length;
    shiba_pic.height = pic_length;
    shiba_pic.alt = "Cute shiba";
    shiba_pic.className = "shiba";
    return shiba_pic;

}

function createLoadingGif() {

    const img_tag = document.createElement("img");
    img_tag.src = "https://media3.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif";

    img_tag.width = pic_length;
    img_tag.height = pic_length;
    return img_tag;

}

function createShibaMsg() {
    const msg_tag = document.createElement("p");
    msg_tag.innerText = "Shiba says you'll be alright :D";

    return msg_tag;
}

document.querySelector(".request-complement")
    .addEventListener("click", addNewShiba);
