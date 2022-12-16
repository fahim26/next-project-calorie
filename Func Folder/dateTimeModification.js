export function show_time(){
    let today = new Date();
    console.log("today ---------------------- ",today);
    let day = today.getDate();
    let dayList = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    // let date = today.getDate().toLocaleString('en-us',{minimumIntegerDigits: 2,useGrouping:false});
    // let month = today.getMonth().toLocaleString('en-us',{minimumIntegerDigits: 2,useGrouping:false});
    // let year = today.getFullYear();


    let date = today.getDate().toLocaleString();
    let month = today.getMonth()+1;
    let year = today.getFullYear();

    let hour = today.getHours();
    let minute = today.getMinutes().toLocaleString('en-us',{minimumIntegerDigits: 2,useGrouping:false});
    let second = today.getSeconds().toLocaleString('en-us',{minimumIntegerDigits: 2,useGrouping:false});
    // console.log("dayc---------------------------: ",day);
    let dec = hour >= 12 ? "PM" : "AM";
    if(hour  === 0 && dec === "PM"){
        if(minute === 0 && second === 0){
            hour = 12;
            dec= "NOON";
        }
        else{
            hour = 12;
            dec = "PM";
        }
    }
    if(hour  === 0 && dec === "AM"){
        if(minute === 0 && second === 0){
            hour = 12;
            dec= "Midnight";
        }
        else{
            hour = 12;
            dec = "AM";
        }
    }
    
    let hh = hour >= 12 ? (hour-12) : hour;
    console.log(" __________ TIME DESCRIPTION : ",year,month,date,hh)
    // let mm = minute < 10 ? (minute-12) : minute;
    // "2017-05-24T10:30"
    return year + "-" + month + "-" + date +  "T"  + hh.toLocaleString('en-us',{minimumIntegerDigits: 2,useGrouping:false}) + ":"+ minute;



}