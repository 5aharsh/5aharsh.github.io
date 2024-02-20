function openContainer(container) {
    document.getElementById(container).style.height = "100%";
    document.getElementById(container).style.top = "0%";
    document.getElementById("container-close").style.display = "block";
}

function closeContainer() {
    document.getElementById("about-container").style.height = "0%";
    document.getElementById("about-container").style.top = "100%";
    document.getElementById("container-close").style.display = "none";
}
