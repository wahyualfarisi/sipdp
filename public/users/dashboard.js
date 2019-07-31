(function() {
    "use strict"

    const dashboardURL = (function() {
        const urlString = {
            getPengaduan: `${BASE_URL}api/ex/Pengaduan`,
            getKeputusan: `${BASE_URL}api/ex/Keputusan`
        }
        return {
            getURL: () => urlString
        }
    })()


    const dashboardUI = (function() {
        const domString = {
            html: {
                totalPengaduan: '#total_data_pengaduan',
                totalKeputusan: '#total_data_keputusan',
                listPengaduan: '#show__list__pengaduan__user'
            }
        }

        const renderPengaduan = (data) => {
            let html = ""
            data.forEach(element => {
                const { id_pengaduan, nama_perusahaan_pers, judul_berita, edisi_penerbitan, status_pengaduan } = element
                html += `
                    <tr class="spacer">
                    <tr class="tr-shadow">
                        <td> ${id_pengaduan} </td>
                        <td> ${nama_perusahaan_pers} </td>
                        <td> ${judul_berita} </td>
                        <td> ${edisi_penerbitan} </td>
                        <td> ${status_pengaduan} </td>
                    </tr>
                `
            });

            $(domString.html.listPengaduan).html(html)
        } 

        const renderDataEmpty = () => {}

        return {
            getDOM: () => domString,
            retrievePengaduan: data => renderPengaduan(data),
            retrieveDataEmpty: () => renderDataEmpty()
        }
    })()


    const dashboardCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){


        }

        const load_keputusan = () => getResource(url.getKeputusan, undefined, res => {
            $(dom.html.totalKeputusan).text(res.data.length)
        }, err => console.log(data) )

        const load_pengaduan = () => getResource(url.getPengaduan, undefined, res => {
            if(res.status === 200){
                $(dom.html.totalPengaduan).text(res.jumlah)
                const filterData = res.data.filter(item => item.status_pengaduan !== 'selesai')
                filterData.length > 0 ? UI.retrievePengaduan(filterData) : UI.retrieveDataEmpty()
            }
            
        }, err => console.log(err) )

        return {
            init: () => {
                console.log('init ')
                eventListener()
                load_keputusan()
                load_pengaduan()
            }
        }
    })(dashboardURL, dashboardUI)

    dashboardCTRL.init()

})()