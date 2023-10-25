export * from './constants'
// import { API_URLS,LOCALSTORAGE_TOKEN_KEY } from "./constants";
// export {
//   API_URLS,
//   LOCALSTORAGE_TOKEN_KEY
// }

export const getFormBody = (params) =>{
  let formBody = [];
  for(let property in params){
    let encodedKey = encodeURIComponent(property);
    let encodedVlaue = encodeURIComponent(params[property]);
    formBody.push(encodedKey+'='+encodedVlaue);
  }
  return formBody.join('&');
};
export const setItemInLocalStorage = (key,value) =>{
  if(!key || !value){
    return console.error('Can not store in LS');
  }
  const  valueToStore = typeof(value)!='string'? JSON.stringify(value):value;
  localStorage.setItem(key,valueToStore);
};
export const getItemFromLocalStorage =  (key) =>{
  if(!key){
    return console.error('Can get the value from LS ');
  }
  return localStorage.getItem(key);
}
export const removeItemFromLocalStorage = (key)=>{
  if(!key){
    return console.error('Can get the value from LS');
  }
  localStorage.removeItem(key);
}