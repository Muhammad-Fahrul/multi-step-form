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
    const { stateForm, plans, stateToggMY, addOns, dataBackUp, currPlan } =
      store.datas;
    if (stateForm === 4) {
      console.log("berakhir");
      return;
    }
    view.activateLink(stateForm + 1);
    store.updateNextState();
    switch (stateForm) {
      case 0:
        const name = document.querySelector('input[name="name"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const phone = document.querySelector('input[name="phone"]').value;
        store.backUpForm1(name, email, phone);
        view.stepOne(plans, stateToggMY);

        view.checkRadioBtn(dataBackUp);
        const btnToggle = document.querySelector(".toggle-mon-yr div");
        btnToggle.addEventListener("click", (e) => {
          store.updateToggle(store.datas.stateToggMY);
          view.handlerToggleMy(
            store.datas.plans,
            store.datas.stateToggMY,
            btnToggle
          );
          view.checkRadioBtn(dataBackUp);
        });
        break;
      case 1:
        const userPlan = document.querySelector(
          'input[name="subscription"]:checked'
        ).id;
        store.backUpForm2(userPlan);
        view.stepTwo(addOns);
        const checkedInput = document.querySelectorAll('input[name="add-ons"]');
        checkedInput.forEach((input) => {
          dataBackUp[2].forEach((el) => {
            if (input.id.toLowerCase() === el.type.toLowerCase()) {
              input.setAttribute("checked", "true");
            }
          });
        });
        break;
      case 2:
        const userAddOns =
          [...document.querySelectorAll('input[name="add-ons"]:checked')] || [];

        const addsData = [];
        userAddOns.forEach((item) => {
          for (const p in addOns) {
            if (item.id.toLowerCase() === addOns[p].type.toLowerCase())
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

        store.backUpForm3(addsData);
        view.stepThree(props, currentAdds, total);
        break;
      case 3:
        const recap = {
          user: dataBackUp[0],
          userPlan: dataBackUp[1],
          userAdds: dataBackUp[2],
        };
        store.backUpForm4(recap);
        view.stepFour();
        break;
    }
  });

  view.bindEventBackBtn((event) => {
    const { stateForm, plans, stateToggMY, addOns, dataBackUp } = store.datas;
    if (stateForm === 0) {
      return;
    }
    view.activateLink(stateForm - 1);
    store.updateBackState();
    switch (stateForm) {
      case 1:
        const userPlan = document.querySelector(
          'input[name="subscription"]:checked'
        ).id;
        store.backUpForm2(userPlan);
        view.stepZero(dataBackUp[0]);
        event.target.remove();
        break;
      case 2:
        const userAddOns =
          [...document.querySelectorAll('input[name="add-ons"]:checked')] || [];
        const addsData = [];
        userAddOns.forEach((item) => {
          for (const p in addOns) {
            if (item.id.toLowerCase() === addOns[p].type.toLowerCase())
              addsData.push(addOns[p]);
          }
        });
        store.backUpForm3(addsData);
        view.stepOne(plans, stateToggMY);
        const checkRadioBtn = document.querySelectorAll(
          'input[name="subscription"]'
        );
        checkRadioBtn.forEach((input) => {
          if (input.id === dataBackUp[1].userPlan.toLowerCase()) {
            input.setAttribute("checked", "true");
          }
        });
        const btnToggle = document.querySelector(".toggle-mon-yr div");
        btnToggle.addEventListener("click", (e) => {
          store.updateToggle(store.datas.stateToggMY);
          view.handlerToggleMy(
            store.datas.plans,
            store.datas.stateToggMY,
            btnToggle
          );
        });
        break;
      case 3:
        view.stepTwo(addOns);
        document.querySelector("#btn-form").textContent = "Next step";

        const checkedInput = document.querySelectorAll('input[name="add-ons"]');
        checkedInput.forEach((input) => {
          dataBackUp[2].forEach((el) => {
            if (input.id.toLowerCase() === el.type.toLowerCase()) {
              input.setAttribute("checked", "true");
            }
          });
        });
        break;
    }
  });
}

window.addEventListener("load", init);
