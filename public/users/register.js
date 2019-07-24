(function() {
    "use strict"

    const registerURL = (function() {
        const urlString = {
            register: `${BASE_URL}api/Auth/register`
        }

        return {
            getURL: () => urlString
        }

    })()


    const registerInterface = (function() {
        const domString = {
            form: {
                Register: '#form-register-user'
            }
        }

        return {
            getDOM: () => domString
        }
    })()


    const registerController = (function(URL, UI) {
        const dom = UI.getDOM()
        const url = URL.getURL()


        const eventListener = function(){

            $(dom.form.Register).validate({
                rules: {
                    email: {
                        required: true,
                        email: true 
                    },
                    password: {
                        required: true
                    },
                    konfirmasi_password: {
                        required: true 
                    },
                    nama_depan: {
                        required: true 
                    },
                    nama_belakang: {
                        required: true 
                    },
                    alamat: {
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
                    konfirmasi_password: {
                        required: 'Konfirmasi Password Tidak Boleh Kosong'
                    },
                    nama_depan: {
                        required: 'Nama Depan Tidak Boleh Kosong '
                    },
                    nama_belakang: {
                        required: 'Nama Belakang Tidak Boleh Kosong '
                    },
                    alamat: {
                        required: 'Alamat Tidak Boleh Kosong'
                    }
                },
                errorPlacement: function(error,element){
                    error.css('color','red')
                    error.insertBefore(element)
                },
                submitHandler: function(form){
                    var password1 = $('#password1').val();
                    var password2 = $('#password2').val();
                    if(password1 !== password2){
                        $.notify('Password Tidak Sama', 'error')
                    }else{                       
                        $.ajax({
                            url: url.register,
                            type: 'post',
                            data: $(form).serialize(),
                            beforeSend: function(){
                                $('#sign__up').attr('disabled',true).html("<i class='fa fa-spinner fa-spin'> </i>")
                                
                            },
                            success: function(data){
                                if(data.status === 200){
                                    location.href = `${BASE_URL}verifikasi-akun?sendemail=success`;
                                    localStorage.setItem('newUsers', JSON.stringify(data) );
                                    $.notify(data.msg, 'success')
                                    
                                }
                            },
                            error: function(error){
                                console.log(error.status)
                                if(error.status === 400){
                                    $.notify('Terjadi Kesalahan , Silahkan Ulangi Kembali', 'info')
                                }
                            },
                            complete: function(){
                                $('#sign__up').text('Registrasi').attr('disabled', false)
                            }
                        })
                    }
                }
            })

        }


        return {
            init: () => {
                console.log('init')
                eventListener()
            }
        }
    })(registerURL, registerInterface)

    registerController.init();


})()