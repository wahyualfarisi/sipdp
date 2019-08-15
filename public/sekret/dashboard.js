(function() {
    "use strict"

    const dashboardURL = (function() {
        const urlString = {
            getPengaduan: `${BASE_URL}api/int/Pengaduan`,
            getKeputusan: `${BASE_URL}api/int/Keputusan`,
            getPengadu: `${BASE_URL}api/Pengadu`,
            getLaporan: `${BASE_URL}api/ex/Laporan`
        }
        return {
            getURL: () => urlString
        }
    })()


    const dashboardUI = (function() {
        const domString = {

        }

        return {
            getDOM: () => domString
        }
    })()


    const dashboardCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){


        }

        const load_pengadu = () => getResource(url.getPengadu, undefined, res => {
            if(res.status === 200){
                $('.total_pengadu').text(res.data.length)
            }
        }, err => console.log(err))

        const load_keputusan = () => getResource(url.getKeputusan, undefined, res => {
            if(res.status === 200){
                $('#total_keputusan').text(res.data.length)
            }
        }, err => console.log(err))

        const load_laporan = () => getResource(url.getLaporan, undefined, res => {
            if(res.status === 200){
                $('.total_datalaporan').text(res.data.length)
            }
        }, err => console.log(err))

        const load_pengaduan = () => getResource(url.getPengaduan, undefined, res => {
            if(res.status === 200){
                $('.total_pengaduan').text(res.data.length)
            }

        }, err => console.log(err))

        return {
            init: () => {
                console.log('init ')
                load_pengadu()
                load_keputusan()
                load_laporan()
                load_pengaduan()
                eventListener()
            }
        }
    })(dashboardURL, dashboardUI)

    dashboardCTRL.init()


})()