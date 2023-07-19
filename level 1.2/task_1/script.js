let firstBlackDiv = document.getElementById("first_div")
let blackDivs = document.querySelectorAll("section:nth-child(2) > .block_row > .black_div")
let hideButtonWithCSS = document.getElementById("hide_button_with_css")
let hideButtonWithJS = document.getElementById("hide_button_with_js")
let hideButtonWithCSSAndJS = document.getElementById("hide_button_with_css_and_js")
let firstHideOrShowButton = document.querySelector("#hide_or_show_button.first")
let secondHideOrShowButton = document.querySelector("#hide_or_show_button.second")
let selectorSubmit = document.getElementById("selector_submit")
let yellowDiv = document.getElementById("yellow_div")
let redDiv = document.getElementById("red_div")
let buttonUnderRedDiv = document.getElementById("button_under_red_div")
let greenDiv = document.getElementById("green_div")
let inputUnderGreenDiv = document.getElementById("input_under_green_div")
let imageButton = document.getElementById("image_button")
let cursorXCoordinates = document.getElementById("cursor_x")
let cursorYcoordinates = document.getElementById("cursor_y")
let language = document.getElementById("language")
let latitude = document.getElementById("latitude")
let longitude = document.getElementById("longitude")
let firstEditableDiv = document.getElementById("first_editable_div")
let secondEditableDiv = document.getElementById("second_editable_div")
let thirdEditableDiv = document.getElementById("third_editable_div")

hideButtonWithCSS.onclick = () => firstBlackDiv.style.display = "none"

hideButtonWithJS.onclick = () => firstBlackDiv.remove()

hideButtonWithCSSAndJS.onclick = () => firstBlackDiv.classList.add("hidden")

firstHideOrShowButton.onclick = () => {
    if (firstBlackDiv.classList.contains("hidden")) {
        firstBlackDiv.classList.remove("hidden")
    }
    else {
        firstBlackDiv.classList.add("hidden")
    }
}

secondHideOrShowButton.onclick = () => {
    for (let i = 0; i < blackDivs.length; i++) {
        if (blackDivs[i].classList.contains("hidden")) {
            blackDivs.forEach(div => div.classList.remove("hidden"))
            break
        }
        else {
            blackDivs.forEach(div => div.classList.add("hidden"))
            break
        }
    }
}

selectorSubmit.onclick = () => {
    let pickedSelector = document.getElementById("selector_input").value
    let selectedElement = document.querySelectorAll(`.third${pickedSelector}`)
    if (selectedElement.length === 1) {
        if (selectedElement.classList.contains("hidden")) {
            selectedElement.classList.remove("hidden")
        }
        else {
            selectedElement.classList.add("hidden")
        }
    }
    else if (selectedElement.length > 1){
        for (let i = 0; i < document.querySelectorAll(`.third${pickedSelector}`).length; i++) {
            if (selectedElement[i].classList.contains("hidden")) {
                selectedElement
                .forEach(element => element.classList.remove("hidden"))
            }
            else {
                selectedElement
                .forEach(element => element.classList.add("hidden"))
            }
        }
    }
    else {
        alert("you can't hide this element")
    }
}

yellowDiv.onclick = () => {
    if (!yellowDiv.classList.contains("clicked")) {
        alert ("Привіт")
        yellowDiv.classList.add("clicked")
    }

    else {
        yellowDiv.classList.add("hidden")
    }
}

buttonUnderRedDiv.onmouseover = () => redDiv.classList.remove("hidden")

buttonUnderRedDiv.onmouseout = () => redDiv.classList.add("hidden")

inputUnderGreenDiv.onfocus = () => greenDiv.classList.remove("hidden")

inputUnderGreenDiv.onblur = () => greenDiv.classList.add("hidden")

inputUnderGreenDiv.oninput = () => greenDiv.classList.add("hidden")

imageButton.onclick = () => {
    imageURLs = document.getElementById("image_input").value.split("\n")
    for (let i = 0; i < imageURLs.length; i++) {
        let image = document.createElement("img");
        image.setAttribute("src", imageURLs[i]);
        image.setAttribute("id", "image")
        document.querySelector("section:nth-child(7)").appendChild(image)
    }
}

onmousemove = (e) => {
    cursorXCoordinates.innerHTML = `X: ${e.x}`
    cursorYcoordinates.innerHTML = `Y: ${e.y}`
}

language.innerHTML = `lang: ${navigator.language}`

showPosition = (position) => {
    latitude.innerHTML = `Ш: ${position.coords.latitude}`
    longitude.innerHTML = `Д: ${position.coords.longitude}`
}

checkGeolocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
    else { 
        latitude.innerHTML = "Geolocation is not supported by this browser."
        longitude.remove()
    }
}


firstEditableDiv.oninput = () => localStorage.setItem("firstDiv", firstEditableDiv.innerHTML)

// secondEditableDiv.oninput = () => document.cookie = `secondDiv=${secondEditableDiv.innerHTML}`

onload = () => {
    // checkGeolocation()
    firstEditableDiv.innerHTML = localStorage.getItem("firstDiv")
    // secondEditableDiv.innerHTML = document.cookie
}