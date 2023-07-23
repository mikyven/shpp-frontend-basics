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
let upButton = document.getElementById("up_button")
let outerDiv = document.getElementById("outer_div")
let innerDiv = document.getElementById("inner_div")
let noScrollRectangleButton = document.getElementById("noscroll_rectangle_button")
let noScrollRectangle = document.getElementById("noscroll_rectangle")
let niceFileForm = document.getElementById("nice_file_form")
let niceFileInput = document.getElementById("nice_file_input")
let niceFileInputLabel = document.getElementById("nice_file_input_label")
let niceFileUploadImg = document.getElementById("nice_file_upload_img")
let niceFileResult = document.getElementById("nice_file_result")

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

buttonUnderRedDiv.onmouseover = () => {
    redDiv.classList.remove("hidden")
    buttonUnderRedDiv.style.marginTop = 0
}

buttonUnderRedDiv.onmouseout = () => {
    redDiv.classList.add("hidden")
    buttonUnderRedDiv.style.marginTop = "60px"
}

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
secondEditableDiv.oninput = () => document.cookie = `secondDiv=${secondEditableDiv.innerHTML}`
thirdEditableDiv.oninput = () => sessionStorage.setItem("thirdDiv", thirdEditableDiv.innerHTML)

onload = () => {
    // checkGeolocation()
    firstEditableDiv.innerHTML = localStorage.getItem("firstDiv")
    document.cookie &&= secondEditableDiv.innerHTML = document.cookie.split("=")[1]
    thirdEditableDiv.innerHTML = sessionStorage.getItem("thirdDiv")
    niceFileResult.style.display = "none"
    niceFileInput.value = ""
}

onscroll = () => {
    scrollY < (document.body.scrollHeight - window.innerHeight - 2) && upButton.classList.add("hidden")
    scrollY >= (document.body.scrollHeight - window.innerHeight - 2) && upButton.classList.remove("hidden")
}

upButton.onclick = () => {
    scrollTo(0, 0)
}

outerDiv.addEventListener("click", () => alert("you clicked on outer div"))

innerDiv.addEventListener("click", (e) => {
    e.stopPropagation()
    alert("you clicked on inner div")
})

noScrollRectangleButton.onclick = () => {
    noScrollRectangle.classList.remove("hidden")
}

noScrollRectangle.onmouseover = () => {
    if (!noScrollRectangle.classList.contains("hidden")) {
        console.log(1)
        document.body.style.overflow = "hidden"
    }
}

noScrollRectangle.onclick = () => {
    noScrollRectangle.classList.add("hidden")
    document.body.style.overflow = "visible"
}

document.querySelector("section:nth-child(13) > form").onsubmit = () => {
    return false
}

niceFileForm.ondragover = (e) => {
    e.preventDefault()
    niceFileForm.style.backgroundColor = "#4d4d4d"
    niceFileForm.style.borderColor = "#999999"
    document.querySelector("#nice_file_input_label > span").style.color = "#1d56f0"
}

niceFileForm.ondragleave = (e) => {
    e.preventDefault()
    niceFileForm.style.backgroundColor = "gray"
    niceFileForm.style.borderColor = "#5f5f5f"
}

niceFileForm.ondrop = (e) => {
    e.preventDefault()
    niceFileUploadImg.style.display = "none"
    niceFileForm.style.backgroundColor = "gray"
    niceFileForm.style.borderColor = "#5f5f5f"
    niceFileInputLabel.style.display = "none"
    niceFileResult.style.display = "block"
    document.querySelector("#nice_file_input_label > span").style.color = "#143aa0"
    let files = e.dataTransfer.files
    console.log(files)
    if (files.length > 1) {
        niceFileResult.innerHTML = `You have dragged ${files.length} files`
    }
    else {
        niceFileResult.innerHTML = `You have dragged ${files[0].name}`
    }
}

niceFileForm.onchange = () => {
    niceFileUploadImg.style.display = "none"
    niceFileInputLabel.style.display = "none"
    niceFileResult.style.display = "block"
    files = niceFileInput.files
    if (files.length > 1) {
        niceFileResult.innerHTML = `You have chosen ${files.length} files`
    }
    else {
        niceFileResult.innerHTML = `You have chosen ${files[0].name}`
    }
}