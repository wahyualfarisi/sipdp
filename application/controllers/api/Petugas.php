<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
use Restserver\Libraries\REST_Controller;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

class Petugas extends REST_Controller {
    public function __construct($config = 'rest'){
        parent::__construct($config);
        $this->t_petugas = 'tbl_petugas';
        $this->primary = 'email_petugas';
        $this->load->model('m_core');
        $this->load->helper(['jwt', 'authorization']);
        $this->token = $this->verify_request();
    }

    public function index_get()
    {
        if($this->token){
            try{
                $query = "";

                if($this->input->get('query') ){
                    $query = $this->input->get('query');
                }

                $data = $this->m_core->gettablesearch($query, $this->t_petugas, 'nama_depan');
                $status = parent::HTTP_OK;
                $res['data'] = $data->result();
                $res['status'] = $status;
                $this->response($res, $status);
            }catch(Exception $e){
                $status = parent::HTTP_NOT_FOUND;
                $res['data']   = null;
                $res['status'] = $status;
                $this->response($res, $status);
            }
        }
    }

    public function index_post(){
        if($this->token){
            $config = array(
                array(
                    'field' => 'email',
                    'label' => 'email',
                    'rules' => 'required|trim',
                    'errors' => array(
                        'required' => 'Email Tidak Boleh Kosong',
                    )
                ), 
                array(
                    'field' => 'password',
                    'label' => 'password',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Password Tidak Boleh Kosong'
                    )
                    ),
                array(
                    'field' => 'nama_depan',
                    'label' => 'nama_depan',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Nama Depan Tidak Boleh Kosong'
                    )
                    ),
                array(
                    'field' => 'akses',
                    'label' => 'akses',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Akses Tidak Boleh Kosong '
                    )
                )
            );
            $this->form_validation->set_rules($config);
            if($this->form_validation->run() === FALSE ){
                $errors['errors'] = $this->form_validation->error_array();
                $status           = parent::HTTP_BAD_REQUEST;
                $this->response($errors, $status);
                return; 
            }

            try{
                $data = array(
                    $this->primary  => $this->input->post('email'),
                    'password'  => $this->input->post('password'),
                    'nama_depan' => $this->input->post('nama_depan'),
                    'nama_belakang' => $this->input->post('nama_belakang'),
                    'akses'      => $this->input->post('akses')
                );

                $where[$this->primary] = $data[$this->primary];
                $chek_email = $this->m_core->get_where($this->t_petugas, $where);
                if($chek_email->num_rows() > 0){
                    $status = parent::HTTP_BAD_REQUEST;
                    $res['msg'] = 'Email Sudah Digunakan';
                    $res['status'] = $status;
                    $this->response($res, $status);
                    return;
                }

                $insert = $this->m_core->add_data($this->t_petugas, $data);
                if($insert){
                    $status = parent::HTTP_OK;
                    $res['data']    = $data;
                    $res['msg']     = 'Berhasil Menambahkan';
                    $res['status']  = $status;
                    $this->response($res, $status);
                }else{
                    $status = parent::HTTP_BAD_REQUEST;
                    $res['msg'] = 'Terjadi Masalah';
                    $this->response($res, $status);
                }


            }catch(Exception $e){
                $status = parent::HTTP_BAD_REQUEST;
                $res['msg'] = 'Server Error';
                $this->response($res, $status);
            }


        }
    }


    public function update_post(){
        if($this->token){
            $config = array(
                array(
                    'field' => 'email',
                    'label' => 'email',
                    'rules' => 'required|trim',
                    'errors' => array(
                        'required' => 'Email Tidak Boleh Kosong',
                    )
                ), 
                array(
                    'field' => 'password',
                    'label' => 'password',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Password Tidak Boleh Kosong'
                    )
                    ),
                array(
                    'field' => 'nama_depan',
                    'label' => 'nama_depan',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Nama Depan Tidak Boleh Kosong'
                    )
                    ),
                array(
                    'field' => 'akses',
                    'label' => 'akses',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Akses Tidak Boleh Kosong '
                    )
                    )
            );

            $this->form_validation->set_rules($config);
            if($this->form_validation->run() === FALSE){
                $errors['errors'] = $this->form_validation->error_array();
                $status = parent::HTTP_BAD_REQUEST;
                $this->response($errors, $status);
                return;
            }

            try{
                $data = array(
                    'nama_depan' => $this->input->post('nama_depan'),
                    'nama_belakang' => $this->input->post('nama_belakang'),
                    'akses'      => $this->input->post('akses')
                );

                $where = array(
                    $this->primary => $this->input->post('email')
                );

                $chek_email = $this->m_core->get_where($this->t_petugas, $where);

                if($chek_email->num_rows() > 0){
                    $update = $this->m_core->update_table($this->t_petugas, $data, $where);
                    if($update){
                        $status = parent::HTTP_OK;
                        $res['msg'] = 'Berhasil Update Petugas';
                        $res['data'] = $data;
                        $res['status'] = $status;
                        $this->response($res, $status);
                    }else{
                        $status = parent::HTTP_BAD_REQUEST;
                        $res['msg'] = 'Gagal Update Petugas';
                        $res['status'] = $status;
                        $this->response($res, $status);
                    }
                }
                
               
            }catch(Exception $e){
                $this->response(array(
                    'msg' => 'Terjadi Masalah',
                    'status' => 404
                ), parent::HTTP_BAD_REQUEST);
            }

        }
    }
    

    public function index_delete($id = ''){
        if($this->token){
            try{
                $where    = array(
                    $this->primary => $id
                );
                $check_id = $this->m_core->get_where($this->t_petugas, $where);
                if($check_id->num_rows() > 0){
                    $delete = $this->m_core->delete_rows($this->t_petugas, $where);
                    if($delete){
                     $status = parent::HTTP_OK;
                     $res['msg']    = 'Berhasil Menghapus Petugas Deganan Email '.$id;
                     $res['status'] = $status;
                     $this->response($res, $status);   
                    }else{
                        $status = parent::HTTP_BAD_REQUEST;
                        $res['msg'] = 'Gagal Menghapus Petugas';
                        $this->response($res, $status);
                    }
                }else{
                    $status = parent::HTTP_NOT_FOUND;
                    $res['msg'] = 'Email Tidak Di Temukan';
                    $res['status'] = $status;
                    $this->response($res, $status);
                }
            }catch(Exception $e){
                $status = parent::HTTP_INTERNAL_SERVER_ERROR;
                $res['msg'] = 'Something Wrong';
                $res['status'] = $status;
                $this->response($res, $status);
            }
        }
    }
    
    

    private function verify_request()
    {
        //get all the headers 
        try{
            $headers = $this->input->request_headers();
            $token   = $headers['X-API-KEY'];
            if(!$token) {
                $status = parent::HTTP_UNAUTHORIZED;
                $res    = ['status' => $status, 'msg' => 'Unauthorized access!'];
                $this->response($res, $status);
                return;
            }

            $data = AUTHORIZATION::validateToken($token);
            if($data === false){
                $status = parent::HTTP_UNAUTHORIZED;
                $res    = ['status' => $status, 'msg' => 'Unauthorized accesss'];
                $this->response($res, $status);
                exit();
            }else{
                return $data;
            }

        }catch(Exception $e){
            $status = parent::HTTP_UNAUTHORIZED;
            $res    = ['status' => $status, 'msg' => 'Unauthorized access!'];
            $this->response($res, $status);
        }
    }



}
