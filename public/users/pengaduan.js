(function() {
    "use strict"

    const pengaduanURL = (function() {
        const urlString = {
            getPengaduan: `${BASE_URL}api/ex/Pengaduan`
        }
        return {
            getURL: () => urlString
        }
    })()


    const pengaduanUI = (function() {
        const domString = {
            html: {
                listPengaduan: '#show__list__pengaduan__user'
            },
            field: {
                searchPengaduan: '#search_pengaduan'
            }
        }

        const renderPengaduan = data => {
            let html = '', labelDilihat;
            if(data.length > 0)
            {
                data.forEach(item => {
                    if(item.dilihat === 'belum'){
                        labelDilihat = `<span class="badge badge-danger">Baru</span> `
                    }else{
                        labelDilihat = ``;
                    }
                    html += `
                        <tr class="spacer"></tr>
                        <tr class="tr-shadow">
                            <td>${item.id_pengaduan} ${labelDilihat} </td>
                            <td>${item.nama_perusahaan_pers} </td>
                            <td>${item.judul_berita} </td>
                            <td>${item.edisi_penerbitan} </td>
                            <td>${item.status_pengaduan} </td>
                            <td>
                                <div class="table-data-feature">
                                    <a href="#/overviewpengaduan/?id_secret=${item.id_pengaduan}" class="item btn__edit" 
                                        data-toggle="tooltip" data-placement="top" title="Lihat Pengaduan">
                                        <i class="zmdi zmdi-mail-send"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    `
                })
            }
            $(domString.html.listPengaduan).html(html)
        }

        return {
            getDOM: () => domString,
            retrievePengaduan: data => renderPengaduan(data)
        }
    })()


    const pengaduanCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){

            $(dom.field.searchPengaduan).on('keyup', function() {
                if($(this).val() !== ""){
                    getResource(url.getPengaduan, $(this).val() , res => {
                        console.log(res)
                        if(res.status === 200){
                            UI.retrievePengaduan(res.data)
                        }
                    }, error => console.log(error))
                }else{
                    load_pengaduan()
                }
            })

        }

        const load_pengaduan = () => getResource(url.getPengaduan, undefined , res => {
            console.log(res)
            if(res.status === 200){
                UI.retrievePengaduan(res.data)
            }
        }, error => console.log(error))


        return {
            init: () => {
                console.log('init ')
                eventListener()
                load_pengaduan()
            }
        }
    })(pengaduanURL, pengaduanUI)

    pengaduanCTRL.init()

})()