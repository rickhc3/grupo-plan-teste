const state = {
  items: [],
  brands: ["Electrolux", "Brastemp", "Fischer", "Samsung", "LG"],
};

const getters = {
  getItems: (state) => state.items,
  getBrands: (state) => state.brands,
};

const mutations = {
  setItems: (state, items) => {
    state.items = items;
  },
};

const actions = {

};

export default {
  state,
  getters,
  mutations,
  actions,
};
