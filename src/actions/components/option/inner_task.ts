// @description Perform an action of individual inner component

import { InnerComponentOptions } from "../../../utils/interfaces";

/**
 * In options.folder_name (where folder_name is the parent folder name)
 * So in this case, it would be options.components
 * This object will have the data of individual inner component that we
 * select, we can use that data to perform other actions here like:
 * 
 * - to add another get_options.ts and add components from inner component data
 * - execute a special task on inner component
 */

 if(options.components) {
     const {name: compName, description: compDesc} = options.components as InnerComponentOptions;

     notify(compName, 'success', 3000);
 }