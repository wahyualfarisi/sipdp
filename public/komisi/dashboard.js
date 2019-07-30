(function() {
    "use strict"

    const dashboardURL = (function() {
        const urlString = {
            getPengaduan: `${BASE_URL}api/int/Pengaduan`,
            getTindakLanjutDisposisi: `${BASE_URL}api/int/Disposisi/show_disposisi_tindaklanjuti`,
            buatKeputusan: `${BASE_URL}api/int/Keputusan`
        }
        return {
            getURL: () => urlString
        }
    })()


    const dashboardUI = (function() {
        const domString = {
           html: {
            listTindakLanjut: '.show-tindaklanjut-disposisi',
            listPengaduanSelesai: '.show-pengaduan-selesai'
           },
           btn: {
               addKeputusan: '.btn__add__keputusan',
               onSave: '#btn_on_save'
           },
           modal: {
               keputusan: '#modalKeputusan'
           },
           form: {
               keputusan: '#form-keputusan'
           }
        }

        const renderDisposisi = data => {
            let html = '', labelItem
            if(data.length > 0)
            {
                data.forEach((item, i) => {
                    console.log(item)
                    var mod = i % 2
                    if(mod === 0){
                        labelItem = 'success'
                    }else{
                        labelItem = 'warning'
                    }
                    html +=  `
                        <div class="au-task__item au-task__item--${labelItem}">
                            <div class="au-task__item-inner">
                            <h5 class="task">
                                <a href="#">Nomor Disposisi:  ${item.nomor_disposisi} </a>
                                <p> Penugasan: ${item.bagian} </p>
                                <p> Judul Berita: ${item.judul_berita} </p>
                            </h5>
                            <span class="time"> ${item.tgl_disposisi} </span>
                            <p> 
                                <button class="btn btn-success btn__add__keputusan" 
                                    data-id_pengaduan="${item.id_pengaduan}"
                                    data-nomor_disposisi="${item.nomor_disposisi}"
                                    >Buat Surat Keputusan </button>
                            </p>
                            </div>
                        </div> 
                    `
                })
            }else{
                html += `
                    <div class="text-center">
                        <img src="${BASE_URL}assets/img/nodata.svg" width="150" />
                    </div>
                `
            }
            $(domString.html.listTindakLanjut).html(html)
        }

        const renderPengaduanSelesai = data => {
            var html = ''
            if(data.length > 0 )
            {
                data.forEach(item => {
                    html += `
                    <div class="au-task__item au-task__item--success">
                        <div class="au-task__item-inner">
                        <h5 class="task">
                            <a href="#">No. Pengaduan : ${item.id_pengaduan}</a>
                            <table class="table" >
                                <tr>
                                    <th>Judul Berita </th>
                                    <td> ${item.judul_berita} </td>
                                </tr>
                                <tr>
                                    <th>Nama Perusahaan Pers </th>
                                    <td>${item.nama_perusahaan_pers} </td>
                                </tr>
                                <tr>
                                    <th>Nama Pengadu </th>
                                    <td>${item.nama_pengadu} </td>
                                </tr>
                            </table>
                          
                        </h5>
                       
                        </div>
                    </div> 
                    `
                })
            }else{
                html += `
                    <div class="text-center">
                        <img src="${BASE_URL}assets/img/nodata.svg" width="150" />
                    </div>
                `
            }

            $(domString.html.listPengaduanSelesai).html(html)
        }

        return {
            getDOM: () => domString,
            retrieveDisposisi: data => renderDisposisi(data),
            retirevePengaduanSelesai: data => renderPengaduanSelesai(data)
        }
    })()


    const dashboardCTRL = (function(URL, UI) {

        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){

            $(dom.html.listTindakLanjut).on('click', dom.btn.addKeputusan, function() {
                var id_pengaduan = $(this).data('id_pengaduan')
                var nomor_disposisi = $(this).data('nomor_disposisi')

                $('.id_pengaduan').val(id_pengaduan)
                $('.nomor_disposisi').val(nomor_disposisi)
                ModalAction(dom.modal.keputusan, 'show')
            })

            $(dom.form.keputusan).validate({
                rules: {
                    nomor_disposisi: {
                        required: true 
                    },
                    id_pengaduan: {
                        required: true 
                    },
                    lampiran: {
                        required: true 
                    },
                    perihal: {
                        required: true 
                    },
                    isi_agenda: {
                        required: true 
                    }
                },
                messages: {
                    nomor_disposisi: 'Nomor Disposisi Tidak Boleh Kosong',
                    id_pengaduan: 'ID Pengaduan Tidak Boleh Kosong',
                    lampiran: 'Lampiran Tidak Boleh Kosong',
                    perihal: 'Perihal Harus Di isi',
                    isi_agenda: 'Isi Agenda Harus Di Isi'
                },
                errorPlacement: function(error, element){
                    error.css('color','red')
                    error.insertAfter(element)
                },
                submitHandler: function(form){
                    postResource(url.buatKeputusan, form, dom.btn.onSave, res => {
                        console.log(res)
                        if(res.status === 200){
                            load_pengaduan_selesai()
                            load_tindak_lanjut_disposisi()
                            ModalAction(dom.modal.keputusan,'hide')
                            LOAD_NOTIF()
                        }
                    }, err => console.log(err), 'BUAT KEPUTUSAN' )
                }
            })

        }

        const load_tindak_lanjut_disposisi = () => getResource(url.getTindakLanjutDisposisi, undefined, res => {
            if(res.status === 200){
                $('#jumlah_menunggu_keputusan').text(res.jumlah)
                UI.retrieveDisposisi(res.data)
            }
        }, err => console.log(err))

        const load_pengaduan_selesai = () => getResource(url.getPengaduan, 'selesai', res => {
            if(res.status === 200){
                UI.retirevePengaduanSelesai(res.data)
            }
        }, err => console.log(err) )

        return {
            init: () => {
                console.log('init ')
                eventListener()
                load_tindak_lanjut_disposisi()
                load_pengaduan_selesai()
            }
        }
    })(dashboardURL, dashboardUI)

    dashboardCTRL.init()

})()