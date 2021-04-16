export const verifyLink = (link)=>{
  if(!link){
    return false;
  }
  if(link.substr(0,7) !== "http://" ){
    if(link.substr(0,8) !== "https://"){
      return false
    }
  }
  return true;
};

const useMyForm = (...props)=>{
  const total = props.map((item)=>{
    if(typeof(item) === "string"){
      if(item.length <4 ){
        return false
      }
    }
    if(typeof(item) === "object" ){
      if(!item){
        return false
      }
    }
    if(!item || item === undefined || item === null){
      return false;
    }
  })
  const totalAux = total.filter((filtered)=>filtered === false);
  
  if(totalAux.length === 0){
    return true;
  }else{
    return false;
  }
}

export const validateForm = (fields) => {
  const errors = {};

  for(const field of fields) {

    let name = "";
    let value = "";

    if(field['name'] && field['value']) {
      name = field['name'].toString();
      value = field['value'].toString();
    } else {
      name = Object.keys(field)[0];
      value = field[name];
    }

    const validations = field['validate'];
    
    let error = "";
    for(const validation of Object.keys(validations)) {
      if(validation === 'required'){
        if(validations[validation]) {
          if(!value.length) {
            error = name+" está vázio";
            break;
          }
        }
      } else if(validation === 'max') {
        if(value.length > parseInt(validations[validation])) {
          error = name+" é maior que "+parseInt(validations[validation]);
          break;
        }
      } else if(validation === 'min') {
        if(value.length < parseInt(validations[validation])) {
          error = name+" é menor que "+parseInt(validations[validation]);
          break;
        }
      }
    }
    
    if(error) {
      errors[name] = error;
    }
  }

  if(errors.length === 0) {
    return null;
  } else {
    return errors;  
  }
}

export default useMyForm