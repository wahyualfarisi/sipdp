(function() {
    "use strict"

    const keputusanURL = (function() {
        const urlString = {
            getKeputusan: `${BASE_URL}api/ex/Keputusan`
        }
        return {
            getURL: () => urlString
        }
    })()


    const keputusanUI = (function() {
        const domString = {
            html: {
                listKep: '#show__list__keputusan'
            }
        }

        const renderListPengaduan = data => {
            let html = '', no = 1
            if(data.length > 0)
            {
                data.forEach(item => {
                    console.log(item)
                    const { no_surat_keputusan, perihal, id_pengaduan, judul_berita, nama_perusahaan_pers, status_pengaduan } = item
                    html += `
                        <tr class="spacer"></tr>
                        <tr class="tr-shadow">
                            <td>${no++} </td>
                            <td>${no_surat_keputusan} </td>
                            <td>${perihal} </td>
                            <td>${id_pengaduan} </td>
                            <td>${judul_berita} </td>
                            <td>${nama_perusahaan_pers} </td>
                            <td>${status_pengaduan} </td>
                            <td> 
                                <a href="#/suratkeputusan?id_surat=${no_surat_keputusan}" class="btn btn-info"> Lihat Keputusan </a>
                            </td>

                        </tr>
                    `
                })
            }

            $(domString.html.listKep).html(html)
        }

        return {
            getDOM: () => domString,
            retrieveListPengaduan: data => renderListPengaduan(data) 
        }
    })()


    const keputusanCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){


        }

        const load_keputusan = () => getResource(url.getKeputusan, undefined, res => {
            if(res.status === 200){
                UI.retrieveListPengaduan(res.data)
            }
        }, err => console.log(err ) )


        return {
            init: () => {
                window.scrollTo(500,250)
                load_keputusan()
                eventListener()
            }
        }
    })(keputusanURL, keputusanUI)

    keputusanCTRL.init()


})()