import {Router} from "@angular/router";
export const roleMatrix:any={};



/**  search a value in a list
* 
* @param value : object to be searched,
* @param original List : List to search in
* @param property : Nested property to search by if any
*
*/
export function alreadyExist(value:any,originalList: any[], property: string){
    for (let item of originalList) {
      if ((typeof item[property] != "object" && item[property] === value)
          || (typeof item[property] == "object" && JSON.stringify(item[property]) === JSON.stringify(value))) {
          return item;
      }
  }
  return null;
  }
