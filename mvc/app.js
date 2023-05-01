import View from "./view.js";
import Store from "./store.js";

const userInfo = {
  id: crypto.randomUUID(),
  name: "",
  email: "",
  phone: "",
  plan: "",
  planMoYr: "month",
  addOns: [],
};

function init() {
  const view = new View();
  const store = new Store(userInfo);

  view.bindEventNextBtn((event) => {
    event.preventDefault();
    const { stateForm, plans, stateToggMY, addOns, currPlan } = store.datas;
    console.log(stateForm);
    if (stateForm === 4) {
      console.log("berakhir");
      return;
    }

    switch (stateForm) {
      case 0:
        const name = document.querySelector('input[name="name"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const phone = document.querySelector('input[name="phone"]').value;
        store.form1(name, email, phone);
        view.stepOne(plans, stateToggMY);
        const btnToggle = document.querySelector(".toggle-mon-yr div");
        btnToggle.addEventListener("click", (e) => {
          const { plans, stateToggMY } = store.datas;
          const newTgState = store.updateToggle(stateToggMY);
          view.handlerToggleMy(plans, newTgState, btnToggle);
          store.updateToggle(stateToggMY);
        });
        view.defaultRadioOpt();
        break;
      case 1:
        const userPlan = document.querySelector(
          'input[name="subscription"]:checked'
        ).id;
        store.form2(userPlan);
        view.stepTwo(addOns);
        break;
      case 2:
        const userAddOns =
          [...document.querySelectorAll('input[name="add-ons"]:checked')] || [];

        const addsData = [];
        userAddOns.forEach((item) => {
          for (const p in addOns) {
            if (item.id.toLowerCase() === addOns[p].type)
              addsData.push(addOns[p]);
          }
        });

        const currentAdds = view.htmlAddsOn(addsData);

        const props = {
          type: currPlan.type,
          fee: currPlan.value,
          fre: stateToggMY === "month" ? "mo" : "yr",
          freq: stateToggMY === "month" ? "monthly" : "yearly",
        };

        const total =
          addsData
            .map((item) => {
              return item.value;
            })
            .reduce((total, num) => {
              return +total + +num;
            }, 0) + +props.fee;

        view.stepThree(props, currentAdds, total);
        store.form3(addsData);
        break;
      case 3:
        console.log("state 4");
        break;
    }
  });

  view.bindEventBackBtn((event) => {
    const { stateForm, form } = store.datas;

    switch (stateForm) {
      case 1:
        view.stepZero(form[0]);
        store.updateBackState();
        break;
      case 2:
        console.log("kembali ke 2");
        break;
    }
  });
}

window.addEventListener("load", init);
