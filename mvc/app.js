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

  data: {
    form1: {
      name: null,
      email: null,
      phone: null,
    },
    form2: {
      plan: null,
      yearOrMonth: null,
      selecetedForm2Plan: null,
    },
    form3: {
      addsOns: null,
      selectedAdds: null,
    },
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
    <span class="gray">yearly</span>
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

  subsTime: {
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

  stepOne(e) {
    // store first step data
    app.data.form1.name = e.target.querySelector('input[name="name"]').value;
    app.data.form1.email = e.target.querySelector('input[name="email"]').value;
    app.data.form1.phone = e.target.querySelector('input[name="phone"]').value;

    // rendering html and all functionality
    app.data.form2.yearOrMonth = app.subsTime.month; // default value
    e.target.innerHTML = app.htmlForm2(app.htmlForm2Comp(app.subsTime.month));
    const btnTgleMY = document.querySelector(".toggle-mon-yr div");
    btnTgleMY.addEventListener("click", () => app.handlerToggleMy(btnTgleMY));
    app.$.btnNext.insertAdjacentElement("afterend", app.$.btnBack);
  },

  stepTwo(e) {
    app.data.form2.plan =
      document.querySelector('input[name="subscription"]:checked') || null;
    if (app.data.form2.plan === null) {
      alert("please");
      return;
    }
    e.target.innerHTML = app.htmlForm3(app.data.form3.addsOns);
  },

  stepThree(e) {
    // check validity
    app.data.form3.selectedAdds =
      [...document.querySelectorAll('input[name="add-ons"]:checked')] || [];
    if (app.data.form3.selectedAdds.length < 1) {
      alert("centang minimal satu");
      return;
    }

    const adds = app.data.form3.selectedAdds.map((item) => {
      return {
        type: item.id,
        fee: item.value,
        fre: app.data.form3.addsOns.exp,
      };
    });

    const addOns = app.htmlAddsOn(adds);

    const props = {
      type: app.data.form2.plan.id,
      fee: app.data.form2.plan.defaultValue,
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
      document.querySelector("#btn-form").textContent = "Next step";
      app.state.currentForm = "form2";
      const btnTgleMY = document.querySelector(".toggle-mon-yr div");
      const span = btnTgleMY.querySelector("span").classList;
      app.data.form2.yearOrMonth === "year"
        ? span.add("end-content")
        : span.remove("end-content");
      btnTgleMY.addEventListener("click", () => app.handlerToggleMy(btnTgleMY));
    });
  },

  handlerToggleMy(parentEl) {
    parentEl.querySelector("span").classList.toggle("end-content");
    if (parentEl.querySelector("span").classList.contains("end-content")) {
      app.$.form.querySelector(".test").innerHTML = app.htmlForm2Comp(
        app.subsTime.year
      );
      app.data.form3.addsOns = app.AddsOn.year;
      app.data.form2.selecetedForm2Plan = app.subsTime.year;
      app.data.form2.yearOrMonth = "year";
    } else {
      app.$.form.querySelector(".test").innerHTML = app.htmlForm2Comp(
        app.subsTime.month
      );
      app.data.form3.addsOns = app.AddsOn.month;
      app.data.form2.selecetedForm2Plan = app.subsTime.month;
      app.data.form2.yearOrMonth = "month";
    }
  },

  init() {
    app.$.form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(app.state.currentForm);
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
      console.log(app.state.currentForm);
      switch (app.state.currentForm) {
        case "form2":
          app.state.currentForm = "form1";
          app.$.form.innerHTML = app.htmlForm1(app.data.form1);
          e.target.remove();
          break;
        case "form3":
          app.state.currentForm = "form2";
          app.$.form.innerHTML = app.htmlForm2(
            app.htmlForm2Comp(app.data.form2.selecetedForm2Plan)
          );
          const btnTgleMY = document.querySelector(".toggle-mon-yr div");
          const span = btnTgleMY.querySelector("span").classList;
          app.data.form2.yearOrMonth === "year"
            ? span.add("end-content")
            : span.remove("end-content");
          btnTgleMY.addEventListener("click", () =>
            app.handlerToggleMy(btnTgleMY)
          );
          break;
        case "form4":
          app.state.currentForm = "form3";
          app.$.form.innerHTML = app.htmlForm3(app.data.form3.addsOns);
          document.querySelector("#btn-form").textContent = "Next step";
          break;
      }
    });
  },
};

window.addEventListener("load", app.init);
