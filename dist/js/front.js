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
    var submenu_two_list_wrap = document.querySelectorAll(".submenu_two_list_wrap");
    submenu_one.forEach(function(elem, index) {
      elem.addEventListener("click", function(e) {
        var thisitem = e.currentTarget;
        var thisitem_two = siblings(thisitem);
        var timerid = 0;
        thisitem.classList.toggle("active");
        thisitem_two.forEach(function(elem, index) {
          var childrenHeight = 0;
          if (elem.classList.contains("submenu_two_list_wrap")) {
            if (timerid) {
              clearTimeout(timerid)
            }
            if (thisitem.classList.contains("active")) {
              elem.classList.add("active");
              childrenHeight = elem.children[0].offsetHeight;
              timerid = setTimeout(function() {
                elem.style.height = childrenHeight + "px";
              }, 30);
            } else {
              elem.style.height = "0px";
              timerid = setTimeout(function() {
                elem.classList.remove("active");
              }, 510);
            }
          }
        });
      }, false);
    });
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
  mbTotal();
  mapMenu();
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
  this.selector = document.querySelector(target);
  if (this.selector == null) {
    return;
  }
  this.domBody.setAttribute("data-scr", window.pageYOffset);
  this.domBody.style.marginTop = -window.pageYOffset + "px";
  this.scrollValue = window.pageYOffset;
  this.domHtml.classList.add("touchDis");
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
        objThis.domHtml.classList.remove("touchDis");
        objThis.domBody.style.marginTop = 0;
        window.scrollTo(0, parseInt(objThis.domBody.getAttribute("data-scr")));
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