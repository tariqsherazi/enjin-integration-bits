
export const timeToTimeStamp = (time) =>{
    
    const str = (time).toString();

    const [dateComponents, timeComponents] = str.split(' ');
    console.log(dateComponents);
    console.log(timeComponents);
    const [year, month, day] = dateComponents.split('-');
    const [hours, minutes, seconds] = timeComponents.split(':');

    const date = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);
    console.log(date); // 👉️ Sat Apr 16 2022 06:45:12

    // ✅ Get timestamp
    const timestamp = date.getTime();
    console.log(timestamp); // 👉️ 1650080712000
    return timestamp/1000;
}

export const timestampToDate = (timestamp)=>{
    const dateFormat= new Date(timestamp);
    const fulldate =(dateFormat.getMonth()+1)+
    "/"+dateFormat.getDate()+
    "/"+dateFormat.getFullYear()
    console.log(fulldate);
    return fulldate;
}