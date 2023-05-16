
function goToPage() {
    var selectBox = document.getElementById("previous");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    window.location.href = selectedValue;
    console.log("c'est fait")
    return false;
}