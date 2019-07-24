(function() {
    "use strict"

    const loginURL = (function() {
        const urlString = {
            login: `${BASE_URL}api/Auth/login_users`
        }

        return {
            getURL: () => urlString
        }
    })()


    const loginInterface = (function() {
        const domString = {
            form: {
                loginForm: '#form-login'
            },
            btn: {
                btn_login: '#btn__login'
            }
        }

        return {
            getDOM: () => domString
        }
    })()


    const loginController = (function(URL, UI) {
        const dom = UI.getDOM()
        const url = URL.getURL()

        const eventListener = function(){

            $(dom.form.loginForm).validate({
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
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
                    }
                },
                errorPlacement: function(error, element){
                    error.css('color','red')
                    error.insertAfter(element)
                },
                submitHandler: function(form){
                   $.ajax({
                       url: url.login,
                       type: 'post',
                       data: $(form).serialize(),
                       beforeSend: function(){
                        $(dom.btn_login).attr('disabled',true).html("<i class='fa fa-spinner fa-spin'> </i>")
                       },
                       success: function(data){
                           if(data.status === 200){
                                localStorage.setItem('token', data.token);
                                location.href = `${BASE_URL}user/`
                           }
                       },
                       error: function(err){
                           $.notify('Periksa Kembali Email Dan Password Anda', 'error')
                       },
                       complete: function(){
                           $(dom.btn.btn_login).text('LOGIN').attr('disabled', false)
                       }
                   })
                }
            })

        }


        return {
            init: () => {
                console.log('init')
                eventListener()
            }
        }
    })(loginURL, loginInterface)

    loginController.init()


})()