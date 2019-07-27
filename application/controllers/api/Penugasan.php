<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
use Restserver\Libraries\REST_Controller;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

class Penugasan extends REST_Controller {

    public function __construct($config = 'rest'){
        parent::__construct($config);
        $this->t_penugasan = 'tbl_penugasan';
        $this->primary = 'id_petugas';
        $this->load->model('m_core');
        $this->load->helper(['jwt', 'authorization']);
    }

    public function index_get()
    {
        $token = $this->verify_request();
        if(count($token) > 0){
            $status = parent::HTTP_OK;
            $query = "";
            if($this->input->get('query') ){
                $query = $this->input->get('query');
            }
            $data = $this->m_core->gettablesearch($query, $this->t_penugasan, 'bagian');
            $this->response(array(
                'data' => $data->result(),
                'status' => $status
            ), $status );
        }else{
            $this->response(array(
                'msg' => 'No Authorize Denied'
            ), parent::HTTP_UNAUTHORIZED);
        }
    }


    public function index_post()
    {
        $token = $this->verify_request();
        if($token){
            $config = array(
                array(
                    'field' => 'bagian',
                    'label' => 'bagian',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Bagian must be fill'
                    )
                )
            );
            $this->form_validation->set_rules($config);
            if($this->form_validation->run() === FALSE){
                $errors = array(
                    'errors' => $this->form_validation->error_array()
                );
                $status = parent::HTTP_BAD_REQUEST;
                $this->response($errors, $status);
                return;   
            }
            
            try{
                $body = array(
                    'bagian' => $this->input->post('bagian')
                );
                $insert = $this->m_core->add_data($this->t_penugasan, $body);
                $status = parent::HTTP_OK;
                $res = array(
                    'msg' => 'Berhasil Menambahkan Data Pengugasan',
                    'status' => $status
                );
                $this->response($res, $status);
            }catch(Exception $e){
                $status = parent::HTTP_BAD_REQUEST;
                $res    = array('msg' => 'Gagal Menambahkan Data Penugasan', 'status' => $status);
                $this->response($res, $status);
            }
        }
    }

    public function index_delete($id)
    {
        $token = $this->verify_request();
        if($token){
            try{
                $delete = $this->m_core->delete_rows($this->t_penugasan, array('id_petugas' => $id) );
                $status = parent::HTTP_OK;
                $res    = array(
                    'msg' => 'Data Penugasan Berhasil Di Hapus',
                    'status' => $status
                );
                $this->response($res, $status);
            }catch(Exception $e){
                $status = parent::HTTP_BAD_REQUEST;
                $res    = array(
                    'msg'    => 'Terjadi Masalah',
                    'status' => $status
                );
                $this->response($res, $status);
            }
        } 
    }

    public function update_post()
    {
        $token = $this->verify_request();
        if($token){
            $config = array(
                array(
                    'field' => 'id_petugas',
                    'label' => 'id_petugas',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'ID Petugas is required'
                    )
                ),
                array(
                    'field' => 'bagian',
                    'label' => 'bagian',
                    'rules' => 'required|trim',
                    'errors' => array(
                        'required' => 'Bagian is requried'
                    )
                )
            );

            $this->form_validation->set_rules($config);
            if($this->form_validation->run() === FALSE){
                $errors = array(
                    'errors' => $this->form_validation->error_array()
                );
                $status = parent::HTTP_BAD_REQUEST;
                $this->response($errors, $status);
                return;
            }


            try{
                $data = array(
                    'bagian' => $this->post('bagian')
                );
                $where = array(
                    'id_petugas' => $this->post('id_petugas')
                );

                $update = $this->m_core->update_table($this->t_penugasan, $data ,$where);
                $status = parent::HTTP_OK;
                $res['bagian'] = $data['bagian'];
                $res['msg']    = 'Berhasil Di Update';
                $res['status'] = $status;
                $this->response($res, $status);

            }catch(Exception $e){
                $status = parent::HTTP_UNAUTHORIZED;
                $res    = ['status' => $status, 'msg' => 'Unauthorized access!'];
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