 const  getCurrentTime=_=>{
  const date=new Date();
  const year=date.getFullYear();
  const month=formateNumber(date.getMonth()+1);
  const day=formateNumber(date.getDate());
  const hours=formateNumber(date.getHours());
  const minutes=formateNumber(date.getMinutes());
  const seconds=formateNumber(date.getSeconds());
  // console.log('date',year,month,day,hours,minutes,seconds);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const formateNumber=number=>{
  return number>=10?number:'0'+number;
}

const getTimestamp=_=>{
  return new Date().getTime();
}

export {
  getCurrentTime,
  getTimestamp,
}

const abc =new Object({o:'123'})

export default abc