var SESSION = JSON.parse(localStorage.getItem('token_adm')) 
$.ajax({
    url: `${BASE_URL}api/Auth/who_i_m`,
    type: 'GET',
    beforeSend: function(xhr){
        xhr.setRequestHeader('X-API-KEY', SESSION.token);

    },
    success: function(data){
        if(data.status === 200){
            $('#desc__profile').text(`${data.msg.nama_lengkap} - ${data.msg.akses}`   )
        }
        
    },
    error: function(error){
        window.location.replace(`${BASE_URL}petugas`);
        localStorage.clear()
    },
    complete: function(){
        // console.log('complete')
    }
});

