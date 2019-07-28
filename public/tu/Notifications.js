(function() {
    "use strict"

    const notificationsURL = (function() {
        const urlString = {
            getNotif: `${BASE_URL}api/int/Pengaduan/getNotif`
        }
        return {
            getURL: () => urlString
        }
    })()


    const notificationUI = (function() {
        const domString = {
            html: {
                panelNotification: '#panel-notification',
                titleNotif: '.notifi__title',
                contentNotif: '.content'
            }
        }

        const renderNotification = res => {
            let html = ''
            console.log(res);
            if(res.data.length > 0){
                $(domString.html.panelNotification).addClass('has-noti')
                $(domString.html.titleNotif).html(`<p> Anda Mempunya ${res.jumlah} Pengaduan Baru </p>`)
                res.data.forEach(item => {
                    
                    html += `

                        <p> <a href="#/pengaduanbaru/?number_secret=${item.id_pengaduan} "> Dari ${item.email} </a> </p>
                        <span class="date">April 12, 2018 06:50</span>
                    `;
                })
            }else{
                
                $(domString.html.titleNotif).html(`<p>Tidak ada data pengaduan baru </p>`)
            }
            $(domString.html.contentNotif).html(html);
        }



        return {
            getDOM: () => domString,
            retirevePanel: data => renderNotification(data)
        }
    })()


    const notificationCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){

        }

        const load_new_pengaduan = () => getResource(url.getNotif, undefined, res => {
            res.status === 200 ? UI.retirevePanel(res) : false
        }, error => console.log(error) );


        return {
            init: () => {
                console.log('init ')
                load_new_pengaduan()
            }
        }
    })(notificationsURL, notificationUI)

    notificationCTRL.init()

})()