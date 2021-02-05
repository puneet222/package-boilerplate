// @description Add further options in component

import { InnerComponentOptions } from "../../utils/interfaces";

/**
 * this file is going to add some inner components and tasks of outer
 * component and most the inner component we get is from HTTP calls
 */

const returnOptions = () => {
    /**
     * Most of the time, data will come from third-party APIs
     */
    let innerComponents: InnerComponentOptions[] = [
        {
            name: "comp 1",
            description: "inner component"
        },
        {
            name: "comp 2",
            description: "inner component"
        }
    ];

    return JSON.stringify({
        add: innerComponents.map((comp: InnerComponentOptions) => {
            return {
                name: comp.name,
                description: comp.description
            }
        })
    });
}

export default returnOptions;