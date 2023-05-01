export default class View {
  $ = {};
  $$ = {};
  constructor() {
    this.$.main = document.querySelector("#main");
    this.$.form = document.querySelector("#default-form");
    this.$.btn = document.querySelector(".btn");
    this.$.btnNext = document.querySelector("#btn-form");
    this.$.btnBack = document.querySelector("#btn-back");

    this.$$.allLinks = document.querySelectorAll("aside li span");
  }

  bindEventNextBtn(handler) {
    this.$.form.addEventListener("submit", handler);
  }

  bindEventBackBtn(handler) {
    this.$.btnBack.addEventListener("click", handler);
  }

  //render html comp
  stepZero(userCurrentInfo) {
    const { name, email, phone } = userCurrentInfo;
    this.$.form.innerHTML = `<caption>
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
  }

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
  }

  htmlForm2Comp(plans, stateToggMY) {
    const fre = stateToggMY === "month" ? "mo" : "yr";
    const exp = stateToggMY === "month" ? "" : "2 months free";

    let output = "";
    for (const prop in plans) {
      output += `
      <div>
        <input type="radio" name="subscription" id="${prop}" value="${
        plans[prop]
      }" hidden />
        <label class="radio-box" for="${prop}">
          <img src="./assets/images/icon-${prop}.svg" alt="" />
          <div>
            <span>${prop}</span>
            <p>$${plans[prop]}/${fre}</p>
            <p>${exp || ""}</p>
          </div>
        </label>
      </div>`;
    }

    return output;
  }

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
  }

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
  }

  htmlAddsOn(addsOn) {
    let outPut = "";
    addsOn.forEach((item) => {
      outPut += `
      <div>
        <div class="finishing-box">
          <span>${item.type}</span>
        </div>
        <p>$${item.value}/${item.exp}</p>
      </div>`;
    });
    return outPut;
  }

  stepOne(plans, stateToggMY) {
    // rendering html and all functionality
    this.$.form.innerHTML = this.htmlForm2(
      this.htmlForm2Comp(plans, stateToggMY)
    );
    this.$.btnBack.style.display = "block";
    // const checkRadioBtn = document.querySelectorAll(
    //   'input[name="subscription"]'
    // );
    // checkRadioBtn.forEach((input) => {
    //   if (input.id === userInfo.plan.type.id) {
    //     input.setAttribute("checked", "true");
    //   }
    // });
    this.$.btnNext.insertAdjacentElement("afterend", this.$.btnBack);
  }

  stepTwo(addOns) {
    this.$.form.innerHTML = this.htmlForm3(addOns);
    // const checkedInput = document.querySelectorAll('input[name="add-ons"]');
    // checkedInput.forEach((input) => {
    //   app.currentUserInfo.addOns.forEach((el) => {
    //     if (input.id === el.id) {
    //       input.setAttribute("checked", "true");
    //     }
    //   });
    // });
  }

  stepThree(props, currentAdds, total) {
    this.$.form.innerHTML = this.htmlForm4(props, currentAdds, total);
  }

  handlerToggleMy(plans, toggleMYSta, btnTgleMY) {
    const prevMYEl = btnTgleMY.previousElementSibling;
    const nextMYEl = btnTgleMY.nextElementSibling;

    if (toggleMYSta === "month") {
      this.addClass(nextMYEl);
    } else {
      this.addClass(prevMYEl);
    }

    const span = btnTgleMY.querySelector("span");
    span.classList.toggle("end-content");
    if (span.classList.contains("end-content")) {
      this.$.form.querySelector(".test").innerHTML = this.htmlForm2Comp(
        plans,
        toggleMYSta
      );
      prevMYEl.classList.add("gray");
      nextMYEl.classList.remove("gray");
    } else {
      this.$.form.querySelector(".test").innerHTML = this.htmlForm2Comp(
        plans,
        toggleMYSta
      );
      prevMYEl.classList.remove("gray");
      nextMYEl.classList.add("gray");
    }

    this.defaultRadioOpt();
  }

  //   Dom helper method
  addClass(adding) {
    adding.classList.add("gray");
  }

  defaultRadioOpt() {
    const checkRadioBtn = document.querySelectorAll(
      'input[name="subscription"]'
    );
    checkRadioBtn[0].setAttribute("checked", "true");
  }
  //   activateLink() {
  //     $$.allLinks.forEach((el) => {
  //       el.classList.remove("current-form");
  //     });
  //     $$.allLinks[state.activeLink].classList.add("current-form");
  //   }
}
