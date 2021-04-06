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

export default useMyForm