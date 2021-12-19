
export const compare2Arrays= (ar1,ar2)=>{
  if((typeof ar1) != (typeof ar2)){
    return 0 
  }
  if(ar1.length > ar2.length){
    return -1
  }
  if(ar1.length < ar2.length){
    return -2
  }
  let result = false
  ar1.every(function(el){
    result = ar2.includes(el)
  })
  if(result){
   return 2
  } else {return -100}
}


export const deleteElArFromeElAr=(elAr, targetAr)=> {
  try{
  elAr.forEach(element=> {
    const index = targetAr.indexOf(element);
    if (index > -1) {
     targetAr.splice(index, 1);
    }
 })}catch(error){
   console.log(error)
   throw("wrong Format of Array")
 }
 return targetAr
}


export const deepCopy=(obj)=>{
  return JSON.parse(JSON.stringify(obj))
}
//wrapper around lodash function//
export const  isReallyEmpty = (obj) => {
   return isEmpty(obj)
}

