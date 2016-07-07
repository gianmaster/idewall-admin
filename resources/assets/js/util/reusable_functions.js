export default {
    niceAlert(type, message){
        Lobibox.notify(type, {
            msg: message,
            sound: false
        });
    }
}
