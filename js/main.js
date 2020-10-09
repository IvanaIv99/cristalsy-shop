window.addEventListener("load", ucitavanje);

function ucitavanje() {
  // $("#obrisiKorpu").click(ocistiKorpu);
  // function ocistiKorpu() {
  //   localStorage.removeItem("proizvodi");
  //   console.log("obrisano");
  // }
  /* MODAL CHECKOUT */

  let modalBtn = document.getElementById("numberOfProducts");
  let modal = document.querySelector(".modalCheckout");
  let closeBtn = document.querySelector(".close-btnCheckout");
  modalBtn.onclick = function() {
    modal.style.display = "block";

    console.log("modalllll");

    function localStorageProizvodi() {
      // var proizvodi = JSON.parse(localStorage.getItem("proizvodi"));
      // return proizvodi;
      return JSON.parse(localStorage.getItem("proizvodi"));
    }

    let proizvodi = localStorageProizvodi();

    if (proizvodi === null || proizvodi.length == 0) prikaziPraznuKorpu();
    else prikaziKorpu();

    function prikaziKorpu() {
      window.onclick = function(e) {
        if (e.target == modal) {
          modal.style.display = "none";
        }
      };
      let proizvodi = localStorageProizvodi();
      let total = 0;
      $.ajax({
        url: "data/products.json",
        success: function(data) {
          let productsForDisplay = [];
          data = data.filter((p) => {
            for (let prod of proizvodi) {
              if (p.id == prod.id) {
                p.kolicina = prod.kolicina;
                total += Number(p.prices.price * prod.kolicina);
                return true;
              }
            }
            return false;
          });
          prikaziTabelu(data, total);
        }
      });
    }

    function prikaziTabelu(proizvodi, total) {
      let html = `
              <table class="tableCheckout">
          <thead>
            <tr>
              <th></th>

              <th>Product Name</th>
                          <th>Base Price</th>
                          <th>Quantity</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>`;
      for (let p of proizvodi) {
        html += prikaziRed(p);
      }

      html += `    </tbody>
              </table>`;
      html += `<p> = Total : ${total}$</p> <input type="button" id="checkout" value="CHECKOUT"/>`;

      $(".modal-contentCheckout").html(html);

      $("#obrisiKorpu").click(ocistiKorpu);
      function ocistiKorpu() {
        localStorage.removeItem("proizvodi");
        console.log("obrisano");
      }

      function prikaziRed(p) {
        return `<tr class="rem1">
          
          <td class="invert-image">
              <a href="single.html">
                <img src="${p.image.src}" style='height:40px' alt="${
          p.image.alt
        }" class="img-responsive">
              </a>
          </td>
          <td class="invert">${p.name}</td>
          <td class="invert">$${p.prices.price}</td>
          <td class="invert">${p.kolicina}</td>
          <td class="invert">$${p.prices.price * p.kolicina}</td>
          <td class="invert">
              <div class="rem">
                  <div class=""><button onclick="removeFromCart(${
                    p.id
                  })">X</button> </div>
              </div>
          </td>
      </tr>`;
      }
    }

    function prikaziPraznuKorpu() {
      window.onclick = function(e) {
        if (e.target == modal) {
          modal.style.display = "none";
        }
      };
      $(".modal-contentCheckout").html("Cart empty!");
    }
  };
  closeBtn.onclick = function() {
    modal.style.display = "none";
  };
  window.onclick = function(e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  };

  /** MENI */

  $(".fa-bars").click(function() {
    $("#menuFull").show("slow");
    $("#logoSredina").hide("slow");
    $(".fa-bars").hide();
  });
  $(".fa-times").click(function() {
    $("#menuFull").hide("slow");
    $("#logoSredina").show("slow");
    $(".fa-bars").show();
  });

  $.ajax({
    url: "data/menu.json",
    method: "get",
    type: "json",
    success: function(data) {
      inputMenu(data);
    },
    error: function(xhr, status, error) {
      alert(status);
    }
  });

  /**SLIDESHOW*/

  // var nizSlideShow = [
  //   "1.jpg",
  //   "2.jpg",
  //   "3.jpg",
  //   "4.jpg",
  //   "5.jpg",
  //   "6.jpg",
  //   "7.jpg",
  //   "8.jpg",
  //   "9.jpg",
  //   "10.jpg",
  //   "11.jpg",
  //   "12.jpg"
  // ];

  $.ajax({
    url: "data/slideshow.json",
    method: "get",
    type: "json",
    success: function(data) {
      var ispisSlideShow1 = "";
      var ispisSlideShow2 = "";
      var ispisSlideShow3 = "";
      for (var i = 0; i < data.length; i++) {
        if (i == 0) {
          ispisSlideShow1 += `<div class="slideshowdiv aktivna"  style="background-image:url('IMG/image${data[i].href}')"></div>`;
        }

        if (i < 4 && i > 0) {
          ispisSlideShow1 += `<div class="slideshowdiv"  style="background-image:url('IMG/image${data[i].href}')"></div>`;
        }
        if (i == 4) {
          ispisSlideShow2 += `<div class="slideshowdiv aktivna" style="background-image:url('IMG/image${data[i].href}')"></div>`;
        }
        if (i > 4 && i < 8) {
          ispisSlideShow2 += `<div class="slideshowdiv" style="background-image:url('IMG/image${data[i].href}')"></div>`;
        }
        if (i == 8) {
          ispisSlideShow3 += `<div class="slideshowdiv aktivna" style="background-image:url('IMG/image${data[i].href}')"></div>`;
        }
        if (i > 8 && i < 12) {
          ispisSlideShow3 += `<div class="slideshowdiv" style="background-image:url('IMG/image${data[i].href}')"></div>`;
        }
      }
      document.getElementById("slikaWelcome1").innerHTML += ispisSlideShow1;
      document.getElementById("slikaWelcome2").innerHTML += ispisSlideShow2;
      document.getElementById("slikaWelcome3").innerHTML += ispisSlideShow3;

      slideShow1();
      function slideShow1() {
        var trenutni = $("#slikaWelcome1 .aktivna");
        var sledeci = trenutni.next().length
          ? trenutni.next()
          : trenutni.parent().children(":first");
        trenutni.removeClass("aktivna");
        sledeci.addClass("aktivna");
        setTimeout(slideShow1, 2000);
      }
      slideShow2();
      function slideShow2() {
        var trenutni = $("#slikaWelcome2 .aktivna");
        var sledeci = trenutni.next().length
          ? trenutni.next()
          : trenutni.parent().children(":first");
        trenutni.removeClass("aktivna");
        sledeci.addClass("aktivna");
        setTimeout(slideShow2, 2000);
      }
      slideShow3();
      function slideShow3() {
        var trenutni = $("#slikaWelcome3 .aktivna");
        var sledeci = trenutni.next().length
          ? trenutni.next()
          : trenutni.parent().children(":first");
        trenutni.removeClass("aktivna");
        sledeci.addClass("aktivna");
        setTimeout(slideShow3, 2000);
      }
    },
    error: function(xhr, status, error) {
      alert(status);
    }
  });

  // var ispisSlideShow1 = "";
  // var ispisSlideShow2 = "";
  // var ispisSlideShow3 = "";
  // for (var i = 0; i < nizSlideShow.length; i++) {
  //   if (i == 0) {
  //     ispisSlideShow1 += `<div class="slideshowdiv aktivna"  style="background-image:url('IMG/image${nizSlideShow[i]}')"></div>`;
  //   }

  //   if (i < 4 && i > 0) {
  //     ispisSlideShow1 += `<div class="slideshowdiv"  style="background-image:url('IMG/image${nizSlideShow[i]}')"></div>`;
  //   }
  //   if (i == 4) {
  //     ispisSlideShow2 += `<div class="slideshowdiv aktivna" style="background-image:url('IMG/image${nizSlideShow[i]}')"></div>`;
  //   }
  //   if (i > 4 && i < 8) {
  //     ispisSlideShow2 += `<div class="slideshowdiv" style="background-image:url('IMG/image${nizSlideShow[i]}')"></div>`;
  //   }
  //   if (i == 8) {
  //     ispisSlideShow3 += `<div class="slideshowdiv aktivna" style="background-image:url('IMG/image${nizSlideShow[i]}')"></div>`;
  //   }
  //   if (i > 8 && i < 12) {
  //     ispisSlideShow3 += `<div class="slideshowdiv" style="background-image:url('IMG/image${nizSlideShow[i]}')"></div>`;
  //   }
  // }
  // document.getElementById("slikaWelcome1").innerHTML += ispisSlideShow1;
  // document.getElementById("slikaWelcome2").innerHTML += ispisSlideShow2;
  // document.getElementById("slikaWelcome3").innerHTML += ispisSlideShow3;

  // slideShow1();
  // function slideShow1() {
  //   var trenutni = $("#slikaWelcome1 .aktivna");
  //   var sledeci = trenutni.next().length
  //     ? trenutni.next()
  //     : trenutni.parent().children(":first");
  //   trenutni.removeClass("aktivna");
  //   sledeci.addClass("aktivna");
  //   setTimeout(slideShow1, 2000);
  // }
  // slideShow2();
  // function slideShow2() {
  //   var trenutni = $("#slikaWelcome2 .aktivna");
  //   var sledeci = trenutni.next().length
  //     ? trenutni.next()
  //     : trenutni.parent().children(":first");
  //   trenutni.removeClass("aktivna");
  //   sledeci.addClass("aktivna");
  //   setTimeout(slideShow2, 2000);
  // }
  // slideShow3();
  // function slideShow3() {
  //   var trenutni = $("#slikaWelcome3 .aktivna");
  //   var sledeci = trenutni.next().length
  //     ? trenutni.next()
  //     : trenutni.parent().children(":first");
  //   trenutni.removeClass("aktivna");
  //   sledeci.addClass("aktivna");
  //   setTimeout(slideShow3, 2000);
  // }

  /** PRODUCTS */

  // $('.buy').click(function(){
  //     console.log("ok")
  //     var sek=800;
  //     var body=$("html, body");
  //     var target=$('#register');
  //     body.animate({ scrollTop: $(target).offset().top}, sek, 'swing', function() {});

  // })

  // $(".productSlika").hover(function(){
  //         $(this).next().show();
  //         $(this).css("background","rgba(255,255,255,0.6)");

  // },function(){
  //     $(this).next().hide();
  //      $(this).css("background","none");

  // });

  /* BIRTHSIGN */
  document
    .getElementById("submitFormDate")
    .addEventListener("click", function() {
      var dateSign = document.getElementById("dateForm").value;
      var danUnos = Number(dateSign.split("-")[2]);
      var mesecUnos = Number(dateSign.split("-")[1]);
      var obj = null;

      $.ajax({
        url: "data/birthsigns.json",
        method: "get",
        type: "json",
        success: function(data) {
          if (
            (danUnos > 19 && mesecUnos == 01) ||
            (danUnos < 19 && mesecUnos == 02)
          ) {
            console.log("Vodolija");
            obj = data[0];
            console.log(obj.opis);
          }
          if (
            (danUnos > 18 && mesecUnos == 02) ||
            (danUnos < 21 && mesecUnos == 03)
          ) {
            console.log("Riba");
            obj = data[1];
          }
          if (
            (danUnos > 20 && mesecUnos == 03) ||
            (danUnos < 20 && mesecUnos == 04)
          ) {
            console.log("Ovan");
            obj = data[2];
          }
          if (
            (danUnos > 19 && mesecUnos == 04) ||
            (danUnos < 21 && mesecUnos == 05)
          ) {
            console.log("Bik");
            obj = data[3];
          }
          if (
            (danUnos > 20 && mesecUnos == 05) ||
            (danUnos < 21 && mesecUnos == 06)
          ) {
            console.log("Blizanac");
            obj = data[4];
          }
          if (
            (danUnos > 20 && mesecUnos == 06) ||
            (danUnos < 23 && mesecUnos == 07)
          ) {
            console.log("Rak");
            obj = data[5];
          }
          if (
            (danUnos > 22 && mesecUnos == 07) ||
            (danUnos < 23 && mesecUnos == 08)
          ) {
            console.log("Lav");
            obj = data[6];
          }
          if (
            (danUnos > 22 && mesecUnos == 08) ||
            (danUnos < 23 && mesecUnos == 09)
          ) {
            console.log("Devica");
            obj = data[7];
          }
          if (
            (danUnos > 22 && mesecUnos == 09) ||
            (danUnos < 23 && mesecUnos == 10)
          ) {
            console.log("Vaga");
            obj = data[8];
          }
          if (
            (danUnos > 22 && mesecUnos == 10) ||
            (danUnos < 22 && mesecUnos == 11)
          ) {
            console.log("Skorpija");
            obj = data[9];
          }
          if (
            (danUnos > 21 && mesecUnos == 11) ||
            (danUnos < 22 && mesecUnos == 12)
          ) {
            console.log("Strelac");
            obj = data[10];
          }
          if (
            (danUnos > 21 && mesecUnos == 12) ||
            (danUnos < 20 && mesecUnos == 01)
          ) {
            console.log("Jarac");
            obj = data[11];
          }
          let ispis = "";
          ispis += `<div class="ispisZnaka">
                <h2>${obj.znak}</h2>
                <img src="${obj.putanjaSlika}"/>
                <p class="opisZnak">${obj.opisZnak}</p>          
                </div>
                <div class="ispisKristal">
                    <h3>${obj.imeKristal}</h3>
                    <img src="img/gems.png"/>
                    <p class="opisKristal">${obj.opisKristal}</p>
                </div>`;

          document.getElementById("ispisBlok").innerHTML = ispis;
        },
        error: function(xhr, status, error) {
          alert(status);
        }
      });
    });

  /* SOCIALMEDIA  AND FOOTER */

  $.ajax({
    url: "data/additional.json",
    method: "get",
    type: "json",
    success: function(data) {
      let ispis = "";
      for (let soc of data[0].socialmedia) {
        ispis += `<a href="https://${soc.href}/" target="_blank"><i class="fab ${soc.name}"></i></a>`;
      }
      document.getElementById("divSocial").innerHTML = ispis;
      document.getElementById("menuBasket").innerHTML = ispis;

      let authorIspis = "";
      for (let socAu of data[0].socialMediaAuthor) {
        authorIspis += `<a href="https://${socAu.href}/" target="_blank"><i class="fab ${socAu.name}"></i></a>`;
      }
      document.getElementById("fa-links").innerHTML = authorIspis;

      let ispisInfo = "<ul>";
      for (let info of data[0].informations) {
        ispisInfo += `<li><a class="footerinfo" >${info.name}</a></li>`;
      }
      ispisInfo += "</ul>";
      document.getElementsByClassName("divFooter")[1].innerHTML =
        "<h1>Informations:</h1>" + ispisInfo;

      $(".footerinfo").click(function() {
        var indeks = $(".footerinfo").index(this);
        for (var i = 0; i < data[0].informations.length; i++) {
          if (i == indeks)
            $(".modal-bodyFooter p").html(data[0].informations[i].desc);
        }
        const modal = document.querySelector("#footer-modal");

        const closeBtn = document.querySelector(".close");

        closeBtn.addEventListener("click", closeModal);
        window.addEventListener("click", outsideClick);

        function openModal() {
          modal.style.display = "block";
        }

        function closeModal() {
          modal.style.display = "none";
        }

        function outsideClick(e) {
          if (e.target == modal) {
            modal.style.display = "none";
          }
        }
        openModal();
      });
    },
    error: function(xhr, status, error) {
      alert(status);
    }
  });

  /* FORMA */

  document.getElementById("button").addEventListener("click", function() {
    var nizOk = [];
    var nizGreske = [];
    var vrednostIme = document.getElementById("firstname").value;
    var vrednostPrez = document.getElementById("lastname").value;
    var vrednostPass = document.getElementById("password").value;
    var vrednostCPass = document.getElementById("confPassword").value;
    var vrednostEmail = document.getElementById("email").value;
    var vrednostPhone = document.getElementById("phone").value;

    var vrednostSelect = document.getElementById("ddl").value;
    var vrednostRadio = document.getElementsByName("radio");
    console.log(vrednostRadio);

    var spanError = document.getElementsByClassName("regexError");

    var regExName = /([A-Z][a-zA-Z]*)$/;
    var regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/; /*1 upper,spec char,number,at least 8 char,max15*/
    var regExMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    var regExPhone = /^[+]{1}[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

    if (vrednostIme != "") {
      if (!regExName.test(vrednostIme)) {
        spanError[0].innerHTML = "Invalid first name";
        nizGreske.push("You have to enter regular name");
      } else {
        spanError[0].innerHTML = "";
        nizOk.push(vrednostIme);
      }
    } else {
      spanError[0].innerHTML = "Field is empty";
    }
    if (vrednostPrez != "") {
      if (!regExName.test(vrednostPrez)) {
        spanError[1].innerHTML = "Invalid last name";
        nizGreske.push("You have to enter regular name");
      } else {
        spanError[1].innerHTML = "";
        nizOk.push(vrednostPrez);
      }
    } else {
      spanError[1].innerHTML = "Field is empty";
    }
    if (vrednostPass != "") {
      if (!regExPass.test(vrednostPass) || vrednostPass == "") {
        spanError[6].innerHTML = "Invalid password";
        nizGreske.push("You have to enter regular password");
      } else {
        spanError[6].style.display = "none";
        nizOk.push(vrednostPass);
      }
    } else {
      spanError[6].innerHTML = "Field is empty";
    }

    if (vrednostEmail != "") {
      if (!regExMail.test(vrednostEmail) || vrednostEmail == "") {
        spanError[2].innerHTML = "Invalid email";
        nizGreske.push("You have to enter regular email");
      } else {
        spanError[2].style.display = "none";
        nizOk.push(vrednostEmail);
      }
    } else {
      spanError[2].innerHTML = "Field is empty";
    }
    if (vrednostPhone != "") {
      if (!regExPhone.test(vrednostPhone) || vrednostPhone == "") {
        spanError[3].innerHTML = "Invalid phone";
        nizGreske.push("You have to enter regular phone");
      } else {
        spanError[3].style.display = "none";
        nizOk.push(vrednostPhone);
      }
    } else {
      spanError[3].innerHTML = "Field is empty";
    }

    if (vrednostSelect == "choose") {
      spanError[5].innerHTML = "Please choose an option";
      nizGreske.push("You have to choose option");
    } else {
      spanError[5].style.display = "none";
      nizOk.push(vrednostSelect);
    }
    var radio = "";
    for (var i = 0; i < vrednostRadio.length; i++) {
      if (vrednostRadio[i].checked) {
        spanError[4].style.display = "none";
        nizOk.push(vrednostSelect);
      } else {
        spanError[4].innerHTML = "Please choose gender";
        nizGreske.push("You have to choose option");
      }
    }

    if (vrednostCPass != "") {
      if (vrednostPass != vrednostCPass) {
        spanError[7].innerHTML = "Passwords dont match";
        nizGreske.push("You have to enter regular password");
        console.log("ddOffK");
      } else {
        spanError[7].style.display = "none";
        nizOk.push(vrednostCPass);
        console.log("ddOK");
      }
    } else {
      spanError[7].innerHTML = "Field is empty";
    }

    console.log(nizOk);
    console.log(nizGreske);
  });

  document
    .getElementById("newsletterSubmit")
    .addEventListener("click", function() {
      var regExMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      var nizOk = [];
      var nizGreske = [];
      var vrednostNews = document.getElementById("newsletterEmail").value;
      var spanError = document.getElementsByClassName("regexError");

      if (vrednostNews != "") {
        if (!regExMail.test(vrednostNews)) {
          spanError[8].innerHTML = "Invalid email";
          nizGreske.push("You have to enter regular email");
          console.log("ddOffK");
        } else {
          spanError[8].style.display = "none";
          nizOk.push(vrednostNews);
          console.log("ddOK");
        }
      } else {
        spanError[8].innerHTML = "Field is empty";
      }
    });

  /*SLIDEUP*/
  document.addEventListener("scroll", function() {
    var ofsetEl = $("#footer").offset().top;
    var welc = $("#welcome").offset().top;

    var ofset = window.scrollY + welc;

    if (ofset > 50) {
      if (ofset > ofsetEl) {
        $(".top i").css("color", "black");
      } else {
        $(".top i").css("color", "white");
      }
      if (ofset == welc) {
        $(".top").hide();
      }
      if (ofset > welc) $(".top").show("slow");
    } else {
      $(".top").hide();
    }
  });
  $(".top").click(function() {
    $("html, body").animate({ scrollTop: "0" }, 1000);
  });

  function AnimateRotate(angle, repeat) {
    var duration = 1500;
    setTimeout(function() {
      if (repeat && repeat == "infinite") {
        AnimateRotate(angle, repeat);
      } else if (repeat && repeat > 1) {
        AnimateRotate(angle, repeat - 1);
      }
    }, duration);
    var $elem = $(".zvezdica");

    $({ deg: 0 }).animate(
      { deg: angle },
      {
        duration: duration,
        step: function(now) {
          $elem.css({
            transform: "rotate(" + now + "deg)"
          });
        }
      }
    );
  }
  AnimateRotate(360, "infinite");

  $(".footerinfo").click(function() {
    var indeks = $(".footerinfo").index(this);
    for (var i = 0; i < info.length; i++) {
      if (i == indeks) $(".modal-bodyFooter p").html(info[i]);
    }
    const modal = document.querySelector("#footer-modal");

    const closeBtn = document.querySelector(".close");

    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", outsideClick);

    function openModal() {
      modal.style.display = "block";
    }

    function closeModal() {
      modal.style.display = "none";
    }

    function outsideClick(e) {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    }
    openModal();
  });

  /* ****SORT******* */

  //  $("#catList").slideToggle();
  //  $("#sortList").slideToggle();

  $("#categories").click(function(e) {
    e.preventDefault();
    $("#catList").slideToggle();
  });

  $("#sort").click(function(e) {
    e.preventDefault;
    $("#sortList").slideToggle();
  });

  $("#priceDesc").click(function(e) {
    e.preventDefault();
    let array = $(".product");
    array.sort(function(a, b) {
      a = parseInt(
        $(a)
          .find(".price")
          .text(),
        10
      );
      b = parseInt(
        $(b)
          .find(".price")
          .text(),
        10
      );
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    });
    $("#productList").append(array);
  });
  $("#priceAsc").click(function(e) {
    e.preventDefault();
    let array = $(".product");
    array.sort(function(a, b) {
      a = parseInt(
        $(a)
          .find(".price")
          .text(),
        10
      );
      b = parseInt(
        $(b)
          .find(".price")
          .text(),
        10
      );
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    });
    $("#productList").append(array);
  });
  $("#nameAsc").click(function(e) {
    e.preventDefault();
    let array = $(".product");
    array.sort(function(a, b) {
      a = $(a)
        .find(".name")
        .text();
      b = $(b)
        .find(".name")
        .text();
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    });
    $("#productList").append(array);
  });
  $("#nameDesc").click(function(e) {
    e.preventDefault();
    let array = $(".product");
    array.sort(function(a, b) {
      a = $(a)
        .find(".name")
        .text();
      b = $(b)
        .find(".name")
        .text();
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    });
    $("#productList").append(array);
  });

  /* ******************AJAX/PRODUCTS*********** */

  $.ajax({
    url: "data/categories.json",
    method: "GET",
    dataType: "json",
    success: function(data) {
      categories(data);
    },
    error: function(err) {
      console.error(err);
    }
  });
  $.ajax({
    url: "data/products.json",
    method: "get",
    type: "json",
    success: function(data) {
      inputProducts(data);
    },
    error: function(xhr, status, error) {
      alert(status);
    }
  });

  document
    .getElementById("searchFilter")
    .addEventListener("keyup", searchFilter);
}
function inputProducts(products) {
  let ispis = "";
  for (let p of products) {
    ispis += ` 
         <div class="product">
         
            <div class="productSlika">
            <img src="${p.image.src}" alt="${p.image.alt}"/>
            </div>
            <h1 class="name">${p.name}</h1>
            <p class="price">${priceDot(p.prices.price)} $ </p></br>
           

            <button class="modal-btn" value="${p.id}" >VIEW</button>
            
         
         </div>     
         `;
  }

  ispis += `<div class="modal">
    <div class="modal-content">
        <span class="close-btn" >&times;</span>

        <div class="productSlikaMod">
        </div>
        <div class="productModalInfo">
            <h1 class="nameMod"></h1>
                <div class="priceBuy">
                    <input type="number" value="1" class="inputQ"/>
                    <i class="fas fa-times"></i>
                    <p class="priceMod"></p>
                </div>
                <a class="buy" data-id="0"> ADD <i class="fas fa-shopping-cart"></i> </a>
                
            <p class="description"></p>
        </div>
        
        
    </div>
    </div>`;
  document.getElementById("productList").innerHTML = ispis;

  if (products.length == 0) {
    document.getElementById("productList").innerHTML =
      "<strong style='color:white;margin-top:10%' >there's no products</strong>";
  }

  function localStorageProizvodi() {
    // var proizvodi = JSON.parse(localStorage.getItem("proizvodi"));
    // return proizvodi;
    return JSON.parse(localStorage.getItem("proizvodi"));
  }

  $(".buy").click(dodajUKorpu);
  function dodajUKorpu() {
    alert("Added!")
    let id = Number(this.dataset.id);
    let kolicinaa = Number($(".inputQ").val());
    console.log(kolicinaa);
    console.log(id);
    var proizvodiLocalStorage = localStorageProizvodi();

    if (proizvodiLocalStorage) {
      if (proizvodUkorpi()) {
        povecajKolicinu();
      } else {
        dodajUstorage();
      }
    } else {
      dodajPrviProizvod();
    }

    function proizvodUkorpi() {
      let broj = proizvodiLocalStorage.filter((p) => p.id == id).length;
      console.log(broj);
      return broj;
    }

    function povecajKolicinu() {
      let proizvodi = localStorageProizvodi();
      for (let p in proizvodi) {
        if (proizvodi[p].id == id) {
          proizvodi[p].kolicina += kolicinaa;
          break;
        }
      }

      localStorage.setItem("proizvodi", JSON.stringify(proizvodi));
    }

    function dodajUstorage() {
      let proizvodi = localStorageProizvodi();
      proizvodi.push({
        id: id,
        kolicina: kolicinaa
      });
      localStorage.setItem("proizvodi", JSON.stringify(proizvodi));
    }

    function dodajPrviProizvod() {
      let proizvodi = [];
      proizvodi[0] = {
        id: id,
        kolicina: kolicinaa
      };
      localStorage.setItem("proizvodi", JSON.stringify(proizvodi));
    }
  }

  // KRAJ KORPA

  $(".modal-btn").click(modalF);
  function modalF() {
    let vr = this.value;
    // document.getElementsByClassName("buy")[0].setAttribute("data-id", vr);
    $(".buy").attr("data-id", vr);
    $.ajax({
      url: "data/products.json",
      method: "get",
      type: "json",
      success: function(data) {
        let pr = data.filter(function(p) {
          return p.id == vr;
        });
        document.getElementsByClassName(
          "productSlikaMod"
        )[0].style.backgroundImage = "url('" + pr[0].image.src + "')";
        document.getElementsByClassName("nameMod")[0].innerHTML = pr[0].name;
        document.getElementsByClassName("description")[0].innerHTML =
          pr[0].description;
        document.getElementsByClassName("priceMod")[0].innerHTML =
          priceDot(pr[0].prices.price) + "$";
      },
      error: function(xhr, status, error) {
        alert(status);
      }
    });
    // KORPA

    let modal = document.querySelector(".modal");
    let closeBtn = document.querySelector(".close-btn");
    modal.style.display = "block";
    closeBtn.onclick = function() {
      modal.style.display = "none";
    };
    window.onclick = function(e) {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  function priceDot(price) {
    return price.toString().replace(/(\d)(?=(\d\d)+(?!\d))/g, "$1.");
  }
}
function inputMenu(menu) {
  let ispis = "<ul>";
  for (let m of menu) {
    ispis += `<li><a class="klasa"  href="${m.href}">${m.name}</a></li>`;
  }
  ispis += "</ul>";
  document.getElementById("menuList").innerHTML = ispis;

  $(".klasa").click(function() {
    var sek = 800;
    var body = $("html, body");
    var target = $(this).attr("href");
    if (
      target == "#products" ||
      target == "#register" ||
      target == "#author" ||
      target == "#findChristal"
    )
      sek = sek * 2.5;
    body.animate(
      { scrollTop: $(target).offset().top },
      sek,
      "swing",
      function() {}
    );
  });

  $("#shopnowBtn").click(function() {
    var sek = 800;
    var body = $("html, body");
    var target = $("#products");
    body.animate(
      { scrollTop: $(target).offset().top },
      sek,
      "swing",
      function() {}
    );
  });
}
function categories(cat) {
  let ispis = "<ul>";
  for (let c of cat) {
    ispis += `<li><a href="#" data-idCat="${c.id}">${c.catName}</a></li>`;
  }
  ispis += "</ul>";
  document.getElementById("catList").innerHTML = ispis;

  $("#catList ul li a").click(filterCategories);
}
function filterCategories(e) {
  e.preventDefault();
  const idCat = this.dataset.idcat;
  $.ajax({
    url: "data/products.json",
    method: "GET",
    dataType: "json",
    success: function(products) {
      const filtered = products.filter(function(p) {
        return p.categories.some(function(cat) {
          return cat.id == idCat;
        });
      });

      inputProducts(filtered);
    },
    error: function(err) {
      console.error(err);
    }
  });
}
function searchFilter() {
  const uneto = this.value;
  $.ajax({
    url: "data/products.json",
    method: "GET",
    dataType: "json",
    success: function(data) {
      let filtered = data.filter((el) => {
        if (el.name.toLowerCase().indexOf(uneto.toLowerCase()) != -1) {
          return true;
        }
      });
      inputProducts(filtered);
    },
    error: function(err) {
      console.error(err);
    }
  });
}
