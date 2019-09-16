const fetch = require('node-fetch'); 
const notificacionPush = (tokenPhone, title, body)=>{
    console.log({tokenPhone, title, body})
    fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAArRDmeUk:APA91bH_mCLjDWXVF7PyXmEDzjOj0ehcu9xC0_squ_JMHu9-q8pUToPmTQrHSO7CY_e07eTeh3BxD5MWI8uh3jNfPCFk9C25VgLI2bnkj_v9nZbu0G_W1jYZbIATDC2OZBkQLSbydSNJ'
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
  
  
 