function liveSearch() {
  let data = document.querySelectorAll(".data");
  let query = document.getElementById("input").value;

  for (let i = 0; i < data.length; i++) {
    if (data[i].innerText.toLowerCase().includes(query.toLowerCase())) {
      data[i].classList.remove("is-hidden");
    } else {
      data[i].classList.add("is-hidden");
    }
  }

}
