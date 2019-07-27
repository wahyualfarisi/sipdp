<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
use Restserver\Libraries\REST_Controller;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

class Pengadu extends REST_Controller {

    public function __construct($config = 'rest'){
        parent::__construct($config);
        $this->t_pengadu = 'tbl_user';
        $this->primary = 'id_terdaftar';
        $this->load->model('m_core');
        $this->load->helper(['jwt', 'authorization']);
        $this->token = $this->verify_request();
    }

    public function index_get()
    {
        if($this->token){
            try{
                $data   = $this->m_core->get_all($this->t_pengadu);
                $status = parent::HTTP_OK;
                $res['data'] = $data->result();
                $res['status'] = $status;
                $this->response($res, $status);
            }catch(Exception $e){
                $status = parent::HTTP_INTERNAL_SERVER_ERROR;
                $res['msg'] = 'something wrong';
                $res['status'] = $status;
                $this->response($res, $status);
            }
        }
    }

    public function nonactive_account_post()
    {
        if($this->token){
            $config = array(
                array(
                    'field' => 'email',
                    'label' => 'email',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Email Tidak Boleh Kosong'
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
                $where['email'] = $this->input->post('email');
                $data['status'] = 'false';

                $chek_email = $this->m_core->get_where($this->t_pengadu, $where);
                if($chek_email->num_rows() > 0){
                    $updateaccount = $this->m_core->update_table($this->t_pengadu, $data, $where );
                        if($updateaccount){
                            $status = parent::HTTP_OK;
                            $res['msg'] = 'Berhasil Meng NonAktifkan Pengadu';
                            $res['status'] = $status;
                            $this->response($res, $status);
                        }else{
                            $status = parent::HTTP_NOT_FOUND;
                            $res['msg'] = 'Terjadi Masalah';
                            $res['status'] = $status;
                            $this->response($res, $status);
                        }
                }else{
                    $status = parent::HTTP_NOT_FOUND;
                    $res['msg'] = 'Email Tidak Di temukan';
                    $res['status'] = $status;
                    $this->response($res, $status);
                }
            }catch(Exception $e){
                $status = parent::HTTP_INTERNAL_SERVER_ERROR;
                $res['msg'] = 'something wrong';
                $res['status'] = $status;
                $this->response($res, $status);
            }


        }
    }


    public function inactive_account_post()
    {
        if($this->token){
            $config = array(
                array(
                    'field' => 'email',
                    'label' => 'email',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Email Tidak Boleh Kosong'
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
                $where['email'] = $this->input->post('email');
                $data['status'] = 'true';

                $chek_email = $this->m_core->get_where($this->t_pengadu, $where);
                if($chek_email->num_rows() > 0){
                    $updateaccount = $this->m_core->update_table($this->t_pengadu, $data, $where );
                        if($updateaccount){
                            $status = parent::HTTP_OK;
                            $res['msg'] = 'Berhasil Mengaktifkan Akun Pengadu';
                            $res['status'] = $status;
                            $this->response($res, $status);
                        }else{
                            $status = parent::HTTP_NOT_FOUND;
                            $res['msg'] = 'Terjadi Masalah';
                            $res['status'] = $status;
                            $this->response($res, $status);
                        }
                }else{
                    $status = parent::HTTP_NOT_FOUND;
                    $res['msg'] = 'Email Tidak Di temukan';
                    $res['status'] = $status;
                    $this->response($res, $status);
                }
            }catch(Exception $e){
                $status = parent::HTTP_INTERNAL_SERVER_ERROR;
                $res['msg'] = 'something wrong';
                $res['status'] = $status;
                $this->response($res, $status);
            }


        }
    }

    public function index_delete($id = null)
    {   
        if($this->token){
           try{
             $where['id_terdaftar'] = $id;
             $check_id = $this->m_core->get_where($this->t_pengadu, $where );
             if($check_id->num_rows() > 0){
                 $delete = $this->m_core->delete_rows($this->t_pengadu, $where);
                 if($delete){
                     $status = parent::HTTP_OK;
                     $res['msg'] = 'Berhasil Megnhapus Pengadu';
                     $res['status'] = $status;
                     $this->response($res, $status);
                 }else{
                     $status = parent::HTTP_NOT_FOUND;
                     $res['msg'] = 'ID Tidak Di Temukan';
                     $res['status'] = $status;
                     $this->response($res , $status);
                 }
             }else{
                $status = parent::HTTP_NOT_FOUND;
                $res['msg'] = 'ID Tidak Di Temukan';
                $res['status'] = $status;
                $this->response($res , $status);
             }

           }catch(Exception $e){
                $status = parent::HTTP_INTERNAL_SERVER_ERROR;
                $res['msg'] = 'something wrong';
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