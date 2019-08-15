<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
use Restserver\Libraries\REST_Controller;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

class Pengaduan extends REST_Controller {

    public function __construct($config = 'rest'){
        parent::__construct($config);
        $this->t_petugas = 'tbl_pengaduan';
        $this->primary = 'id_pengaduan';
        $this->load->model('m_core');
        $this->load->model('m_pengaduan');
        $this->load->helper(['jwt', 'authorization']);
        $this->token = $this->verify_request();
    }

    public function index_get()
    {
        if($this->token)
        {
            $data_token     = $this->token;
            if(isset($data_token->akses) )
            {
                try{
                    $query = '';
                    if($this->input->get('query') ){
                        $query = $this->input->get('query');
                    }
                    $data_pengaduan = $this->m_pengaduan->show_pengaduan($query);
                    $status = parent::HTTP_OK;
                    $res['data']   = $data_pengaduan->result();
                    $res['status'] = $status;
                    $this->response($res, $status);
                }catch(Exception $e){
                    $status = parent::HTTP_INTERNAL_SERVER_ERROR;
                    $res['msg'] = 'Server Bermasalah';
                    $res['status'] = $status;
                    $this->response($res, $status);
                }
            }else{
                $status = parent::HTTP_INTERNAL_SERVER_ERROR;
                $res['msg'] = 'Akses Tidak Di izinkan';
                $res['status'] = $status;
                $this->response($res, $status);
            }
        }
    }

    public function index_post()
    {

    }

    public function index_delete()
    {
        if(!$this->token) return $this->response(array('msg' => 'Authorized denied', 'status' => false ), parent::HTTP_BAD_REQUEST);

        if(!$this->input->get('id')) return $this->response(array('msg' => 'Parameter ID is required !', 'status' => false), parent::HTTP_BAD_REQUEST);

             $check_id = $this->m_core->get_where('tbl_pengaduan', array('id_pengaduan' => $this->input->get('id')) );
   
             if($check_id->num_rows() != 1) return $this->response(array('msg' => 'ID is not defined !', 'status' => false), parent::HTTP_BAD_REQUEST);

             try{
                $delete_pgd = $this->m_core->delete_rows('tbl_pengaduan', array('id_pengaduan' => $this->input->get('id')) );
                if(!$delete_pgd) return $this->response(array('msg' => 'Gagal Menghapus data pengaduan', 'status' => false), parent::HTTP_BAD_REQUEST);

                $this->response(array('msg' => 'Berhasil Menghapus Data Pengaduan', 'status' => true), parent::HTTP_OK);

             }catch(Exception $e){
                 $this->response(array('msg' => 'Internal Server Error', 'status' => false), parent::HTTP_BAD_REQUEST);
             }
    }

    public function getNotif_get()
    {
        //function to akses TU 
        if($this->token){
            $data  = $this->token;
            if($data->akses)
            {
                try{
                    $getPengaduanBaru = $this->m_pengaduan->get_notif_pengaduan_baru();
                    $status = parent::HTTP_OK;
                    $res['data']   = $getPengaduanBaru->result();
                    $res['jumlah'] = $getPengaduanBaru->num_rows();
                    $res['status'] = $status;
                    $this->response($res, $status);
                }catch(Exception $e){
                    $status = parent::HTTP_INTERNAL_SERVER_ERROR;
                    $res['msg'] = 'Server Bermasalah';
                    $res['status'] = $status;
                    $this->response($res, $status);
                }
            }else{
                $status = parent::HTTP_NOT_FOUND;
                $res['msg'] = 'Akses Tidak Sesuai';
                $res['status'] = $status;
                $this->response($res, $status);
            }
            
        }
    }

    public function requestBuktiPengaduan_get()
    {
        if($this->token){
            $data = $this->token;
            if($data)
            {
                if($this->get('id') ){
                    try{
                        $data_bukti_lampiran   = $this->m_core->get_where('tbl_bukti_pengaduan', array('id_pengaduan' => $this->get('id')) );
                        $status = parent::HTTP_OK;
                        $res['data'] = $data_bukti_lampiran->result();
                        $res['status'] = $status;
                        $this->response($res, $status);
                    }catch(Exception $e){
                        $status = parent::HTTP_INTERNAL_SERVER_ERROR;
                        $res['msg'] = 'Server Bermasalah';
                        $res['status'] = $status;
                        $this->response($res, $status);
                    }
                }
                
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