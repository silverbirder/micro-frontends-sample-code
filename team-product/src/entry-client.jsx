import React from 'react';
import {hydrate} from 'react-dom';
import Items from "./components/Items"
import {MessageBus} from '@podium/browser';

const messageBus = new MessageBus();

messageBus.subscribe('search', 'search.word', event => {
    hydrate(<Items {...{items: event.payload.items}} />, document.querySelector('#team-product-items'));
});