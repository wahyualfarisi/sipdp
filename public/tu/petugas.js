(function() {
    "use strict"

    const petugasURL = (function() {
        const urlString = {
            getPetugas: `${BASE_URL}api/Petugas`,
            updatePetugas: `${BASE_URL}api/Petugas/update`,
            deletePetugas: `${BASE_URL}api/Petugas`,
            addPetugas: `${BASE_URL}api/Petugas`
        }
        return {
            getURL: () => urlString
        }
    })()


    const petugasInterface = (function() {
        const domString = {
            html: {
                listPetugas: '#show__list__petugas'
            },
            field: {
                searchPetugas: '#search_petugas'
            },
            btn: {
                btnAdd: '.btn__add__petugas',
                btnEdit: '.btn__edit',
                btnHapus: '.btn__hapus',
                btnUpdate: '#btn__update',
                onDelete: '#btn__delete__petugas',
                onSave: '#btn__add'
            },
            modal: {
                add: '#modalAddPetugas',
                edit: '#modalEdit',
                hapus: '#modalDelete'
            },
            form: {
                edit: '#form-edit-petugas',
                hapus: '#form-delete-petugas',
                add: '#form-add-petugas'
            }
        }

        const renderListPetugas = data => {
            let html = '', no = 1, labelAkses;
            if(data.length > 0){
                data.forEach(item => {
                    const {email_petugas, password, nama_depan, nama_belakang, akses} = item;
                    if(akses === 'TU'){
                        labelAkses = `<span class="badge badge-primary">${akses}</span>`
                    }else if(akses === "KETUA"){
                        labelAkses = `<span class="badge badge-danger">${akses}</span>`
                    }else if(akses === "KOMISI"){
                        labelAkses = `<span class="badge badge-warning">${akses}</span>`
                    }
                    html += `
                    <tr class="spacer"></tr>
                    <tr class="tr-shadow">
                        <td>${no++} </td>
                        <td>
                             <span class="block-email">${email_petugas}</span>
                        </td>
                        <td>
                            ${nama_depan} ${nama_belakang}
                        </td>
                        <td class="desc"> ${labelAkses} </td>
                        <td>
                            <div class="table-data-feature">
                                <button class="item btn__edit" 
                                    data-email="${email_petugas}" 
                                    data-nama_depan="${nama_depan}"
                                    data-nama_belakang="${nama_belakang}"
                                    data-akses="${akses}"
                                    data-password="${password}"
                                    data-toggle="tooltip" data-placement="top" title="Edit">
                                    <i class="zmdi zmdi-edit"></i>
                                </button>
                                <button class="item btn__hapus" 
                                    data-email="${email_petugas}"
                                    data-toggle="tooltip" data-placement="top" title="Delete">
                                    <i class="zmdi zmdi-delete"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    
                    `;
                })
            }
            $(domString.html.listPetugas).html(html)
        }

        return {
            getDOM: () => domString,
            retriveDataPetugas: data => renderListPetugas(data)
        }
    })()


    const petugasController = (function(URL, UI) {
        

        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){

            $(dom.field.searchPetugas).on('keyup', function() {
                getResource(url.getPetugas, $(this).val(), res => UI.retriveDataPetugas(res.data), err => console.log(err))
            })

            $(dom.btn.btnAdd).click(() => ModalAction(dom.modal.add, 'show') );


            $(dom.html.listPetugas).on('click', dom.btn.btnEdit,function() {
                var email = $(this).data('email')
                var password = $(this).data('password')
                var nama_depan = $(this).data('nama_depan')
                var nama_belakang = $(this).data('nama_belakang')
                var akses = $(this).data('akses')
                $('#email_update').val(email)
                $('#password').val(password)
                $('#nama_depan').val(nama_depan)
                $('#nama_belakang').val(nama_belakang)
                $('#akses').val(akses)
                ModalAction(dom.modal.edit,'show')
            })

            $(dom.html.listPetugas).on('click', dom.btn.btnHapus, function() {
                var id = $(this).data('email')
                $('#email').val(id);
                ModalAction(dom.modal.hapus, 'show')
            })

            $(dom.form.edit).validate({
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true
                    },
                    nama_depan: {
                        required: true
                    },
                    akses: {
                        required: true 
                    }
                },
                messages: {
                    email: {
                        required: 'Email Tidak Boleh Kosong',
                        email: 'Email Tidak Valid'
                    },
                    password: {
                        required: 'Password Tidak Boleh Kosong'
                    },
                    nama_depan: {
                        required: 'Nama Depan Tidak Boleh Kosong'
                    },
                    nama_belakang: {
                        required: 'Nama Belakang Tidak Boleh Kosong'
                    },
                    akses: {
                        required: 'Akses tidak Boleh Kosong'
                    }
                },
                errorPlacement: function(error, element){
                    error.css('color','red')
                    error.insertAfter(element)
                },
                submitHandler: function(form){
                    postResource(url.updatePetugas, form, dom.btn.btnUpdate, res => {
                        if(res.status === 200){
                            ModalAction(dom.modal.edit, 'hide')
                            load_petugas()
                            $.notify(res.msg, 'success')
                        }else{
                            $.notify(res.msg, 'error')
                        }
                    }, error => console.log(error), 'UPDATE');
                }
            });

            $(dom.form.hapus).on('submit', function(e) {
                var email = $('#email').val();
                e.preventDefault()
                deleteResource(`${url.deletePetugas}/${email}`, this, dom.btn.onDelete, res => {
                    if(res.status === 200){
                        ModalAction(dom.modal.hapus, 'hide')
                        load_petugas()
                        $.notify(res.msg, 'success')
                    }else{
                        $.notify(res.msg, 'error')
                    }
                }, error => console.log(error), 'DELETE' )
            })

            $(dom.form.add).validate({
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true
                    },
                    nama_depan: {
                        required: true
                    },
                    akses: {
                        required: true 
                    }
                },
                messages: {
                    email: {
                        required: 'Email Tidak Boleh Kosong',
                        email: 'Email Tidak Valid'
                    },
                    password: {
                        required: 'Password Tidak Boleh Kosong'
                    },
                    nama_depan: {
                        required: 'Nama Depan Tidak Boleh Kosong'
                    },
                    nama_belakang: {
                        required: 'Nama Belakang Tidak Boleh Kosong'
                    },
                    akses: {
                        required: 'Akses Tidak Boleh Kosong'
                    }
                },
                errorPlacement: function(error, element){
                    error.css('color','red')
                    error.insertAfter(element)
                },
                submitHandler: function(form){
                    postResource(url.addPetugas, form, dom.btn.onSave, res => {
                        if(res.status === 200){
                            ModalAction(dom.modal.add, 'hide')
                            load_petugas()
                            $.notify(res.msg, 'success')
                        }else{
                            $.notify(res.msg, 'error')
                        }
                    }, error => console.log(error), 'UPDATE');
                    
                }
            });







        }


        const load_petugas = () => getResource(url.getPetugas, undefined,  response => {
            response.status === 200 ? UI.retriveDataPetugas(response.data) : false
        }, error => console.log(error));


        return {
            init: () => {
                console.log('init ')
                window.scrollTo(500, 0)
                eventListener()
                load_petugas()
            }
        }
    })(petugasURL, petugasInterface)

    petugasController.init()

})()