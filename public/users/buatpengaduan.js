(function() {
    "use strict"

    const createPengaduanURL = (function() {
        const urlString = {
            postPengaduan: `${BASE_URL}api/ex/Pengaduan`
        }
        return {
            getURL: () => urlString
        }
    })()


    const createPengaduanInterface = (function() {
        const domString = {
            btn: {
                add_lampiran: '.btn__add__lampiran',
                addPermohonan: '#btn__ajukan__pengaduan'
            },
            html: {
                itemLampiran: '#item_lampiran'
            },
            form: {
                add: '#form-create-pengaduan'
            }
        }

        const renderField = () => {
            let html = '';
            html += `
                <tr>
                    <td><input type="file" name="lampiran[]" id="lampiran" class="form-control item-lampiran"> </td>
                    <td>
                       <button type="button" name="remove" class="btn btn-danger btn-remove"><span class="fa fa-minus"></span></button>
                    </td>
                </tr>
            `;
            $(domString.html.itemLampiran).append(html)
        }

        return {
            getDOM: () => domString,
            retrieveField: () => renderField()
        }
    })()


    const createPengaduanController = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()

        const eventListener = function(){

            $(dom.btn.add_lampiran).on('click', function() {
                UI.retrieveField()
            })

            $(dom.html.itemLampiran).on('click', '.btn-remove', function() {
                $(this).closest('tr').remove();
            })

            $(dom.form.add).validate({
                rules: {
                    nama_perusahaan: {
                        required: true 
                    },
                    judul_berita: {
                        required: true 
                    },
                    edisi_penerbitan: {
                        required: true
                    },
                    catatan: {
                        required: true
                    }
                },
                messages: {
                    nama_perusahaan: 'Nama Perusahaan Harus Diisi',
                    judul_berita: 'Judul Berita Harus Diisi',
                    edisi_penerbitan: 'Edisi Penerbitan Harus Diisi',
                    catatan: 'Catatan Harus Diisi'
                },
                errorPlacement: function(error, element){
                    error.css('color','red')
                    error.insertAfter(element)
                },
                submitHandler: function(form){
                    var error = []
                    $('.item-lampiran').each(function() {
                        if($(this).val() == ''){
                            error.push('Kolom Lampiran Belum Disi pada Kolom ')
                        }
                        
                    })

                    if(error.length > 0){
                        error.forEach((item, i  ) => $.notify(item + (parseInt(i) + 1), 'info'))
                    }else{
                        postResourceFormData(url.postPengaduan, form, dom.btn.addPermohonan ,res => {
                            if(res.status === 200){
                                $(dom.form.add)[0].reset();
                                $.notify(res.msg, 'success')
                            }else{
                                $.notify(res.msg, 'error')
                            }
                        }, err => $.notify('something wrong', 'error'), 'DONE'  )
                    }
                    
                }
            })

        }


        return {
            init: () => {
                console.log('init ')
                window.scrollTo(500,250)
                eventListener()
            }
        }
    })(createPengaduanURL, createPengaduanInterface)


    createPengaduanController.init()

})()