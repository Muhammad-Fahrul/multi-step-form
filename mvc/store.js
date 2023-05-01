const initialValue = {
  currentForm: [],
  toggleMYSta: "month",
  planSelecOpt: [
    {
      arcade: "9",
      advanced: "12",
      pro: "15",
    },
    {
      arcade: "90",
      advanced: "120",
      pro: "150",
    },
  ],
  addOns: {
    monthly: {
      onlineService: {
        type: "online service",
        value: 1,
        feat: "Acces to multiplayer games",
        exp: "mo",
      },
      largerStorage: {
        type: "local storage",
        value: 2,
        feat: "Acces to multiplayer games",
        exp: "mo",
      },
      customizableProfile: {
        type: "customizable profile",
        value: 2,
        feat: "Acces to multiplayer games",
        exp: "mo",
      },
    },
    yearly: {
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
};

export default class Store {
  #state = initialValue;
  constructor(userInfo) {
    this.userInfo = userInfo;
  }

  get datas() {
    const stateClone = structuredClone(this.#getState());

    const stateForm = stateClone.currentForm.length;
    const stateToggMY = stateClone.toggleMYSta === "month" ? "month" : "year";
    const plans =
      stateClone.planSelecOpt[stateClone.toggleMYSta === "month" ? 0 : 1];
    const form = stateClone.currentForm;
    const addOns =
      stateToggMY === "month"
        ? stateClone.addOns.monthly
        : stateClone.addOns.yearly;
    const currPlan = form[1]
      ? {
          type: form[1].userPlan,
          value: plans[form[1].userPlan],
        }
      : null;
    return {
      plans,
      stateForm,
      stateToggMY,
      form,
      addOns,
      currPlan,
    };
  }

  updateToggle(stateToggMY) {
    const stateClone = structuredClone(this.#getState());
    stateClone.toggleMYSta = stateToggMY === "month" ? "year" : "month";
    this.#saveState(stateClone);
  }

  updateBackState() {
    const stateClone = structuredClone(this.#getState());
    stateClone.currentForm.pop();

    this.#saveState(stateClone);
  }

  form1(name, email, phone) {
    const stateClone = structuredClone(this.#getState());
    stateClone.currentForm[0] = {
      name,
      email,
      phone,
    };

    this.#saveState(stateClone);
  }

  form2(userPlan) {
    const stateClone = structuredClone(this.#getState());
    stateClone.currentForm[1] = {
      userPlan,
    };

    this.#saveState(stateClone);
  }

  form3(userAddOns) {
    const stateClone = structuredClone(this.#getState());
    stateClone.currentForm[2] = userAddOns;

    this.#saveState(stateClone);
  }

  #getState() {
    return this.#state;
  }

  #saveState(stateOrFun) {
    const prevState = this.#getState();
    let newState;
    switch (typeof stateOrFun) {
      case "function":
        newState = stateOrFun(prevState);
        break;
      case "object":
        newState = stateOrFun;
        break;
      default:
        throw new Error("Invalid argument");
    }

    this.#state = newState;
  }
}
