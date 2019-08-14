(function() {
    "use strict"

    const LaporanURL = (function() {
        const urlString = {
            getLaporan: `${BASE_URL}api/ex/Laporan`
        }
        return {
            getURL: () => urlString
        }
    })()


    const LaporanUI = (function() {
        const domString = {
            html : {
                listLaporan: '#show__list__laporan'
            },
            modal: {
                buatLaporan: '#ModalBuatLaporan'
            },
            btn: {
                buatLaporan: '.btn_buat_laporan'
            }
        }

        const renderLaporan = data => {
            console.log(data)
            let html = '', no = 1;
            if(data.length > 0){
                data.forEach(item => {
                    html += `
                        <tr class="spacer"></tr>
                        <tr class="tr-shadow">
                            <td> ${no++} </td>
                            <td> ${item.no_laporan} </td>
                            <td> ${item.tgl_pembuatan} </td>
                            <td> ${item.laporan_detail.length} Surat </td>
                            <td> 
                                <a class="btn btn-info" href="#/lihatlaporan?id_laporan=${item.no_laporan}" > Lihat Laporan </a>
                            </td>
                        </tr>
                    `;
                })
            }
            $(domString.html.listLaporan).html(html)
        }

        return {
            getDOM: () => domString,
            retrieveLaporan: data => renderLaporan(data)
        }
    })()


    const LaporanCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){

            $(dom.btn.buatLaporan).on('click', () => ModalAction(dom.modal.buatLaporan, 'show') )

        }

        const load_detail_laporan = () => getResource(url.getLaporan, undefined, res => {
            if(res.status === 200) {
                UI.retrieveLaporan(res.data)
            }
        }, err => console.log(err) );


        return {
            init: () => {
                console.log('init ')
                eventListener()
                load_detail_laporan()
            }
        }
    })(LaporanURL, LaporanUI)

    LaporanCTRL.init()


})()