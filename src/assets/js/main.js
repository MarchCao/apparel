// HAICE Apparel — minimal interactions
(function(){
  "use strict";

  // Mobile nav
  var toggle = document.getElementById("navToggle");
  if (toggle) {
    toggle.addEventListener("click", function(){
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.getElementById("mainNav").addEventListener("click", function(e){
      if (e.target.tagName === "A") {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Active nav highlight
  var page = document.body.getAttribute("data-page") || "home";
  document.querySelectorAll(".main-nav a").forEach(function(a){
    if (a.getAttribute("data-nav") === page) a.classList.add("active");
  });

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Contact form -> mailto (Phase 1: no server backend)
  var form = document.getElementById("inquiryForm");
  if (form) {
    form.addEventListener("submit", function(e){
      e.preventDefault();
      // Honeypot
      if (form.querySelector(".hp input").value) return;
      var v = function(name){
        var el = form.querySelector('[name="'+name+'"]');
        return el ? el.value.trim() : "";
      };
      var L = window.FORM_LABELS || {};
      var lines = [
        (L.name||"Name")+": "+v("name"),
        (L.company||"Company")+": "+v("company"),
        (L.email||"Email")+": "+v("email"),
        (L.country||"Country / Region")+": "+v("country"),
        (L.category||"Product Category")+": "+v("category"),
        (L.type||"OEM / ODM")+": "+v("type"),
        (L.quantity||"Estimated Quantity")+": "+v("quantity"),
        (L.delivery||"Target Delivery Date")+": "+v("delivery"),
        "",
        (L.message||"Message")+":",
        v("message")
      ];
      var subject = "[HAICE Apparel] " + ((L.subject_prefix||"Inquiry from")+" ") + (v("company") || v("name"));
      var href = "mailto:sales@haice.top?subject="+encodeURIComponent(subject)
               + "&body="+encodeURIComponent(lines.join("\n"));
      window.location.href = href;
    });
  }
})();
