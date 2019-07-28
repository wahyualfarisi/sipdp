(function() {
    "use strict"

    const newPengaduanURL = (function() {
        const urlString = {
            getNotif: `${BASE_URL}api/int/Pengaduan/getNotif`,
            reqBuktiPengaduan: `${BASE_URL}api/int/Pengaduan/requestBuktiPengaduan`,
            show_jenis_tugas: `${BASE_URL}api/int/Disposisi/show_jenis_tugas`,
            showPenugasan: `${BASE_URL}api/Penugasan`,
            postDisposisi: `${BASE_URL}api/int/Disposisi`
        }
        return {
            getURL: () => urlString
        }
    })()


    const newPengaduanUI = (function() {
        const domString = {
            field: {
                email_pengirim: '.email_pengirim',
                nama_pengadu: '.nama_pengadu',
                alamat_pengadu: '.alamat_pengadu',
                tanggal_terdaftar: '.tanggal_terdaftar'
            },
            html: {
                show_list: '#show__list__pengaduan__baru',
                listBukti: '.buktipengaduan',
                listPetugas: '#show_petugas',
                listJenisTugas: '#show_jenis_tugas',
                contentModal: '#content-modal'
            },
            modal: {
                disposisi: '#modalDisposisi',
                notif: '#modalNotif'
            },
            btn: {
                addDisposisi: '.btn__buat__disposisi',
                onSaveDisposisi: '#btn__on__save'
            },
            form: {
                addDisposisi: '#form-add-disposisi'
            }
        }

        const renderPengaduanUser = data => {
            let html = '';
            data.forEach(item => {
                html += `
                    <tr class="spacer"></tr>
                    <tr class="tr-shadow">
                        <td> ${item.id_pengaduan} </td>
                        <td> ${item.nama_perusahaan_pers} </td>
                        <td> ${item.judul_berita} </td>
                        <td> ${item.edisi_penerbitan} </td>
                        <td> ${item.catatan} </td>
                    </tr>
                `;
            })
            $(domString.html.show_list).html(html)
        }

        const renderDetailPengadu = data => {
            
            data.forEach(item => {
                $(domString.field.email_pengirim).text(item.email)
                $(domString.field.nama_pengadu).text(item.nama_pengadu)
                $(domString.field.alamat_pengadu).text(item.alamat)
                $(domString.field.tanggal_terdaftar).text(item.tgl_terdaftar)
            })

        }

        const renderBukti = data => {
            let html = '';
            if(data.length > 0){            
                data.forEach(item => {
                    html += `
                    <div class="card ml-5 ">
                        <div class="card-body">
                             <img src="${BASE_URL}lampiran/${item.bukti_pengaduan}" width="350" />
                        </div>
                    </div>
                    `
                })
            }
            $(domString.html.listBukti).html(html)
        }

        const renderPenugasan = data => {
            let html = ''
            if(data.length > 0){
                html += '<option value=""> -- Pilih Petugas --  </option>'
                data.forEach(item => {
                    html += `
                        <option value="${item.id_petugas}"> ${item.bagian} </option>
                    `;
                })
            }
            $(domString.html.listPetugas).html(html)
        }

        const renderJenisTugas = data => {
            let html = ''
            if(data.length > 0 ){
                html += '<option value=""> -- Pilih Jenis Tugas --  </option>'
                data.forEach(item => {
                    html += `
                         <option value="${item}"> ${item} </option>
                    `
                })
            }
            $(domString.html.listJenisTugas).html(html)
        }

        return {
            getDOM: () => domString,
            retrievePengaduanUser: data => {
                renderPengaduanUser(data)
                renderDetailPengadu(data)
            },
            retrieveBukti: data => renderBukti(data),
            retrievePenugasan: data => renderPenugasan(data),
            retrieveJenisTugas: data => renderJenisTugas(data)
        }
    })()


    const newPengaduanCTRL = (function(URL, UI) {
        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){

            $(dom.btn.addDisposisi).on('click', () => {
                load_jenis_tugas()
                load_penugasan()
                ModalAction(dom.modal.disposisi, 'show')
            })

            $(dom.form.addDisposisi).validate({
                rules: {
                    id_pengaduan: {
                        required: true
                    },
                    petugas: {
                        required: true
                    },
                    jenis_tugas: {
                        required: true
                    },
                    catatan_disposisi: {
                        required: true
                    }
                },
                messages: {
                    id_pengaduan: 'ID Pengaduan Tidak Boleh Kosong',
                    petugas: 'Petugas Harus Di Pilih',
                    jenis_tugas: 'Jenis Tugas Harus Di pilih',
                    catatan_disposisi: 'Catatan Disposisi Harus Diisi'
                },
                errorPlacement: function(error, element){
                    error.css('color','red')
                    error.insertAfter(element)
                },
                submitHandler: function(form){
                    postResource(url.postDisposisi, form, dom.btn.onSaveDisposisi, res => {
                        if(res.status === 200){
                            ModalAction(dom.modal.disposisi, 'hide')
                            location.hash = '#/dashboard';
                            $.notify(res.msg, 'success')
                        }
                    }, error => console.log(error), 'SIMPAN' )
                }
            })
        }

        const load__pengaduan_user = () => getResource(url.getNotif, undefined, res => {
            const filterData = res.data.filter(item => item.id_pengaduan === NUMBER_SECRET);
            if(filterData.length > 0){
                UI.retrievePengaduanUser(filterData);
                load_bukti_pengaduan(NUMBER_SECRET)
            }else{
                console.log('filter tidak ditemukan');
            }
        }, error => console.log(error) );

        const load_bukti_pengaduan = (id_pengaduan) => getResource(`${url.reqBuktiPengaduan}?id=${id_pengaduan}`, undefined, res => {
            if(res.status === 200){
                UI.retrieveBukti(res.data)
            }
        }, error => console.log(error))

        const load_jenis_tugas = () => getResource(url.show_jenis_tugas, undefined, res => {
            res.status === 200 ? UI.retrieveJenisTugas(res.data) : false;
        }, error => console.log(error))

        const load_penugasan = () => getResource(url.showPenugasan, undefined, res => {
            if(res.status === 200){
                UI.retrievePenugasan(res.data)
            }
        }, error => console.log(error))


        return {
            init: () => {
                load__pengaduan_user()
                eventListener()
                console.log('init ')
            }
        }
    })(newPengaduanURL, newPengaduanUI)

    newPengaduanCTRL.init()

})()