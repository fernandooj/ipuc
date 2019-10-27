const fetch = require('node-fetch'); 
const notificacionPush = (tokenPhone, title, body)=>{
    console.log({tokenPhone, title, body})
    fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAAEu-yzGE:APA91bFZwc0NuPvh8pzMcoMTQ4uLTI48MUCxmFyZBPRDgCHC33j_5v_M_LH-uM79BNyoKm4GW77KPfyRqJqkY2dZ7hOFppnMd6S3VYq_rcYDnGw-ZrOXuBqUdnk8foo6jrkrOqobOw1c'
        },
        body: JSON.stringify({
            "to":tokenPhone,
            notification:{
                "title": title,
                "show_in_foreground": false,
                "body": body,
                "color":"#00ACD4",
                "priority":"high",
                "icon":"ic_notif",
                "group": "GROUP",
                "sound": "default",
                "id": "id",
            },
            "data": {
                group: "GROUP",
            }
        })
    })
    .then(res => res.json())
    .then(json => console.log(json));
}

module.exports = notificacionPush
  
  
 