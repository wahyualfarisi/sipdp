<?php




function validation_form()
{   
    $ci=&get_instance();
    $ci->load->library('form_validation');


    $config = array(
        array(
            'field' => 'email',
            'label' => 'email',
            'rules' => 'required|valid_email|trim',
            'errors' => array(
                'valid_email' => 'Email Tidak Valid',
                'required' => 'Email Tidak Boleh Kosong'
            )
        ),
        array(
            'field' => 'password',
            'label' => 'password',
            'rules' => 'required',
            'errors' => array(
                'required' => 'Password Harus Diisi'
            )
        ),
        array(
            'field' => 'alamat',
            'label' => 'alamat',
            'rules' => 'required',
            'errors' => array(
                'required' => 'Alamat Tidak Boleh Kosong'
            )
        ) ,
        array(
            'field' => 'nama_depan',
            'label' => 'nama_depan',
            'rules' => 'required',
            'errors' => array(
                'required' => 'Nama Depan Tidak Boleh Kosong'
            )
        )
    );

    $this->form_validation->set_rules($config);

    if($this->form_validation->run() === FALSE){
        $erros  = $this->form_validation->error_array();
        return $erros;

    }else{
        return 'great';
    }

    // return $data;
}