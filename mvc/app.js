const app = {
  $: {
    form: document.querySelector("#default-form"),
    btn: document.querySelector(".btn"),
    btnNext: document.querySelector("#btn-form"),
    btnBack: document.createElement("label"),
  },

  state: {
    currentForm: `form1`,
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
        onlineService: "1",
        largerStorage: "2",
        customizableProfile: "2",
      },
    },
    yearly: {
      plan: {
        arcade: "90",
        advanced: "120",
        pro: "150",
      },
      addOns: {
        onlineService: "10",
        largerStorage: "20",
        customizableProfile: "20",
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

  data: {
    form2: {
      selecetedForm2Plan: [
        {
          type: "arcade",
          fee: 9,
          fre: "month",
        },
        {
          type: "advanced",
          fee: 12,
          fre: "month",
        },
        {
          type: "pro",
          fee: 15,
          fre: "month",
        },
      ],
      toggleMYSta: "month",
    },
    form3: {
      addsOns: {
        onlineServ: {
          value: 1,
        },
        largeSto: {
          value: 2,
        },
        customizable: {
          value: 2,
        },
        exp: "mo",
      },
    },
  },

  plan: {
    month: [
      {
        type: "arcade",
        fee: 9,
        fre: "month",
      },
      {
        type: "advanced",
        fee: 12,
        fre: "month",
      },
      {
        type: "pro",
        fee: 15,
        fre: "month",
      },
    ],
    year: [
      {
        type: "arcade",
        fee: 90,
        fre: "year",
        exp: `2 months free`,
      },
      {
        type: "advanced",
        fee: 12,
        fre: "year",
        exp: `2 months free`,
      },
      {
        type: "pro",
        fee: 15,
        fre: "year",
        exp: `2 months free`,
      },
    ],
  },

  AddsOn: {
    month: {
      onlineServ: {
        value: 1,
      },
      largeSto: {
        value: 2,
      },
      customizable: {
        value: 2,
      },
      exp: "mo",
    },
    year: {
      onlineServ: {
        value: 10,
      },
      largeSto: {
        value: 20,
      },
      customizable: {
        value: 20,
      },
      exp: "yr",
    },
  },

  // DOM helper method
  addClass(adding) {
    adding.classList.add("gray");
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
    return `<caption>
            <h2>Pick add-ons</h2>
            </caption>
            <p>Add-ons help enhance your gaming experience.</p>
            <div>
        <label class="radio-box check" for="online-service">
          <div class="flex">
            <input
              type="checkbox"
              name="add-ons"
              id="online-service"
              value="${props.onlineServ.value}"
            />
            <div>
              <span>Online service</span>
              <p>Access to multiplayer games</p>
            </div>
          </div>
          <p>${props.onlineServ.value}/${props.exp}</p>
        </label>
        </div>

          <div>
          <label class="radio-box check" for="larger-storage">
            <div class="flex">
              <input
                type="checkbox"
                name="add-ons"
                id="larger-storage"
                value="${props.largeSto.value}"
              />
              <div>
                <span>Larger-Storage</span>
                <p>Extra 1TB of cloud save</p>
              </div>
            </div>
            <p>${props.largeSto.value}/${props.exp}</p>
          </label>
          </div>

          <div>
          <label class="radio-box check" for="customizable">
            <div class="flex">
              <input
                type="checkbox"
                name="add-ons"
                id="customizable"
                value="${props.customizable.value}"
              />
              <div>
                <span>Customizable Profile</span>
                <p>Custom theme on your profile</p>
              </div>
            </div>
            <p>${props.customizable.value}/${props.exp}</p>
          </label>
          <input type="submit" value="" id="submit-form" hidden />
          </div>`;
  },

  htmlForm4(props, addsOn, total) {
    return `<caption>
              <h2>Finishing up</h2>
            </caption>
            <p>Double-check everything looks OK before confirming.</p>
            <div class="radio-box form4 bg-magnolia finishing">
              <div>
                <div class="finishing-box">
                  <span>${props.type} <span>(${props.freq})</span></span>
                  <a id="change" href="#">Change</a>
                </div>
                <p>${props.fee}/${props.fre}</p>
              </div>
              ${addsOn}
            </div>
            <div class="radio-box form4 between">
              <span>Total <span>(per ${props.freq})</span></span>
              <p>$${total}/${props.fre}</p>
            </div>`;
  },

  htmlForm2Comp(props) {
    return props
      .map((data) => {
        return `
            <div>
              <input type="radio" name="subscription" id="${
                data.type
              }" value="${data.fee}" hidden />
              <label class="radio-box" for="${data.type}">
                <img src="./assets/images/icon-${data.type}.svg" alt="" />
                <div>
                  <span>${data.type}</span>
                  <p>$${data.fee}/${data.fre}</p>
                  <p>${data.exp || ""}</p>
                </div>
              </label>
            </div>`;
      })
      .join("");
  },

  htmlAddsOn(addsOn) {
    return addsOn
      .map((item) => {
        return `
      <div>
        <div class="finishing-box">
          <span>${item.type}</span>
        </div>
        <p>$${item.fee}/${item.fre}</p>
      </div>`;
      })
      .join("");
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
      app.htmlForm2Comp(app.data.form2.selecetedForm2Plan)
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
    if (app.data.form2.toggleMYSta === "month") {
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
  },

  stepTwo(e) {
    app.currentUserInfo.plan.type = document.querySelector(
      'input[name="subscription"]:checked'
    );
    e.target.innerHTML = app.htmlForm3(app.data.form3.addsOns);
    const checkedInput = document.querySelectorAll('input[name="add-ons"]');
    checkedInput.forEach((input) => {
      app.currentUserInfo.addOns.forEach((el) => {
        if (input.id === el.id) {
          input.setAttribute("checked", "true");
        }
      });
    });
  },

  stepThree(e) {
    // check validity
    app.currentUserInfo.addOns =
      [...document.querySelectorAll('input[name="add-ons"]:checked')] || [];
    if (app.currentUserInfo.addOns.length < 1) {
      alert("centang minimal satu");
      return;
    }

    const adds = app.currentUserInfo.addOns.map((item) => {
      return {
        type: item.id,
        fee: item.value,
        fre: app.data.form3.addsOns.exp,
      };
    });

    const addOns = app.htmlAddsOn(adds);

    const props = {
      type: app.currentUserInfo.plan.type.id,
      fee: app.currentUserInfo.plan.type.defaultValue,
      fre: app.data.form3.addsOns.exp,
      freq: app.data.form3.addsOns.exp === "mo" ? "monthly" : "yearly",
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
      const form2Com = app.htmlForm2Comp(app.data.form2.selecetedForm2Plan);
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
  },

  handlerToggleMy(parentEl) {
    app.data.form2.toggleMYSta =
      app.data.form2.toggleMYSta === "month" ? "year" : "month";
    const span = parentEl.querySelector("span");
    span.classList.toggle("end-content");
    if (span.classList.contains("end-content")) {
      app.$.form.querySelector(".test").innerHTML = app.htmlForm2Comp(
        app.plan.year
      );
      parentEl.previousElementSibling.classList.add("gray");
      parentEl.nextElementSibling.classList.remove("gray");
      app.data.form3.addsOns = app.AddsOn.year;
      app.data.form2.selecetedForm2Plan = app.plan.year;
      app.currentUserInfo.plan.yearOrMonth = "year";
    } else {
      app.$.form.querySelector(".test").innerHTML = app.htmlForm2Comp(
        app.plan.month
      );
      parentEl.previousElementSibling.classList.remove("gray");
      parentEl.nextElementSibling.classList.add("gray");
      app.data.form3.addsOns = app.AddsOn.month;
      app.data.form2.selecetedForm2Plan = app.plan.month;
      app.currentUserInfo.plan.yearOrMonth = "month";
    }
    const checkRadioBtn = document.querySelectorAll(
      'input[name="subscription"]'
    );
    checkRadioBtn[0].setAttribute("checked", "true");
  },

  init() {
    app.$.form.addEventListener("submit", (e) => {
      e.preventDefault();
      // conditioning event form
      switch (app.state.currentForm) {
        case `form1`:
          app.stepOne(e);
          app.state.currentForm = `form2`;
          break;

        case `form2`:
          app.stepTwo(e);
          app.state.currentForm = `form3`;
          break;

        case `form3`:
          app.stepThree(e);
          app.state.currentForm = `form4`;
          break;
      }
    });

    // initial back id
    app.$.btnBack.id = "btn-back";
    app.$.btnBack.textContent = "Go back";
    app.$.btnBack.addEventListener("click", (e) => {
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
            app.htmlForm2Comp(app.data.form2.selecetedForm2Plan)
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
          if (app.data.form2.toggleMYSta === "month") {
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
          app.$.form.innerHTML = app.htmlForm3(app.data.form3.addsOns);
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
};

window.addEventListener("load", app.init);
