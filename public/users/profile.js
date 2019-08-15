(function() {
    "use strict"

    const profileURL = (function() {
        const urlString = {

        }
        return {
            getURL: () => urlString
        }
    })()


    const profileUI = (function() {
        const domString = {

        }

        return {
            getDOM: () => domString
        }
    })()


    const profileCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){


        }

        const load_user = () => {
            let status = ''
            const data = JSON.parse(localStorage.getItem('profile') );
            const dataprofile = data.msg.payload[0]
            console.log(dataprofile)
            if(dataprofile.status === 'true'){
                status = 'Aktif'
            }else{
                status = 'Tidak Aktif'
            }
            $('.email').val(dataprofile.email)
            $('.tgl_terdaftar').val(dataprofile.tgl_terdaftar)
            $('.alamat').val(dataprofile.alamat)
            $('.nama_lengkap').val(`${dataprofile.nama_depan} ${dataprofile.nama_belakang} `)
            $('.status').val(status)
        }

        return {
            init: () => {
                console.log('init ')
                eventListener()
                load_user()
            }
        }
    })(profileURL, profileUI)

    profileCTRL.init()


})()