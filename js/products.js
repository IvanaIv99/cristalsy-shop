window.addEventListener("load",ucitavanje);

function ucitavanje(){


    


     /** MENI */

     $('.fa-bars').click(function(){
        $('#menuFull').show('slow');
        $('#logoSredina').hide('slow');
        $('.fa-bars').hide();
    })
    $('.fa-times').click(function(){
        $('#menuFull').hide('slow');
        $('#logoSredina').show('slow');
        $('.fa-bars').show();
    })


    var menikomponente=["welcome","benefits","discover","products","register","Author"];
    var menikomponenteLen=menikomponente.length;
    var menihref=["#welcome","#benefits","#findChristal","#products","#register","#author"]

    var meniispis ="<ul>";
    for(let i=0; i<menikomponenteLen;i++){
        if(i==0){
            meniispis+= `<li><a class="klasa"  href="${menihref[i]}">${menikomponente[i]}</a></li>`;
        }
        if(i>0){
        meniispis+= `<li><a class="klasa"  href="${menihref[i]}">${menikomponente[i]}</a></li>`;
    
        }
    }
    meniispis+="</ul>";
    document.getElementById("menuList").innerHTML=meniispis;


    //  $('.klasa').click(function(){
    //      var sek=800;
    //      var body = $("html, body");
    //      var target=$(this).attr('href');
    //      if(target=="#products"||target=="#register"||target=="#author"||target=="#findChristal")
    //         sek=sek*2.5;
    //     body.animate({ scrollTop: $(target).offset().top}, sek, 'swing', function() {});
    // })

    // $('#shopnowBtn').click(function(){

    //     var sek=800;
    //     var body=$("html, body");
    //     var target=$('#products');
    //     body.animate({ scrollTop: $(target).offset().top}, sek, 'swing', function() {});
    // })


/** PRODUCTS */
    
    
    

     /* FILTER/SORT */


     $("#categories").click(function(){
        $("#catList").slideToggle();
      });
      
      $("#sort").click(function(){
        $("#sortList").slideToggle();
      });

      
      
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


    

    

    /* SOCIALMEDIA */
    var nizSocial=["fa-facebook","fa-instagram","fa-youtube","fa-twitter","fa-pinterest"];
    var nizSocialHref=["www.facebook.com","www.instagram.com","www.youtube.com","www.twitter.com","www.pinterest.com"];
    var socialIspis='';
    for(var i=0;i<nizSocial.length;i++){
        socialIspis+=`<a href="https://${nizSocialHref[i]}/" target="_blank"><i class="fab ${nizSocial[i]}"></i></a>`
    }
    document.getElementById("divSocial").innerHTML=socialIspis;
    document.getElementById("menuBasket").innerHTML=socialIspis;

    
/* FOOTER */
    document.getElementById("newsletterSubmit").addEventListener("click",function(){

        var regExMail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        var nizOk=[];
        var nizGreske=[];
        var vrednostNews=document.getElementById("newsletterEmail").value;
        var spanError=document.getElementsByClassName("regexError");

        if(vrednostNews!=""){
            if(!regExMail.test(vrednostNews)){
                spanError[8].innerHTML="Invalid email";
                nizGreske.push('You have to enter regular email');
                console.log("ddOffK")
            }else{
                spanError[8].style.display="none";
                nizOk.push(vrednostNews);
                console.log("ddOK")
            }
        }else{
            spanError[8].innerHTML="Field is empty";
        }
    })
    
    var nizInfo=["About us","Privacy Policy","Delivery Informations","Terms & Conditions"];
    var ispisInfo="<ul>";
    for(var i=0;i<nizInfo.length;i++){
        ispisInfo+=`<li><a class="footerinfo" >${nizInfo[i]}</a></li>`;
    }
    ispisInfo+="</ul>";
    document.getElementsByClassName("divFooter")[1].innerHTML='<h1>Informations:</h1>'+ispisInfo;



    var info=["We have been involved in the world of gemstones, crystals, and fossils for nearly 5 years now.  We work with mines, cutters, and stone masons around the world to seek out the best quality raw, rough, tumbled, faceted, polished and lapidary gemstones.  We hand-select the gemstones we provide in our shop as every stone has a story and we want the gemstones to show you their natural power.</br> &#9885; </br>We are a small business who puts a lot of time, energy, and love into everything we do.  You can buy our gemstones online for working with crystal healing or crystal grids, because you’re a rock hound, or because you simply love the beauty of gemstones for decorative purposes.</br> &#9885; </br>We welcome questions and providing you assistance in choosing the gemstones that will prove significant to your life journey.Products sold by Crystal Gemstone Shop are intended for adult collectors of crystals and gemstones; children 14 years of age or younger should only work with crystals and gemstones with adult supervision." ,
    "In today's world of cyberspace privacy is becoming ever more important as the capacity grows for misuse of information you may provide in the course of doing business. We are committed to keeping any information you may provide in the course of your use of this site or that we may gather about you entirely private. We pledge absolutely not to pass that information on, to disclose it or to allow access of any third party to that information with the exception of third parties required to fulfil a cvlient order. We use an external shipping company to ship orders and a third part payment processor to process payments on this website. These companies do not retain, store or use personal information for any other purpose.","Shipping is on Mondays and Thursdays (not on public and bank holidays).</br> &#9885; </br>We provide the lowest shipping cost possible through USPS and FedEx. We do ship worldwide so everyone can enjoy the beauty & power of our offerings. </br> &#9885; </br>We ship anywhere from the 1 business day to 3 business days of your order; depending on order flow. Then you can select during check out the type of delivery you wish for your package.We are not responsible for lost packages, but we do everything we can from our side with the United States Postal Service to help you locate your lost package.</br> &#9885; </br> While most international packages arrive within 1-2 weeks it can take up to 8 weeks for delivery in some countries. Be aware that any international customs office can detain a package for up to 30 days.","Crystal Gemstone Shop offers a 100% money back satisfaction guarantee for our crystals and gems. Please contact us within 10 days of delivery of your package.  You can opt for an exchange or refund. </br> &#9885; </br> Please do not leave neutral or negative feedback without giving us a chance to make things right - we love keeping our collectors happy.To return any order you must contact us first to receive authorization for the return.  When you return an order everything must be in the original packaging; which means the bubble wrap, box, and any other packing materials you received it with.  It must be returned in the same box or bubble mailer your order arrived in, and you must include a copy of the original invoice so we can correctly identify you as the customer.</br> &#9885; </br>  The returned order must be received in the same condition you received it in.  If the returned order arrives broken due to careless re-packaging, or if you return an order without receiving the proper acknowledgement from us, your order will not be eligible for return credit.We accept Paypal and all major credit cards.  Any state or local taxes that apply will be collected.  If you have to cancel an order please do so within 24 hours as your item may ship the same day."
    ];
    
            
           
            



    /*SLIDEUP*/
    // document.addEventListener("scroll",function(){
       

    
    //     var ofsetEl=$('#footer').offset().top;
    //     var welc=$('#welcome').offset().top;
        
    //     var ofset=window.scrollY+welc;
        
       
    //     if(ofset>50){
    //         if(ofset>ofsetEl){
    //         $('.top i').css('color','black');
    //         }
    //         else{
    //             $('.top i').css('color','white');
    //         }
    //         if(ofset==welc){
    //             $('.top').hide();
    //         }
    //         if(ofset>welc)
    //         $('.top').show('slow');
       
           
    //     }
    //     else{
    //         $('.top').hide();
    //     }
        
        

    // })
    // $('.top').click(function(){
    //     $("html, body").animate({ scrollTop: "0" },1000); 
    // })


    function AnimateRotate(angle,repeat) {
        var duration= 1500;
        setTimeout(function() {
            if(repeat && repeat == "infinite") {
                AnimateRotate(angle,repeat);
            } else if ( repeat && repeat > 1) {
                AnimateRotate(angle, repeat-1);
            }
        },duration)    
        var $elem = $('.zvezdica');
    
        $({deg:0}).animate({deg: angle}, {
            duration: duration,
            step: function(now) {
                $elem.css({
                    'transform': 'rotate('+ now +'deg)'
                });
            }
        });
    }
    AnimateRotate(360,"infinite");


    $('.footerinfo').click(function(){
      
       var indeks = $('.footerinfo').index(this);
       for(var i=0;i<info.length;i++){
           if(i==indeks)
            $('.modal-body p').html(info[i]);
        }
        const modal = document.querySelector('#footer-modal');
          
               const closeBtn = document.querySelector('.close');
             
               closeBtn.addEventListener('click', closeModal);
               window.addEventListener('click', outsideClick);
   
               
               function openModal() {
               modal.style.display = 'block';
               }
   
               function closeModal() {
               modal.style.display = 'none';
               }
   
               
               function outsideClick(e) {
               if (e.target == modal) {
                   modal.style.display = 'none';
               }
               }
        openModal();
          
           
    })
  /*SORT*/
    $("#priceDesc").click(function(e){
        e.preventDefault();
        let array=$(".product");
        array.sort(function(a,b){
            a=parseInt( $(a).find(".price").text(),10);
            b=parseInt( $(b).find(".price").text(),10);
            if(a>b){return 1;}
            else if(a<b){return -1;}
            else{return 0;}
        })
        $("#productList").append(array);
    })
    $("#priceAsc").click(function(e){
        e.preventDefault();
        let array=$(".product");
        array.sort(function(a,b){
            a=parseInt( $(a).find(".price").text(),10);
            b=parseInt( $(b).find(".price").text(),10);
            if(a>b){return -1;}
            else if(a<b){return 1;}
            else{return 0;}
        })
        $("#productList").append(array);
    })
    $("#nameAsc").click(function(e){
        e.preventDefault();
        let array=$(".product");
        array.sort(function(a,b){
            a=$(a).find(".name").text();
            b=$(b).find(".name").text();
            if(a>b){return 1;}
            else if(a<b){return -1;}
            else{return 0;}
        })
        $("#productList").append(array);
    })
    $("#nameDesc").click(function(e){
        e.preventDefault();
        let array=$(".product");
        array.sort(function(a,b){
            a=$(a).find(".name").text();
            b=$(b).find(".name").text();
            if(a>b){return -1;}
            else if(a<b){return 1;}
            else{return 0;}
        })
        $("#productList").append(array);
    })

    /* AJAX */     
    $.ajax({
        url: 'data/categories.json',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          categories(data);
        },
        error: function (err) {
          console.error(err);
        }
      }); 
      $.ajax({
        url:"data/products.json",
        method:"get",
        type:"json",
        success:function(data){
            inputProducts(data);
        },
        error:function(xhr,status,error){
            alert(status);
        }
    })

    
}
function inputProducts(products){
    let ispis="";
    for(let p of products){
        ispis+=` 
         
         <div class="product">
         
            <div class="productSlika">
            <img src="${p.image.src}" alt="${p.image.alt}"/>
            </div>
            <h1 class="name">${p.name}</h1>
            <p class="price">${priceDot(p.prices.price)} $ </p></br>
            <a class="buy"/> CART <i class="fas fa-shopping-cart"></i> </a>

            <button class="modal-btn" value="${p.id}" >VIEW</button>
            
         
         </div>     
         `;
        
    }
    ispis+=`<div class="modal">
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
                    <a class="buy"/> CART <i class="fas fa-shopping-cart"></i> </a>
                
            <p class="description"></p>
        </div>
        
        
    </div>
    </div>`
    document.getElementById("productList").innerHTML=ispis; 

    $('.modal-btn').click(modalF);
    function modalF(){
        let vr=this.value;
        $.ajax({
            url:"data/products.json",
            method:"get",
            type:"json",
            success:function(data){
                let pr=data.filter(function (p) {
                    return p.id==vr
                    });
                document.getElementsByClassName('productSlikaMod')[0].style.backgroundImage="url('"+pr[0].image.src+"')";
                document.getElementsByClassName("nameMod")[0].innerHTML=pr[0].name;
                document.getElementsByClassName("description")[0].innerHTML=pr[0].description;
                document.getElementsByClassName("priceMod")[0].innerHTML=priceDot(pr[0].prices.price)+"$";
                
            },
            error:function(xhr,status,error){
                alert(status);
            }
        })

        let modal = document.querySelector(".modal");
        let closeBtn = document.querySelector(".close-btn");
        modal.style.display = "block"
        closeBtn.onclick = function(){
        modal.style.display = "none"
        }
        window.onclick = function(e){
            if(e.target == modal){
                modal.style.display = "none"
        }
         }
    }

    // let modalBtn = document.getElementById("modal-btn")
  
    

    function priceDot(price){
        return price.toString().replace(/(\d)(?=(\d\d)+(?!\d))/g, "$1.");
     }
    
    

}
function categories(cat){
    let ispis = "<ul>";
    for(let c of cat){
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
      url: 'data/products.json',
      method: 'GET',
      dataType: 'json',
      success: function (products) {
        const filtriraniPostovi = products.filter(function (p) {
          return p.categories.some(function (cat) {
            return cat.id==idCat
          });
        });

        inputProducts(filtriraniPostovi);
      },
      error: function (err) {
        console.error(err);
      }
    });
} 

