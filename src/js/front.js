document.addEventListener("DOMContentLoaded", function() {
  commonInit();
});


function commonInit() {
  var touchstart = "ontouchstart" in window;
  var userAgent = navigator.userAgent.toLowerCase();
  var checkitem = [];
  if (touchstart) {
    browserAdd("touchmode");
  }
  if (userAgent.indexOf('samsung') > -1) {
    browserAdd("samsung");
  }

  if (navigator.platform.indexOf('Win') > -1 || navigator.platform.indexOf('win') > -1) {
    browserAdd("window");
  }

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    // iPad or iPhone
    browserAdd("ios");
  }

  window.onload = function() {}
  commonLayout();

  function browserAdd(opt) {
    document.querySelector("html").classList.add(opt);
  }
}

function commonLayout() {
  // mobile total
  function mbTotal() {
    var touchstart = "ontouchstart" in window;
    var btn_mobile_menu = document.querySelector(".btn_mobile_menu"),
      mobile_mainmenu_zone = document.querySelector(".mobile_mainmenu_zone"),
      mainmenu_dim = document.querySelector(".mainmenu_dim"),
      btn_mbmenuclose = document.querySelector(".btn_mbmenuclose"),
      domHtml = document.querySelector("html"),
      domBody = document.querySelector("body");

    // init 
    if (mobile_mainmenu_zone === null) {
      return;
    }
    btn_mobile_menu.addEventListener("click", function(e) {
      e.preventDefault();
      totalOpen();
    }, false);
    btn_mbmenuclose.addEventListener("click", function(e) {
      e.preventDefault();
      totalClose();
    }, false);
    mainmenu_dim.addEventListener("click", function(e) {
      e.preventDefault();
      totalClose();
    }, false);

    function totalOpen() {
      mobile_mainmenu_zone.classList.add("active")
      setTimeout(function() {
        mobile_mainmenu_zone.classList.add("motion");
        if (touchstart) {
          domBody.setAttribute("data-scr", window.pageYOffset);
          domBody.style.marginTop = -window.pageYOffset + "px";
          domHtml.classList.add("touchDis");
        }
      }, 30);
    }

    function totalClose() {
      mobile_mainmenu_zone.classList.remove("motion");
      setTimeout(function() {
        mobile_mainmenu_zone.classList.remove("active");
        domHtml.classList.remove("touchDis");
        domBody.style.marginTop = 0;
        window.scrollTo(0, parseInt(domBody.getAttribute("data-scr")));
      }, 500);
    }
  }
  // sub
  function mapMenu() {
    var submenu_one = document.querySelectorAll(".submenu_one");
    var submenu_item_list = document.querySelector(".submenu_item_list");
    var submenu_item = document.querySelectorAll(".submenu_item:not(.define_home)");
    var submenu_two_list_wrap = document.querySelectorAll(".submenu_two_list_wrap");
    var currentItem = null;
    if(submenu_item.length<2){
      if(submenu_item_list !== null){
        submenu_item_list.classList.add("type2");
      }
    }
 
    submenu_one.forEach(function(elem, index) {
      if(!siblings(elem).length){
        elem.classList.add("only_text");
      }
      elem.addEventListener("click", function(e) {
        var thisitem = e.currentTarget;
        var thisitem_two = siblings(thisitem);
        
        if(currentItem && currentItem !== thisitem){
          currentItem.classList.remove("active");
          twodepNonActive(siblings(currentItem));
        }
        if(!thisitem_two.length){
          return;
        }
        thisitem.classList.toggle("active");
        twodepActive(thisitem_two,thisitem);
        currentItem = thisitem;
      }, false);
    });
    function twodepActive(twomenu_list,one){
      var timerid = 0;
      twomenu_list.forEach(function(elem) {
        var childrenHeight = 0;
        if (elem.classList.contains("submenu_two_list_wrap")) {
          if (timerid) {
            clearTimeout(timerid)
          }
          if (one.classList.contains("active")) {
            elem.classList.add("active");
            childrenHeight = elem.children[0].offsetHeight;
            timerid = setTimeout(function() {
              elem.style.height = childrenHeight + "px";
            }, 30);
          } else {
            elem.style.height = "0px";
            timerid = setTimeout(function() {
              elem.classList.remove("active");
            }, 500);
          }
        }
      });
    }
    function twodepNonActive(twomenu_list){
      var timerid2 = 0;
      twomenu_list.forEach(function(elem) {
        if (elem.classList.contains("submenu_two_list_wrap")) {
          if (timerid2) {
            clearTimeout(timerid2)
          }
          elem.style.height = "0px";
          timerid2 = setTimeout(function() {
            elem.classList.remove("active");
          }, 500);
        }
      });
    }

    document.addEventListener("click", function(e) {
      var timerid = 0;
      if (!e.target.closest(".submenu_item")) {
        submenu_one.forEach(function(elem) {
          elem.classList.remove("active");
        });
        submenu_two_list_wrap.forEach(function(elem) {
          elem.style.height = "0px";
          timerid = setTimeout(function() {
            elem.classList.remove("active");
          }, 510);
        });
      }

      // submenu_one_active.classList.remove("active");
      // submenu_two_list_wrap_active.style.height = "0px";
      // timerid = setTimeout(function(){
      //   submenu_two_list_wrap_active.classList.remove("active");
      // },510);
    }, false);
  }
  // gotop
  function goTop() {
    var btn_topgo = document.querySelector(".btn_topgo");
    var domHtml = document.querySelector("html");
    if(btn_topgo == null){return;}
    btn_topgo.addEventListener("click", function(e) {
      e.preventDefault();
      domHtml.classList.add("smooth");
      setTimeout(function() {
        window.scrollTo(0, 0);
      }, 30);
    }, false);
    window.addEventListener("scroll", function() {
      var scroll = window.pageYOffset;
      if (scroll == 0) {
        domHtml.classList.remove("smooth");
      }
    });
  }
  // subminheight
  function subMinHeight(){
    var subcontent = document.querySelector(".subcontent");
    var subcontent_box_wrap = document.querySelector(".subcontent_box_wrap");
    var subcontent_box = document.querySelector(".subcontent_box");
    var subcontent_box_next = null;
    var subcontent_box_next_style = null;
    var subcontent_box_next_margin_top = 0;
    var subcontent_box_next_height = 0;

    var footer_wrap = document.querySelector(".footer_wrap");
    var html = document.querySelector("html");
    var body = document.querySelector("body");
    if(subcontent_box_wrap == null || subcontent_box_wrap == null){return;}
    subcontent_box_next = subcontent_box.nextElementSibling;
    action();
    window.addEventListener("resize",function(){
      action();
    },false);

    function action(){
      subcontent_box.style.removeProperty("min-height");
      var subcontent_box_wrap_cssobj = window.getComputedStyle(subcontent_box_wrap, null);
      var subcontent_box_wrap_get_bottom = parseInt(subcontent_box_wrap_cssobj.getPropertyValue("padding-bottom"));
      var subcontent_box_cssobj = window.getComputedStyle(subcontent_box, null);
      var subcontent_box_get_bottom = parseInt(subcontent_box_cssobj.getPropertyValue("padding-bottom"));
      var subcontent_box_get_top = parseInt(subcontent_box_cssobj.getPropertyValue("padding-top"));
      var footer_wrap_height = footer_wrap !== null ? footer_wrap.offsetHeight : 0;
      var documentHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

      if(subcontent_box_next !== null){
        subcontent_box_next_style = window.getComputedStyle(subcontent_box_next, null);
        subcontent_box_next_margin_top = parseInt(subcontent_box_next_style.getPropertyValue("margin-top"));
        subcontent_box_next_height = subcontent_box_next !== null ? subcontent_box_next.offsetHeight : 0;
      }


      

      subcontent_box.style.minHeight = documentHeight - subcontent_box.offsetTop - (subcontent_box_wrap_get_bottom + subcontent_box_get_top + subcontent_box_get_bottom + footer_wrap_height + subcontent_box_next_margin_top + subcontent_box_next_height) + "px";
      // subcontent.style.minHeight = documentHeight - subcontent.offsetTop - (subcontent_box_wrap_get_bottom+subcontent_box_get_bottom+footer_wrap_height)  + "px";
    }
  }

  mbTotal();
  mapMenu();
  goTop();
  subMinHeight();
}

function menuRock(item){
    var menuRockItem = document.querySelectorAll(item);
    menuRockItem.forEach(function(elem){
        elem.classList.add("active");
   });
}

function siblings(t) {
  var children = t.parentElement.children;
  var tempArr = [];

  for (var i = 0; i < children.length; i++) {
    tempArr.push(children[i]);
  }

  return tempArr.filter(function(e) {
    return e != t;
  });
}



function DesignModal(option) {
  this.message = option.message;
  this.domHtml = document.querySelector("html");
  this.domBody = document.querySelector("body");
  this.pagewrap = document.querySelector(".page_wrap");
  this.design_modal_wrap = null;
  this.btn_dmsmidentify = null;
  this.btn_dmsmcancel = null;
  this.duration = option.duration !== undefined ? option.duration : 400;

  this.initShow(option);
}

DesignModal.prototype.initShow = function(option) {
  var innerPublish = '';
  var objThis = this;
  innerPublish += "<div class='design_modal_wrap'>";
  innerPublish += "  <div class='bg_design_modal'></div>";
  innerPublish += "  <div class='design_modal_w'>";
  innerPublish += "          <div class='design_modal'>";
  innerPublish += "              <div class='design_modal_cont_w'><div class='design_modal_text'></div></div>";
  innerPublish += "              <div class='btn_dmsm_wrap'>";
  innerPublish += "                  <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmidentify'>확인</a>";
  if (option.type === "confirm") {
    innerPublish += "              <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmcancel'>취소</a>";
  }
  innerPublish += "              </div>";
  innerPublish += "          </div>";
  innerPublish += "  </div>";
  innerPublish += "</div>";
  this.modalparent = document.createElement('div');
  this.pagewrap.appendChild(this.modalparent);
  this.modalparent.classList.add("design_modal_insert_wrap");
  this.modalparent.innerHTML = innerPublish;

  if (option.type === "confirm" || option.type === "alert") {
    this.design_modal_text = document.querySelector(".design_modal_text");
    this.btn_dmsmidentify = document.querySelector(".btn_dmsmidentify");
    this.design_modal_text.innerHTML = option.message;
  }
  if (option.type === "confirm") {
    this.btn_dmsmcancel = document.querySelector(".btn_dmsmcancel");
  }
  this.pagewrap.style.zIndex = 0;
  this.domBody.setAttribute("data-scr", window.pageYOffset);
  this.domBody.style.marginTop = -window.pageYOffset + "px";
  this.domHtml.classList.add("touchDis");
  this.design_modal_wrap = document.querySelector(".design_modal_wrap");
  this.closetrigger = document.querySelectorAll(".close_dmtrigger");
  this.design_modal_wrap.classList.add("active");
  setTimeout(function() {
    objThis.design_modal_wrap.classList.add("motion");
  }, 30);
  this.bindEvent(option);
}
DesignModal.prototype.removeHide = function() {
  var objThis = this;
  this.design_modal_wrap.classList.remove("motion");
  setTimeout(function() {
    objThis.design_modal_wrap.classList.remove("active");
    document.querySelector(".design_modal_insert_wrap").remove();
    objThis.design_modal_wrap.remove();
    objThis.domHtml.classList.remove("touchDis");
    objThis.domBody.style.marginTop = 0;

    window.scrollTo(0, Number(objThis.domBody.getAttribute("data-scr")));
  }, 530);
}
DesignModal.prototype.bindEvent = function(option) {
  var objThis = this;
  for (var i = 0; i < this.closetrigger.length; i++) {
    this.closetrigger[i].addEventListener("click", function() {
      objThis.removeHide();
    }, false);
  }
  if (this.btn_dmsmidentify !== null) {
    this.btn_dmsmidentify.addEventListener("click", function() {
      if (option.identify_callback !== undefined) {
        option.identify_callback();
      }
    }, false);
  }
  if (this.btn_dmsmcancel !== null) {
    this.btn_dmsmcancel.addEventListener("click", function() {
      if (option.cancel_callback !== undefined) {
        option.cancel_callback();
      }
    }, false);
  }
}



function DesignPopup(option) {
  this.selector = null;
  if (option.selector !== undefined) {
    this.selector = document.querySelector(option.selector);
  }
  this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
  this.domHtml = document.querySelector("html");
  this.domBody = document.querySelector("body");
  this.pagewrap = document.querySelector(".page_wrap");
  this.btn_closeTrigger = null;
  this.btn_popupClose = null;
  this.bg_design_popup = null;
  this.scrollValue = 0;
  this.popupShow(option.selector);
}

DesignPopup.prototype.popupShow = function(target) {
  var objThis = this;
  var touchstart = "ontouchstart" in window;
  this.selector = document.querySelector(target);
  if (this.selector == null) {
    return;
  }
  this.scrollValue = window.pageYOffset;
  if(touchstart){
    this.domBody.setAttribute("data-scr", window.pageYOffset);
    this.domBody.style.marginTop = -window.pageYOffset + "px";
    this.domHtml.classList.add("touchDis");
  }
  this.selector.classList.add("active");
  setTimeout(function() {
    objThis.selector.classList.add("motion");
  }, 30);


  this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
  this.btn_popupClose = this.selector.querySelector(".btn_popup_close");

  this.bg_design_popup = this.selector.querySelector(".popup_wrap .bg_dim");
  this.domBody.append(this.selector);
  this.bindEvent(this.selector);

}
DesignPopup.prototype.popupHide = function(target) {
  var objThis = this;
  var touchstart = "ontouchstart" in window;
  if (target !== undefined) {
    if (typeof target == "object") {
      this.selector = target;
    } else {
      this.selector = document.querySelector(target);
    }
    this.selector.classList.remove("motion");
    setTimeout(function() {
      //remove
      objThis.selector.classList.remove("active");
      objThis.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
      if (objThis.design_popup_wrap_active.length == 0) {
        if(touchstart){
          objThis.domHtml.classList.remove("touchDis");
          objThis.domBody.style.marginTop = 0;
          window.scrollTo(0, parseInt(objThis.domBody.getAttribute("data-scr")));
        }
      }
    }, 420);
  }
}

DesignPopup.prototype.bindEvent = function() {
  var objThis = this;

  if (this.btn_closeTrigger.length) {
    for (var i = 0; i < this.btn_closeTrigger.length; i++) {
      this.btn_closeTrigger[i].addEventListener("click", function() {
        objThis.popupHide(objThis.selector);
      }, false);
    }
  }

  if (this.bg_design_popup !== null) {
    this.bg_design_popup.addEventListener("click", function(e) {
      e.preventDefault();
      objThis.popupHide(objThis.selector);
    }, false);
  }

  if (this.btn_popupClose !== null) {
    this.btn_popupClose.addEventListener("click", function(e) {
      e.preventDefault();
      objThis.popupHide(objThis.selector);
    }, false);
  }
};


// maxWid

function maxWid(device, item) {
  var deviceCheck = device;
  var itemObj = document.querySelectorAll(item);
  var windowWidth = window.innerWidth;

  action();
  window.addEventListener("resize", function() {
    if (windowWidth !== window.innerWidth) {
      action();
    }
    windowWidth = window.innerWidth;
  }, false);


  function action() {
    var maxArray = [];
    itemObj.forEach(function(elem) {
      elem.style.removeProperty("width");
      maxArray.push(elem.offsetWidth);
    });
    itemObj.forEach(function(elem) {
      // if(deviceCheck == "mobile"){
      //     if(window.innerWidth<1024){
      //         elem.style.width = Math.max.apply(null,maxArray)+"px";
      //     }else{
      //         elem.style.removeProperty("width");
      //     }
      // }else if(deviceCheck == "pc"){
      //     if(window.innerWidth>=1024){
      //         elem.style.width = Math.max.apply(null,maxArray)+"px";
      //     }else{
      //         elem.style.removeProperty("width");
      //     }
      // }else{
      //     elem.style.width = Math.max.apply(null,maxArray)+"px";
      // }
      if ((deviceCheck == "mobile" && window.innerWidth < 1024) || (deviceCheck == "pc" && window.innerWidth >= 1024) || (deviceCheck == "")) {
        elem.style.width = Math.max.apply(null, maxArray) + "px";
      } else {
        elem.style.removeProperty("width");
      }
    });
  }
}


function currentItemFunc() {
  var mc_current_item = document.querySelectorAll(".mc_current_item");
  var mc_current_wrap = document.querySelector(".mc_current_wrap");
  if (mc_current_item.length > 6) {
    mc_current_wrap.classList.add("skin2");
  }
}


function noticePopup(){
  var notice_popup_wrap = document.querySelector(".notice_popup_wrap");
  var notice_popup_cols = document.querySelectorAll(".notice_popup_cols");
  var btn_popup_close = document.querySelectorAll(".notice_popup_wrap .btn_popup_close");
  var btn_popup_close_trigger = document.querySelectorAll(".notice_popup_wrap .close_trigger");
  var today_check_trigger = document.querySelectorAll(".notice_popup_wrap .today_check");
  var notice_popup_cols_length = notice_popup_cols.length;
  
  
  // cookie 조회
  if(document.cookie.length){
    var parseCookie = str =>
      str
      .split(';')
      .map(v => v.split('='))
      .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
    }, {});
    var getCookie = parseCookie(document.cookie);
  }
  notice_popup_cols_length = document.querySelectorAll(".notice_popup_cols").length;
  if(notice_popup_cols_length ===0){return;}
  today_check_trigger.forEach(function(element,index){
    if(document.cookie.length===0){return;}
    var parent_target = element.closest(".notice_popup_cols");
    if(getCookie.hasOwnProperty(element.getAttribute("id"))){
      closePopup(parent_target);
    }
  });

  if(document.querySelectorAll(".notice_popup_cols").length==1){
    notice_popup_wrap.classList.add("only_one");
  }else if(document.querySelectorAll(".notice_popup_cols").length>1){
    notice_popup_wrap.classList.remove("only_one");
  }else{
    return;
  }
  
  notice_popup_wrap.classList.add("active");

  btn_popup_close.forEach(function(element){
    element.addEventListener("click",function(e){
      e.preventDefault();
      var parent_target = e.currentTarget.closest(".notice_popup_cols");
      closePopup(parent_target);
    });
  });

  btn_popup_close_trigger.forEach(function(element){
    element.addEventListener("click",function(e){
      e.preventDefault();
      var parent_target = e.currentTarget.closest(".notice_popup_cols");
      closePopup(parent_target);
    });
  });

  today_check_trigger.forEach(function(element){
    element.addEventListener("click",function(e){
      var currentTarget = e.currentTarget;
      var parent_target = currentTarget.closest(".notice_popup_cols");
      if(currentTarget.checked){
        setTimeout(function(){
          closePopup(parent_target);
          setCookie(currentTarget.getAttribute("id"),"true",1);
        },200);
      }
    });
  });

  function closePopup(target){
    var target_element = target;
    notice_popup_cols = document.querySelectorAll(".notice_popup_cols");
    notice_popup_cols_length = notice_popup_cols.length;
    if(notice_popup_cols_length == 1){
      notice_popup_wrap.classList.remove("active");
    }
    target_element.remove();
  }
  var setCookie = function(name, value, exp) {      
    var date = new Date();      
    date.setTime(date.getTime() + exp*24*60*60*1000);      
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';  
  };
}