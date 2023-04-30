const app = {
  $: {
    main: document.querySelector("#main"),
    form: document.querySelector("#default-form"),
    btn: document.querySelector(".btn"),
    btnNext: document.querySelector("#btn-form"),
    btnBack: document.querySelector("#btn-back"),
  },

  $$: {
    allLinks: document.querySelectorAll("aside li span"),
  },

  state: {
    currentForm: `form1`,
    activeLink: 0,
    selecetedForm2Plan: {
      arcade: "9",
      advanced: "12",
      pro: "15",
    },
    toggleMYSta: "month",
    selectedAddOns: {
      onlineService: {
        type: "Online Service",
        value: 1,
        feat: "Acces to multiplayer games",
        exp: "mo",
      },
      largerStorage: {
        type: "Local Storage",
        value: 2,
        feat: "Acces to multiplayer games",
        exp: "mo",
      },
      customizableProfile: {
        type: "Customizable Profile",
        value: 2,
        feat: "Acces to multiplayer games",
        exp: "mo",
      },
    },
  },

  // pricing
  pricing: {
    monthly: {
      plan: {
        arcade: "9",
        advanced: "12",
        pro: "15",
      },
      addOns: {
        onlineService: {
          type: "Online Service",
          value: 1,
          feat: "Acces to multiplayer games",
          exp: "mo",
        },
        largerStorage: {
          type: "Local Storage",
          value: 2,
          feat: "Acces to multiplayer games",
          exp: "mo",
        },
        customizableProfile: {
          type: "Customizable Profile",
          value: 2,
          feat: "Acces to multiplayer games",
          exp: "mo",
        },
      },
    },
    yearly: {
      plan: {
        arcade: "90",
        advanced: "120",
        pro: "150",
      },
      addOns: {
        onlineService: {
          type: "Online Service",
          value: 10,
          feat: "Acces to multiplayer games",
          exp: "yr",
        },
        largerStorage: {
          type: "Local Storage",
          value: 20,
          feat: "Acces to multiplayer games",
          exp: "yr",
        },
        customizableProfile: {
          type: "Customizable Profile",
          value: 20,
          feat: "Acces to multiplayer games",
          exp: "yr",
        },
      },
    },
  },

  // initial current user data
  currentUserInfo: {
    id: crypto.randomUUID(),
    name: "",
    email: "",
    phone: "",
    plan: {
      type: {
        id: "arcade",
      },
      yearOrMonth: "",
    },
    addOns: [],
  },

  // DOM helper method
  addClass(adding) {
    adding.classList.add("gray");
  },

  activateLink() {
    app.$$.allLinks.forEach((el) => {
      el.classList.remove("current-form");
    });
    app.$$.allLinks[app.state.activeLink].classList.add("current-form");
  },

  htmlForm1({ name, email, phone }) {
    return `<caption>
    <h2>Personal Info</h2>
  </caption>
  <p>Please provide your name, email address, and phone number.</p>
  <label for="name">Name</label>
  <input
    type="text"
    name="name"
    placeholder="e.g. Muhammad Fahrul"
    value="${name}"
    required
  />
  <label for="email">email</label>
  <input
    type="email"
    name="email"
    placeholder="e.g. fahrulm900@gmail.com"
    value="${email}"
    required
  />
  <label for="phone">phone</label>
  <input
    type="tel"
    name="phone"
    placeholder="e.g. 8989898"
    value="${phone}"
    required
  />
  <input type="submit" id="submit-form" hidden />`;
  },

  htmlForm2(formComp) {
    return `<caption>
    <h2>Select your plan</h2>
  </caption>
  <p>You have the option of monthly or yearly billing.</p>
  <div class="test">
  ${formComp}
  </div>
  </div>
  <div class="toggle-mon-yr">
    <span>monthly</span>
    <div><span></span></div>
    <span>yearly</span>
  </div>
  <input type="submit" value="" id="submit-form" hidden />`;
  },

  htmlForm3(props) {
    function htmlUtilAdds(utils) {
      return `
       <div>
       <label class="radio-box check" for="${utils.type}">
         <div class="flex">
           <input
             type="checkbox"
             name="add-ons"
             id="${utils.type}"
             value="${utils.value}"
           />
           <div>
             <span>${utils.type}</span>
             <p>${utils.feat}</p>
           </div>
         </div>
         <p>${utils.value}/${utils.exp}</p>
       </label>
       </div>`;
    }

    let output = "";
    for (const prop in props) {
      output += htmlUtilAdds(props[prop]);
    }
    return `
    <caption>
      <h2>Pick add-ons</h2>
    </caption>
    <p>Add-ons help enhance your gaming experience.</p>
      ${output}
    <input type="submit" value="" id="submit-form" hidden />`;
  },

  htmlForm4(props, addsOn, total) {
    return `<caption>
              <h2>Finishing up</h2>
            </caption>
            <p>Double-check everything looks OK before confirming.</p>
            <div class="radio-box form4 bg-magnolia finishing">
              <div>
                <div class="finishing-box">
                  <span>${props.type}<span>(${props.freq})</span></span>
                  <a id="change" href="#">Change</a>
                </div>
                <p>${props.fee}/${props.fre}</p>
              </div>
              ${addsOn}
            </div>
            <div class="radio-box form4 between">
              <span>Total <span>(per ${props.freq})</span></span>
              <p>$${total}/${props.fre}</p>
            </div>
            <input type="submit" id="submit-form" hidden />
            `;
  },

  htmlForm5() {
    return `
    <div id="__container">
      <img src="./assets/images/icon-thank-you.svg" alt="" />
      <h3>Thank you!</h3>
      <p>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
    `;
  },

  htmlForm2Comp(props) {
    let output = "";
    let mnYe = {
      fre: app.state.toggleMYSta,
      exp: app.state.toggleMYSta === "month" ? "" : "2 months free",
    };
    for (const prop in props) {
      output += `
            <div>
              <input type="radio" name="subscription" id="${prop}" value="${
        props[prop]
      }" hidden />
              <label class="radio-box" for="${prop}">
                <img src="./assets/images/icon-${prop}.svg" alt="" />
                <div>
                  <span>${prop}</span>
                  <p>$${props[prop]}/${mnYe.fre}</p>
                  <p>${mnYe.exp || ""}</p>
                </div>
              </label>
            </div>`;
    }

    return output;
  },

  htmlAddsOn(addsOn) {
    let outPut = "";
    addsOn.forEach((item) => {
      outPut += `
      <div>
        <div class="finishing-box">
          <span>${item.type}</span>
        </div>
        <p>$${item.fee}/${item.fre}</p>
      </div>`;
    });
    return outPut;
  },

  stepOne(e) {
    // store first step data
    app.currentUserInfo.name =
      e.target.querySelector('input[name="name"]').value;
    app.currentUserInfo.email = e.target.querySelector(
      'input[name="email"]'
    ).value;
    app.currentUserInfo.phone = e.target.querySelector(
      'input[name="phone"]'
    ).value;

    // rendering html and all functionality
    e.target.innerHTML = app.htmlForm2(
      app.htmlForm2Comp(app.state.selecetedForm2Plan)
    );
    app.$.btnBack.style.display = "block";
    const checkRadioBtn = document.querySelectorAll(
      'input[name="subscription"]'
    );
    checkRadioBtn.forEach((input) => {
      if (input.id === app.currentUserInfo.plan.type.id) {
        input.setAttribute("checked", "true");
      }
    });
    const btnTgleMY = document.querySelector(".toggle-mon-yr div");
    const prevMYEl = btnTgleMY.previousElementSibling;
    const nextMYEl = btnTgleMY.nextElementSibling;
    if (app.state.toggleMYSta === "month") {
      app.addClass(nextMYEl);
    } else {
      app.addClass(prevMYEl);
    }
    const btnSpan = btnTgleMY.querySelector("span").classList;
    app.currentUserInfo.plan.yearOrMonth === "year"
      ? btnSpan.add("end-content")
      : btnSpan.remove("end-content");
    btnTgleMY.addEventListener("click", () => app.handlerToggleMy(btnTgleMY));
    app.$.btnNext.insertAdjacentElement("afterend", app.$.btnBack);

    app.state.currentForm = `form2`;
  },

  stepTwo(e) {
    app.currentUserInfo.plan.type = document.querySelector(
      'input[name="subscription"]:checked'
    );
    e.target.innerHTML = app.htmlForm3(app.state.selectedAddOns);
    const checkedInput = document.querySelectorAll('input[name="add-ons"]');
    checkedInput.forEach((input) => {
      app.currentUserInfo.addOns.forEach((el) => {
        if (input.id === el.id) {
          input.setAttribute("checked", "true");
        }
      });
    });
    app.state.currentForm = `form3`;
  },

  stepThree(e) {
    // check validity
    app.currentUserInfo.addOns =
      [...document.querySelectorAll('input[name="add-ons"]:checked')] || [];
    if (app.currentUserInfo.addOns.length < 1) {
      alert("centang minimal satu");
      app.state.activeLink--;
      app.activateLink();
      return;
    }

    const adds = app.currentUserInfo.addOns.map((item) => {
      return {
        type: item.id,
        fee: item.value,
        fre: app.state.toggleMYSta === "month" ? "mo" : "yr",
      };
    });

    const addOns = app.htmlAddsOn(adds);
    const props = {
      type: app.currentUserInfo.plan.type.id,
      fee: app.currentUserInfo.plan.type.value,
      fre: app.state.toggleMYSta === "month" ? "mo" : "yr",
      freq: app.state.toggleMYSta === "month" ? "monthly" : "yearly",
    };

    const total =
      adds
        .map((item) => {
          return item.fee;
        })
        .reduce((total, num) => {
          return +total + +num;
        }, 0) + +props.fee;

    e.target.innerHTML = app.htmlForm4(props, addOns, total);

    // rendering html and all functionality
    document.querySelector("#btn-form").textContent = "Confirm";
    // change btn
    const btnChange = document.querySelector("#change");
    btnChange.addEventListener("click", (e) => {
      app.state.activeLink = 1;
      app.activateLink();
      const form2Com = app.htmlForm2Comp(app.state.selecetedForm2Plan);
      app.$.form.innerHTML = app.htmlForm2(form2Com);
      const checkRadioBtn = document.querySelectorAll(
        'input[name="subscription"]'
      );
      checkRadioBtn.forEach((input) => {
        if (input.id === app.currentUserInfo.plan.type.id) {
          input.setAttribute("checked", "true");
        }
      });
      document.querySelector("#btn-form").textContent = "Next step";
      app.state.currentForm = "form2";
      const btnTgleMY = document.querySelector(".toggle-mon-yr div");
      const span = btnTgleMY.querySelector("span").classList;
      app.currentUserInfo.plan.yearOrMonth === "year"
        ? span.add("end-content")
        : span.remove("end-content");
      btnTgleMY.addEventListener("click", () => app.handlerToggleMy(btnTgleMY));
    });

    app.state.currentForm = `form4`;
  },

  handlerToggleMy(parentEl) {
    app.state.toggleMYSta =
      app.state.toggleMYSta === "month" ? "year" : "month";
    const span = parentEl.querySelector("span");
    span.classList.toggle("end-content");
    if (span.classList.contains("end-content")) {
      app.$.form.querySelector(".test").innerHTML = app.htmlForm2Comp(
        app.pricing.yearly.plan
      );
      parentEl.previousElementSibling.classList.add("gray");
      parentEl.nextElementSibling.classList.remove("gray");
      app.state.selectedAddOns = app.pricing.yearly.addOns;
      app.state.selecetedForm2Plan = app.pricing.yearly.plan;
      app.currentUserInfo.plan.yearOrMonth = "year";
    } else {
      app.$.form.querySelector(".test").innerHTML = app.htmlForm2Comp(
        app.pricing.monthly.plan
      );
      parentEl.previousElementSibling.classList.remove("gray");
      parentEl.nextElementSibling.classList.add("gray");
      app.state.selectedAddOns = app.pricing.monthly.addOns;
      app.state.selecetedForm2Plan = app.pricing.monthly.plan;
      app.currentUserInfo.plan.yearOrMonth = "month";
    }
    const checkRadioBtn = document.querySelectorAll(
      'input[name="subscription"]'
    );
    checkRadioBtn[0].setAttribute("checked", "true");
  },

  registerEventListerners() {
    app.$.form.addEventListener("submit", (e) => {
      e.preventDefault();
      // conditioning event form
      console.log(app.state.activeLink);
      if (app.state.currentForm === "form4") {
        app.state.activeLink = 2;
      }
      app.state.activeLink++;
      app.activateLink();
      switch (app.state.currentForm) {
        case `form1`:
          app.stepOne(e);
          break;

        case `form2`:
          app.stepTwo(e);
          break;

        case `form3`:
          app.stepThree(e);
          break;

        case "form4":
          console.log(app.state.currentForm);
          app.$.main.innerHTML = app.htmlForm5();
          break;
      }
    });

    // back funct
    app.$.btnBack.addEventListener("click", (e) => {
      if (app.state.currentForm === "form1") {
        return;
      }
      app.state.activeLink--;
      app.activateLink();
      switch (app.state.currentForm) {
        case "form2":
          app.currentUserInfo.plan.type = document.querySelector(
            'input[name="subscription"]:checked'
          );
          app.state.currentForm = "form1";
          app.$.form.innerHTML = app.htmlForm1(app.currentUserInfo);
          e.target.remove();
          break;
        case "form3":
          app.currentUserInfo.addOns =
            [...document.querySelectorAll('input[name="add-ons"]:checked')] ||
            [];
          app.state.currentForm = "form2";
          app.$.form.innerHTML = app.htmlForm2(
            app.htmlForm2Comp(app.state.selecetedForm2Plan)
          );
          const checkRadioBtn = document.querySelectorAll(
            'input[name="subscription"]'
          );
          checkRadioBtn.forEach((input) => {
            if (input.id === app.currentUserInfo.plan.type.id) {
              input.setAttribute("checked", "true");
            }
          });
          const btnTgleMY = document.querySelector(".toggle-mon-yr div");
          const prevMYEl = btnTgleMY.previousElementSibling;
          const nextMYEl = btnTgleMY.nextElementSibling;
          if (app.state.toggleMYSta === "month") {
            app.addClass(nextMYEl);
          } else {
            app.addClass(prevMYEl);
          }
          const span = btnTgleMY.querySelector("span").classList;
          app.currentUserInfo.plan.yearOrMonth === "year"
            ? span.add("end-content")
            : span.remove("end-content");
          btnTgleMY.addEventListener("click", () =>
            app.handlerToggleMy(btnTgleMY)
          );

          break;
        case "form4":
          app.state.currentForm = "form3";
          app.$.form.innerHTML = app.htmlForm3(app.state.selectedAddOns);
          const checkedInput = document.querySelectorAll(
            'input[name="add-ons"]'
          );
          checkedInput.forEach((input) => {
            app.currentUserInfo.addOns.forEach((el) => {
              if (input.id === el.id) {
                input.setAttribute("checked", "true");
              }
            });
          });
          document.querySelector("#btn-form").textContent = "Next step";
          break;
      }
    });
  },

  init() {
    app.registerEventListerners();
  },
};

window.addEventListener("load", app.init);
