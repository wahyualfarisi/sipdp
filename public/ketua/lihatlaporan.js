(function() {
    "use strict"

    const lihatLaporanURL = (function() {
        const urlString = {
            getLaporan: `${BASE_URL}api/ex/Laporan`
        }
        return {
            getURL: () => urlString
        }
    })()


    const lihatLaporanUI = (function() {
        const domString = {
            html : {
                no_laporan: '.no_laporan',
                tgl_pembuatan: '.tgl_pembuatan',
                listSurat: '#show__list__surat__keputusan'
            },
            field: {

            }
        }

        const renderLaporan = data => {
            if(data.length > 0){
                data.forEach(item => {
                    $(domString.html.no_laporan).text(item.no_laporan)
                    $(domString.html.tgl_pembuatan).text(item.tgl_pembuatan)
                })
            }
        }

        const renderSurat = data => {
            let html = '', no = 1
            if(data.length > 0){
                data.forEach(item => {
                    console.log(item.detail_surat[0])
                    const { nomor_disposisi, lampiran, perihal, tgl_keputusan  } = item.detail_surat[0]
                    html += `
                        <tr class="spacer"> </tr>
                        <tr class="tr-shadow"> 
                            <td> ${no++} </td>
                            <td> ${item.no_surat_keputusan} </td>
                            <td> ${nomor_disposisi} </td>
                            <td> ${lampiran} </td>
                            <td> ${perihal} </td>
                            <td> ${tgl_keputusan} </td>
                            <td>  <a href="#/lihatsurat?id_surat=${item.no_surat_keputusan}" class="btn btn-info"> Lihat Surat </a> </td>
                        </tr>
                    `
                })
            }
            $(domString.html.listSurat).html(html)
        }

        return {
            getDOM: () => domString,
            retrieveLaporan: data => renderLaporan(data),
            retrieveSuratKeputusan: data => renderSurat(data)
        }
    })()


    const lihatLaporanCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){

            $('#btn-print-surat').on('click', function() {
                var mode = 'iframe';
                var close = mode == "popup";
                var options = {
                    mode: mode,
                    popClose: close
                }
                $('#area__surat').printArea(options)
            })

            // $('#btn-berbentuk-surat').on('click', function() {
            //     $('#surat-keputusan').css('display','none')

            // })

        }

        const load_laporan = () => getResource(url.getLaporan, undefined, res => {
            console.log(res)
            if(res.status === 200){
               const filterLaporan = res.data.filter(item => item.no_laporan === ID)
               UI.retrieveLaporan(filterLaporan)
               UI.retrieveSuratKeputusan(filterLaporan[0].laporan_detail)
            }
        }, err => console.log(err))


        return {
            init: () => {
                console.log('init ', ID)
                eventListener()
                load_laporan()
            }
        }
    })(lihatLaporanURL, lihatLaporanUI)


    lihatLaporanCTRL.init()

})()