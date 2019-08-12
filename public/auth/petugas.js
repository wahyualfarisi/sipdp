(function() {
    "use strict"

    const PetugasURL = (function() {
        const urlString = {
            login: `${BASE_URL}api/Auth/login_petugas` //post method
        }
        return {
            getURL: () => urlString
        }
    })()


    const PetugasUI = (function() {
        const domString = {
            form: {
                login: '#form-login-petugas'
            },
            btn: {
                login: '#btn__login'
            }
        }

        return {
            getDOM: () => domString
        }
    })()


    const PetugasController = (function(URL, UI) {

        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){

            $(dom.form.login).validate({
                rules: {
                    email: {
                        required: true ,
                        email: true 
                    },
                    password: {
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
                        required: 'Password Tidak Boleh Kosong '
                    },
                    akses: {
                        required: 'Akses Tidak Boleh Kosong'
                    }
                },
                errorPlacement: (error,element) => {
                    error.css('color','red')
                    error.insertAfter(element)
                },
                submitHandler: (form) => {
                    $.ajax({
                        url: url.login,
                        type: 'post',
                        data: $(form).serialize(),
                        beforeSend: function(){
                            console.log('before send')
                            $(dom.btn.login).attr('disabled', true).html('<i class="fa fa-spinner fa-spin" > </i>')
                        },
                        success: function(data){
                            if(data.status === 200){
                                localStorage.setItem('token_adm', JSON.stringify(data) )
                                if(data.akses === "TU"){
                                    location.href = `${BASE_URL}Tu/`
                                }else if(data.akses === "KETUA"){
                                    location.href = `${BASE_URL}Ketua/`
                                }else if(data.akses === "KOMISI"){
                                    location.href = `${BASE_URL}Komisi/`
                                }else if(data.akses === 'SEKRETARIS'){
                                    location.href = `${BASE_URL}Sekret/`
                                }else{
                                    return false;
                                }
                            }
                        },
                        error: function(error){
                            console.log(error)
                            if(error){
                                $.notify(error.responseJSON.msg, 'info')
                            }
                            
                        },
                        complete: function(){
                            console.log('complete')
                            $(dom.btn.login).attr('disabled', false).text('LOGIN')
                        }
                    })
                }
            })

        }

        


        return {
            init: () => {
                console.log('init ')
                eventListener()
            }
        }
    })(PetugasURL, PetugasUI)

    PetugasController.init()

})()