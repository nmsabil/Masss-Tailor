const phonenumber = document.querySelectorAll("#phonenumber");

const phonenumbera = document.getElementById("cta");
const address = document.getElementById("address");
const serviceImgs = document.querySelectorAll("#serviceimg");
const serviceTitle = document.querySelectorAll("#title");
const servicesDescription = document.querySelectorAll("#listdescription");
const first = document.querySelectorAll("#first");
const second = document.querySelectorAll("#second");
const third = document.querySelectorAll("#third");
const forth = document.querySelectorAll("#forth");
const fifth = document.querySelectorAll("#fifth");
const sixth = document.querySelectorAll("#sixth");

const openingHour = document.getElementById("opening");
const closingHour = document.getElementById("closing");
const closeDay = document.getElementById("dayclose");
const openOrClosed = document.getElementById("openorclosed");

const galleryContainer = document.getElementById("gallery-container");
const lightbox = document.getElementById("lightbox");
const close = document.getElementById("close");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const lightboxChange = document.getElementById("lightbox-change");
const lightboxOuter = document.getElementById("lightbox");
const service_close = document.querySelector(".service_close");
const service_container = document.querySelector(".service_container");
const service_grid_items = document.querySelectorAll(".grid-item");

// Service container funtionality and DOM manipulation
service_grid_items.forEach((item) => {
  //add active class to service container on click to show
  item.addEventListener("click", (e) => {
    e.preventDefault();
    service_container.classList.add("active");

    // changes title in DOM
    service_container.getElementsByClassName(
      "service_title"
    )[0].innerText = item.getElementsByTagName("a")[2].innerHTML;

    //changes img src in DOM
    service_container.getElementsByClassName(
      "service_image"
    )[0].src = item.getElementsByTagName("a")[1].children[0].currentSrc;
  });
});

// close button for service container
service_close.addEventListener("click", () => {
  service_container.classList.remove("active");
});

// smooth scroll with spyscroll navbar
const menu = document.querySelector(".navbar");
const scrollspy = new VanillaScrollspy(menu, 1000);
scrollspy.init();

// preloader animation
window.onload = function () {
  const status = document.getElementById("status");
  //hide the preloader
  $("#status").fadeOut(),
    $("#preloader").fadeOut(),
    $("body").delay(500).css({
      overflow: "visible",
    });
};

const jsonload = new XMLHttpRequest();
const url = "data.json";

jsonload.open("GET", url, true);
jsonload.send();

jsonload.onload = function () {
  const arr = JSON.parse(this.responseText);

  //changing all the #phonenumber to retreved phonenumber from json
  if (this.readyState == 4 && this.status == 200) {
    for (let i = 0; i < phonenumber.length; i++) {
      phonenumber[i].textContent = arr.info.phone;
    }
    //changing the tel of href to retreved phonenumber from json
    if (phonenumbera) {
      phonenumbera.addEventListener("click", () => {
        window.open(`tel:${arr.info.phone}`);
      });
    }

    //changing address to one in data.json
    if (address) {
      address.childNodes[1].textContent = arr.info.company;
      address.childNodes[5].textContent = arr.info.address;
      address.childNodes[8].textContent = arr.info.postcode;
    }

    //services data from data.json
    if (serviceImgs) {
      for (let i = 0; i < serviceImgs.length; i++) {
        //imgs
        serviceImgs[i].src = arr.services.images[i];
        //title
        serviceTitle[i].textContent = arr.services.title[i];
      }

      //services description from data.json
      if (first) {
        for (let i = 0; i < first.length; i++) {
          first[i].textContent = arr.services.description.first[i];
          second[i].textContent = arr.services.description.second[i];
          third[i].textContent = arr.services.description.third[i];
          forth[i].textContent = arr.services.description.forth[i];
          fifth[i].textContent = arr.services.description.fifth[i];
          sixth[i].textContent = arr.services.description.sixth[i];
        }
      }
    }

    //opening hours from data.json
    if (openingHour) {
      openingHour.innerText = arr.info.openinghours;
      closingHour.innerText = arr.info.closinghours;
      closeDay.innerText = arr.info.closeday;
      openOrClosed.innerText = arr.info.openorclose;
    }
  }
};

fetch("data.json")
  .then((res) => res.json())

  .then((data) => {
    gallery_images = data.gallery;
    // grid gallery populating from data.json
    if (galleryContainer) {
      function addImageToDOM(galleryImg) {
        Object.entries(galleryImg).forEach((index) => {
          const imgDiv = document.createElement("img");
          imgDiv.classList = "image";
          imgDiv.src = index[1];
          imgDiv.alt = "indian dress";
          galleryContainer.appendChild(imgDiv);
        });
      }

      setTimeout(() => {
        const images = document.querySelectorAll(".image");
        images.forEach((image) => {
          image.addEventListener("click", (e) => {
            const target = e.target.src;
            lightboxChange.src = target;
            lightbox.classList.add("show");

            if (close) {
              window.onclick = function (e) {
                if (e.target == lightboxOuter) {
                  lightbox.classList.remove("show");
                }
              };
              close.addEventListener("click", (e) => {
                lightbox.classList.remove("show");
              });
            }
            const b = images;

            if (next) {
              next.addEventListener("click", (e) => {
                lightboxChange.src = b[iterate()].src;
              });
            }
            let i = 0;
            function iterate() {
              i++;
              if (i === images.length) {
                i = 0;
              }

              return i;
            }

            if (prev) {
              prev.addEventListener("click", (e) => {
                lightboxChange.src = b[diterate()].src;
              });
            }

            function diterate() {
              if (i <= 0) {
                i = images.length;
              }
              i--;
              return i;
            }
          });
        });
      }, 100);

      addImageToDOM(gallery_images);
    }
  });

// on click on the address open native map app.
function mapsSelector() {
  if (
    /* if we're on iOS, open in Apple Maps */
    navigator.platform.indexOf("iPhone") != -1 ||
    navigator.platform.indexOf("iPad") != -1 ||
    navigator.platform.indexOf("iPod") != -1
  )
    window.open("https://goo.gl/maps/Wu47Wmqhdo3oeFn28");
  /* else use Google */ else
    window.open("https://goo.gl/maps/Wu47Wmqhdo3oeFn28");
}
