const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) => 
    window
        .getComputedStyle(element)
        .getPropertyValue(style)


const initialColors = {
    bg: getStyle(html, "--bg"),
    bgPanel: getStyle(html, "--bg-panel"),
    colorHeadings: getStyle(html, "--color-headings"),
    colorText: getStyle(html, "--color-text"),
}

const darkMode = {
    bg: "#1f1f24",
    bgPanel: "rgba(75, 178, 249, .08)",
    colorHeadings: "#EBEBEB",
    colorText: "#B5B5B5"
}

const transformKey = key => 
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()


const changeColors = (colors) => {
    Object.keys(colors).map(key => 
        html.style.setProperty(transformKey(key), colors[key]) 
    );
}


checkbox.addEventListener("change", ({target}) => {
    if (target.checked) {
        changeColors(darkMode) 
        insertOrEditThemeValue('theme','darkMode')
    } else {
        changeColors(initialColors)
        insertOrEditThemeValue('theme','initialColors')
    }
});


// save or edit on localstorage  
const isExistLocalStorage = (key) =>
    localStorage.getItem(key) != null


const insertOrEditThemeValue = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));

    
const getValueLocalStorage = (key) =>
    JSON.parse(localStorage.getItem(key));



if(!isExistLocalStorage('theme')) 
    insertOrEditThemeValue('theme', 'initialColors');


if (getValueLocalStorage('theme') === "initialColors") {
    checkbox.removeAttribute('checked')
    changeColors(initialColors);
} else {
    checkbox.setAttribute('checked', "")
    changeColors(darkMode);
}