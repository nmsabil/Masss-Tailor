var phonenumber = document.querySelectorAll("#phonenumber");
var cta = document.getElementById("cta");
var phonenumbera = document.getElementById("phonenumber");
var address = document.getElementById("address");
var serviceImgs = document.querySelectorAll("#serviceimg");
var serviceTitle = document.querySelectorAll("#title");
var servicesDescription = document.querySelectorAll("#listdescription");
var first = document.querySelectorAll("#first");
var second = document.querySelectorAll("#second");
var third = document.querySelectorAll("#third");
var forth = document.querySelectorAll("#forth");
var fifth = document.querySelectorAll("#fifth");
var sixth = document.querySelectorAll("#sixth");
var seventh = document.querySelectorAll("#seventh");
var openingHour = document.getElementById("opening");
var closingHour = document.getElementById("closing");
var closeDay = document.getElementById("dayclose");
var openOrClosed = document.getElementById("openorclosed");
var serviceLink = document.querySelectorAll("#servicelink");
var serviceTitleInside = document.querySelectorAll("#test");

const menu = document.querySelector(".navbar");
const scrollspy = new VanillaScrollspy(menu, 1000);
scrollspy.init();

// preloader animation
window.onload = function () {
  var status = document.getElementById("status");
  //hide the preloader
  $("#status").fadeOut(),
    $("#preloader").fadeOut(),
    $("body").delay(350).css({
      overflow: "visible",
    });
};

var jsonload = new XMLHttpRequest();
var url = "config.json";

jsonload.open("GET", url, true);
jsonload.send();

jsonload.onload = function () {
  var arr = JSON.parse(this.responseText);

  //cta for call box
  cta.addEventListener("click", () => {
    window.open(`tel:${arr.info.phone}`);
  });

  //changing all the #phonenumber to retreved phonenumber from json
  if (this.readyState == 4 && this.status == 200) {
    for (var i = 0; i < phonenumber.length; i++) {
      phonenumber[i].textContent = arr.info.phone;
    }
    //changing the tel of href to retreved phonenumber from json
    if (phonenumbera) {
      phonenumbera.addEventListener("click", () => {
        window.open(`tel:${arr.info.phone}`);
      });
    }

    //address
    if (address) {
      address.childNodes[1].textContent = arr.info.company;
      address.childNodes[5].textContent = arr.info.address;
      address.childNodes[8].textContent = arr.info.postcode;
    }

    //services
    if (serviceImgs) {
      for (var i = 0; i < serviceImgs.length; i++) {
        //imgs
        serviceImgs[i].src = arr.services.images[i];
        //title
        serviceTitle[i].textContent = arr.services.title[i];
      }

      //services description
      if (first) {
        for (var i = 0; i < first.length; i++) {
          first[i].textContent = arr.services.description.first[i];
          second[i].textContent = arr.services.description.second[i];
          third[i].textContent = arr.services.description.third[i];
          forth[i].textContent = arr.services.description.forth[i];
          fifth[i].textContent = arr.services.description.fifth[i];
          sixth[i].textContent = arr.services.description.sixth[i];
        }
      }
    }

    //opening hours
    if (openingHour) {
      openingHour.innerText = arr.info.openinghours;
      closingHour.innerText = arr.info.closinghours;
      closeDay.innerText = arr.info.closeday;
      openOrClosed.innerText = arr.info.openorclose;
    }
  }

  const serviceDetails = document.getElementById("service-card");

  function addCard(item, description) {
    var createCard = `
      <div class="service-container">
        <h1>${item}</h1>
        <div class="service-main">
     <p class="description">${description}</p>
     <button class="btn-cta" id="cta-service"><i class="fas fa-phone"></i>Arrange A Booking</button>
          <p>07424605611</p>
        </div>
    </div>
    `;

    return createCard;
  }

  setInterval(() => {
    var btnServices = document.getElementById("cta-service");
    if (btnServices) {
      btnServices.addEventListener("click", () => {
        window.open(`tel:${arr.info.phone}`);
      });
    }
  }, 50);

  if (window.location.pathname === "/service1.html") {
    serviceDetails.innerHTML = addCard(
      arr.services.pages.one.title,
      arr.services.pages.one.description
    );
  }

  if (window.location.pathname === "/service2.html") {
    serviceDetails.innerHTML = addCard(
      arr.services.pages.two.title,
      arr.services.pages.two.description
    );
  }

  if (window.location.pathname === "/service3.html") {
    serviceDetails.innerHTML = addCard(
      arr.services.pages.three.title,
      arr.services.pages.three.description
    );
  }

  if (window.location.pathname === "/service4.html") {
    serviceDetails.innerHTML = addCard(
      arr.services.pages.four.title,
      arr.services.pages.four.description
    );
  }

  if (window.location.pathname === "/service5.html") {
    serviceDetails.innerHTML = addCard(
      arr.services.pages.five.title,
      arr.services.pages.five.description
    );
  }

  if (window.location.pathname === "/service6.html") {
    serviceDetails.innerHTML = addCard(
      arr.services.pages.six.title,
      arr.services.pages.six.description
    );
  }

  if (window.location.pathname === "/service7.html") {
    serviceDetails.innerHTML = addCard(
      arr.services.pages.seven.title,
      arr.services.pages.seven.description
    );
  }
};

const galleryContainer = document.getElementById("gallery-container");

const lightbox = document.getElementById("lightbox");
const close = document.getElementById("close");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const lightboxChange = document.getElementById("lightbox-change");
const lightboxOuter = document.getElementById("lightbox");

fetch("config.json")
  .then((res) => res.json())

  .then((data) => {
    gallery_images = data.gallery;

    if (galleryContainer) {
      function addImageToDOM(galleryImg) {
        Object.entries(galleryImg).forEach((index) => {
          var imgDiv = document.createElement("img");
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
            var target = e.target.src;
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
            var b = images;

            if (next) {
              next.addEventListener("click", (e) => {
                lightboxChange.src = b[iterate()].src;
              });
            }
            var i = 0;
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

            var i = 0;
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
