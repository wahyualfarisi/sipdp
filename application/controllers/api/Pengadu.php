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
                $query = "";
                if($this->input->get('query') )
                {
                    $query = $this->input->get('query');
                }
                $data   = $this->m_core->gettablesearch($query,  $this->t_pengadu, 'nama_depan');
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

    public function update_status_akun_post()
    {
        if($this->token)
        {
            try{
                $where_id = array(
                    'id_terdaftar' => $this->input->post('id_terdaftar')
                );
                $data_update = array(
                    'status' => $this->input->post('status_akun')
                );
                $update = $this->m_core->update_table($this->t_pengadu, $data_update, $where_id);
                if($update){
                    $status = parent::HTTP_OK;
                    $res['msg'] = 'Berhasil Merubah Status Akun';
                    $res['status'] = $status;
                    $this->response($res, $status);
                }else{
                    $status = parent::HTTP_BAD_REQUEST;
                    $res['msg'] = 'Gagal Update Akun';
                    $res['status'] = $status;
                    $this->response($res, $status);
                }
            }catch(Exception $e)
            {
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