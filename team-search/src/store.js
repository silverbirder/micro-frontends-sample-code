import Vuex from 'vuex'
import Vue from 'vue'
import {MessageBus} from '@podium/browser';

Vue.use(Vuex);

const state = {
    keyword: '',
    productItems: [],
};
const messageBus = new MessageBus();

const actions = {
    setKeyword(context, payload) {
        context.commit('setKeyword', payload.keyword);
    },
    searchKeyword(context, payload) {
        const mockData = [{id: 1, name: 'apple'}, {id: 2, name: 'banana'}, {id: 3, name: 'orange'}];
        const hitItems = mockData.filter((data) => {
            return data.name.match(new RegExp(payload.keyword)) !== null;
        });
        if (process.browser) {
            messageBus.publish('search', 'search.word', {
                items: hitItems
            });
        }
        context.commit('setProductItems', hitItems);
    },
};

const getters = {};

const mutations = {
    setKeyword(state, keyword) {
        state.keyword = keyword;
    },
    setProductItems(state, items) {
        state.productItems = items;
    }
};

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})