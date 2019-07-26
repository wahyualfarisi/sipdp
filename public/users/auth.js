var verify = localStorage.getItem('token')

if(verify){
     location.href = `${BASE_URL}User/`;
}

