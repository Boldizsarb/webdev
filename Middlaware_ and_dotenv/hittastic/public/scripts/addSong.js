// error handling in case of wrong input or no input at all

const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
  event.preventDefault();

  const title = form.elements.title.value;
  const artist = form.elements.artist.value;
  const year = form.elements.year.value;
  const downloads = form.elements.downloads.value;
  const price = form.elements.price.value;
  const quantity = form.elements.quantity.value;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/song/create", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 400) {
        alert("Bad Request: All fields are required");
      } else if (xhr.status === 201) {
        alert("Song Added Successfully");
      }
    }
  };
  xhr.send(
    `title=${encodeURIComponent(title)}&artist=${encodeURIComponent(
      artist
    )}&year=${encodeURIComponent(year)}&downloads=${encodeURIComponent(
      downloads
    )}&price=${encodeURIComponent(price)}&quantity=${encodeURIComponent(
      quantity
    )}`
  );
});