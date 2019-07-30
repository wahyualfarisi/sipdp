(function() {
    "use strict"

    const pengaduURL = (function() {
        const urlString = {
            getPengadu: `${BASE_URL}api/Pengadu`,
            deletePengadu: `${BASE_URL}api/Pengadu`,
            updateStatusAkun: `${BASE_URL}api/Pengadu/update_status_akun`
        }
        return {
            getURL: () => urlString
        }
    })()


    const pengaduUI = (function() {
        const domString = {
            html: {
                list: '#show__list__pengadu'
            },
            field: {
                searchPengadu: '#search_pengadu'
            },
            btn: {
                edit: '.btn__edit',
                hapus: '.btn__delete',
                onDelete: '#btn__delete__petugas',
                onUpdate: '#btn_update_status'
            },
            modal: {
                delete: '#modalDelete',
                akun: '#modalUpdateAkun'
            },
            form: {
                delete: '#form-delete-petugas',
                akun: '#form-akun'
            }
        }

        const renderList = data => {
            let html = '', no = 1, statusAccount;
            if(data.length > 0){
                data.forEach(item => {
                    const { id_terdaftar, email, alamat, nama_depan, nama_belakang, tgl_terdaftar, status } = item
                    if(status === 'true'){
                        statusAccount = `<span class="badge badge-success">AKTIF</span>`
                    }else{
                        statusAccount = `<span class="badge badge-danger">NON AKTIF</span>`
                    }
                    html += `
                        <tr class="spacer"></tr>
                        <tr class="tr-shadow"> 
                            <td> ${no++} </td>
                            <td> ${id_terdaftar} </td>
                            <td>
                                <span class="block-email">${email}</span>
                            </td>
                            <td>${alamat} </td>
                            <td>${nama_depan} ${nama_belakang} </td>
                            <td>${tgl_terdaftar} </td>
                            <td>${statusAccount} </td>
                            <td>
                            <div class="table-data-feature">
                                <button class="item btn__edit" 
                                    data-status_akun="${status}"
                                    data-id_terdaftar="${id_terdaftar}"
                                    data-toggle="tooltip" data-placement="top" title="Edit">
                                    <i class="zmdi zmdi-edit"></i>
                                </button>
                                <button class="item btn__delete" 
                                    data-id_terdaftar="${id_terdaftar}"
                                    data-toggle="tooltip" data-placement="top" title="Delete">
                                    <i class="zmdi zmdi-delete"></i>
                                </button>
                            </div>
                        </td>
                        </tr>
                    `;
                });
            }
            $(domString.html.list).html(html)
        }

        return {
            getDOM: () => domString,
            retrieveData: data => renderList(data)
        }
    })()


    const pengaduCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){

            $(dom.field.searchPengadu).on('keyup', function() {
                if($(this).val() !== ""){
                    getResource(url.getPengadu, $(this).val(), res => {
                        res.status === 200 ? UI.retrieveData(res.data) : false
                    }, error => console.log(error))
                }else{
                    load_pengadu()
                }
            })

            $(dom.html.list).on('click', dom.btn.hapus, function() {
                var id_terdaftar = $(this).data('id_terdaftar');
                $('.id_terdaftar').val(id_terdaftar)
                ModalAction(dom.modal.delete,'show')
            })

            $(dom.form.delete).submit(function(e) {
                e.preventDefault()
                var id = $('.id_terdaftar').val()
                deleteResource(`${url.deletePengadu}/${id}`, this, dom.btn.onDelete, res => {
                    console.log(res)
                    if(res.status === 200){
                        $.notify(res.msg, 'success')
                        ModalAction(dom.modal.delete,'hide')
                        load_pengadu()
                    }
                }, err => console.log(err), 'DELETE' )
            })

            $(dom.html.list).on('click', dom.btn.edit, function() {
                var status = $(this).data('status_akun').toString()
                var id_terdaftar = $(this).data('id_terdaftar');
                $('.id_terdaftar').val(id_terdaftar)
                $('.status_akun').val(status)
                ModalAction(dom.modal.akun, 'show')
            })

            $(dom.form.akun).submit(function(e) {
                e.preventDefault()
                postResource(url.updateStatusAkun, this, dom.btn.onUpdate, res => {
                    if(res.status === 200){
                        $.notify(res.msg, 'success')
                        ModalAction(dom.modal.akun,'hide')
                        load_pengadu() 
                    }
                }, err => console.log(err), 'UPDATE STATUS AKUN')
            })

        }

        const load_pengadu = () => getResource(url.getPengadu, undefined, res => {
            res.status === 200 ? UI.retrieveData(res.data) : false
        }, error => console.log(error))

        return {
            init: () => {
                console.log('init ')
                eventListener()
                load_pengadu()
            }
        }
    })(pengaduURL, pengaduUI)

    pengaduCTRL.init()


})()