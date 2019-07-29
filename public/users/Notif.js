(function() {
    "use strict"

    const notifURL = (function() {
        const urlString = {
            getNotif: `${BASE_URL}api/ex/Pengaduan/showNotifPengaduan`
        }
        return {
            getURL: () => urlString
        }
    })()


    const notifUI = (function() {
        const domString = {
            html : {
                notif: '#linkpengaduan'
            }
        }


        const renderNotif = data => {
            console.log(data)
            if(data.jumlah > 0){
                $(domString.html.notif).append(`<span class="inbox-num">${data.jumlah}</span>`)
            }

        }


        return {
            getDOM: () => domString,
            retriveNotif: data => renderNotif(data)
        }
    })()


    const notifCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){


        }

        const load_notification = () => getResource(url.getNotif, undefined, res => {
            if(res.status === 200){
                UI.retriveNotif(res)
            }
        }, error => console.log(error))


        return {
            init: () => {
                console.log('init notif ')
                load_notification()
            }
        }
    })(notifURL, notifUI)

    notifCTRL.init()


})()