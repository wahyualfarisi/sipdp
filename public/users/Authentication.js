var SESSION = JSON.parse(localStorage.getItem('token')) 

$.ajax({
    url: `${BASE_URL}api/Auth/who_i_m`,
    type: 'GET',
    beforeSend: function(xhr){
        xhr.setRequestHeader('X-API-KEY', SESSION.token);
    },
    success: function(data){
        localStorage.setItem('profile', JSON.stringify(data));
        var obj = data.msg.payload[0];
        $('.greating_namadepan').text(obj.nama_depan)
        $('.greating_email').text(obj.email)
        $('.profile-content').text(obj.nama_depan)
        
        console.log()  
    },
    error: function(error){
        window.location.replace(`${BASE_URL}`);
        localStorage.clear()
    },
    complete: function(){
        // console.log('complete')
    }
});