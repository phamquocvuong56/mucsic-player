const GetConfig=(storageKey)=>{
    return JSON.parse(localStorage.getItem(storageKey))
}
const SetConfig = (storageKey, key, value) => {
  const config = GetConfig(storageKey);
  config[key] = value;
  localStorage.setItem(storageKey, JSON.stringify(config));
};
export {SetConfig, GetConfig};
