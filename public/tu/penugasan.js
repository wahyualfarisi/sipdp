(function() {
    "use strict"

    const penugasanURL = (function() {
        const urlString = {
            getPenugasan: `${BASE_URL}api/Penugasan`,
            addPenugasan: `${BASE_URL}api/Penugasan`,
            deletePenugasan: `${BASE_URL}api/Penugasan`, //add parameter 
            updatePenugasan: `${BASE_URL}api/Penugasan/update`
        }
        return {
            getURL: () => urlString
        }
    })()


    const penugasanUI = (function() {
        const domString = {
            html: {
                list: '#show__list__penugasan'
            },
            form: {
                add: '#form-add',
                delete: '#form-delete',
                update: '#form-update'
            },
            btn: {
                onUpdate: '#btn__updateOnModal',
                onDelete: '#btn__deleteOnModal',
                onSave: '#btn__addOnModal',
                add: '.btn__add',
                edit: '.btn__edit',
                hapus: '.btn__hapus'
            },
            modal: {
                add: '#modalAdd',
                delete: '#modalDelete',
                edit: '#modalEdit'
            },
            field: {
                searchPenugasan: '#search_penugasan'
            }
        }

        const renderList = data => {
            let html = '', no = 1;
            if(data.length > 0){
                data.forEach(item => {
                    html += `
                        <tr class="spacer"></tr>
                        <tr class="tr-shadow">
                            <td> ${no++} </td>
                            <td> ${item.bagian} </td>
                            <td> 
                                <div class="table-data-feature">
                                    <button class="item btn__edit" 
                                        data-id_petugas="${item.id_petugas}"
                                        data-bagian="${item.bagian}"
                                        data-toggle="tooltip" data-placement="top" title="Edit">
                                        <i class="zmdi zmdi-edit"></i>
                                    </button>
                                    <button class="item btn__hapus" 
                                        data-id_petugas="${item.id_petugas}"
                                        data-toggle="tooltip" data-placement="top" title="Delete">
                                        <i class="zmdi zmdi-delete"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `;
                })
            }
            $(domString.html.list).html(html)
        }

        return {
            getDOM: () => domString,
            retrieveData: data => renderList(data)
        }
    })()


    const penugasanCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){

            $(dom.btn.add).on('click', () => ModalAction(dom.modal.add, 'show'))
            
            $(dom.form.add).validate({
                rules: {
                    bagian: {
                        required: true 
                    }
                },
                messages: {
                    bagian: {
                        required: 'Bagian Tidak Boleh Kosong'
                    }
                },
                errorPlacement: function(error, element){
                    error.css('color','red')
                    error.insertAfter(element)
                },
                submitHandler: function(form){
                    postResource(url.addPenugasan, form, dom.btn.onSave, res => {
                        if(res.status === 200){
                            $(dom.form.add)[0].reset()
                            ModalAction(dom.modal.add, 'hide')
                            $.notify(res.msg, 'success')
                            load_penugasan()
                        }else{
                            $.notify(res.msg, 'error')
                        }
                    }, error => console.log(error), 'SIMPAN' )
                }
            })

            $(dom.html.list).on('click', dom.btn.hapus, function() {
                var id = $(this).data('id_petugas');
                $('.id_petugas').val(id)
                ModalAction(dom.modal.delete, 'show')
            })

            $(dom.html.list).on('click', dom.btn.edit, function() {
                var id = $(this).data('id_petugas')
                var bagian = $(this).data('bagian');
                $('#id_petugas_edit').val(id)
                $('#bagian_edit').val(bagian)
                ModalAction(dom.modal.edit, 'show')
            })

            $(dom.form.update).validate({
                rules: {
                    bagian: {
                        required: true 
                    },
                    id_petugas: {
                        required: true
                    }
                },
                messages: {
                    bagian: {
                        required: 'Bagian Tidak Boleh Kosong'
                    },
                    id_petugas: {
                        required: 'ID Tidak Boleh Kosong'
                    }
                },
                errorPlacement: function(error, element){
                    error.css('color','red')
                    error.insertAfter(element)
                },
                submitHandler: function(form){
                    postResource(url.updatePenugasan, form, dom.btn.onUpdate, res => {
                        if(res.status === 200){
                            ModalAction(dom.modal.edit, 'hide')
                            load_penugasan()
                            $.notify(res.msg, 'success')
                        }else{
                            $.notify(res.msg, 'error')
                        }
                    }, error => $.notify('Terjadi Masalah', 'error'), 'UPDATE')
                }
            })

            $(dom.form.delete).submit(function(e) {
                e.preventDefault();
                var id = $('.id_petugas').val();
                deleteResource(`${url.deletePenugasan}/${id}`, this, dom.btn.onDelete, res => {
                    if(res.status === 200){
                        ModalAction(dom.modal.delete,'hide')
                        load_penugasan()
                        $.notify(res.msg, 'success')
                    }else{
                        $.notify(res.msg, 'error')
                    }
                }, error => console.log(error) , 'DELETE' );
            })

            $(dom.field.searchPenugasan).on('keyup', function() {
                getResource(url.getPenugasan, $(this).val() , res => UI.retrieveData(res.data), error => console.log(error))
            })


        }

        const load_penugasan = () => getResource(url.getPenugasan, undefined, res => {
            res.status === 200 ? UI.retrieveData(res.data) : false;
        }, error => console.log(error) )

        return {
            init: () => {
                console.log('init ')
                window.scrollTo(500, 0)
                eventListener()
                load_penugasan()
            }
        }
    })(penugasanURL, penugasanUI)

    penugasanCTRL.init()

})()