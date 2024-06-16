/** @format */

import { createReduxStore, register } from "@wordpress/data";

export const PPT_STORE = "ppt/store";

const INITIAL_STATE = {
    isFullscreen: false,
};

const store = createReduxStore(PPT_STORE, {
    actions: {
        setIsFullscreen(isFullscreen) {
            return {
                type: "SET_IS_FULLSCREEN",
                isFullscreen,
            };
        },
    },

    reducer(state = INITIAL_STATE, action) {
        switch (action.type) {
            case "SET_IS_FULLSCREEN":
                return {
                    ...state,
                    isFullscreen: action.isFullscreen,
                };
            default:
                return state;
        }
    },

    selectors: {
        isFullscreen(state) {
            return state.isFullscreen;
        },
    },
});

register(store);
