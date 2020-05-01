import React from 'react';
import Items from "./components/Items";

const SSR = (props) => {
    return (
        <div id="team-product">
            <div id="team-product-items">
                <Items {...{items: props.items}} />
            </div>
        </div>
    )
};

export default SSR;