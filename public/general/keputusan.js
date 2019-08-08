(function() {
    "use strict"

    const keputusanURL = (function() {
        const urlString = {
            getKeputusan: `${BASE_URL}api/int/Keputusan`
        }
        return {
            getURL: () => urlString
        }
    })()


    const keputusanUI = (function() {
        const domString = {
            html: {
                listKeputusan: '#show__list__keputusan',
                searchKeputusan: '#search_keputusan'
            },
            btn: {
                byDate: '.btn_by_date'
            },
            modal: {
                cari: '#ModalCari'
            },
            form: {
                cariPertanggal: '#form-date'
            }
        }

        const renderKeputusan = data => {
            let html = '', no = 1
            if(data.length > 0){
                data.forEach(item => {
                    html += `
                        <tr class="spacer"> </tr>
                        <tr class="tr-shadow">
                            <td> ${no++} </td>
                            <td> ${item.no_surat_keputusan} </td>
                            <td> ${item.id_pengaduan} </td>
                            <td> ${item.tgl_keputusan} </td>
                            <td> ${item.nama_lengkap} </td>
                            <td> ${item.judul_berita} </td>
                            <td> ${item.nama_perusahaan_pers} </td>
                            <td>        
                            <div class="">
                                <a href="#/keputusan?id=${item.no_surat_keputusan}" class="item btn btn-info btn__edit">
                                    Detail
                                </a>
                            </div>
                            </td>   
                        </tr>
                    `;
                })
            }

            $(domString.html.listKeputusan).html(html)
        }

        return {
            getDOM: () => domString,
            retrieveKeputusan: data => renderKeputusan(data),
           
        }
    })()


    const keputusanCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){

            $(dom.html.searchKeputusan).on('keyup', function() {
                if($(this).val() !== ''){
                    return load_keputusan($(this).val())
                }
                load_keputusan()
            })

            $(dom.btn.byDate).on('click', () => ModalAction(dom.modal.cari, 'show') )

            $(dom.form.cariPertanggal).on('submit', function(e) {
                e.preventDefault()
                getSearchResource(url.getKeputusan, $('.from').val(), $('.to').val(), res => {
                    if(res.status === 200){
                        if(res.data.length > 0){
                            ModalAction(dom.modal.cari,'hide')
                            UI.retrieveKeputusan(res.data)
                        }else{
                            $.notify('Data Tidak Ada', 'info')
                        }
                    }
                }, err => console.log(err) )
            })

        }

        const load_keputusan = (query = '') => getResource(url.getKeputusan, query, res => {
           res.status === 200 ? UI.retrieveKeputusan(res.data) : false;
        }, err => console.log(err) )


        return {
            init: () => {
                eventListener()
                load_keputusan()
            }
        }
    })(keputusanURL, keputusanUI)

    keputusanCTRL.init()


})()