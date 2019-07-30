<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
use Restserver\Libraries\REST_Controller;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

class Dashboard extends REST_Controller {

    public function __construct($config = 'rest'){
        parent::__construct($config);
        $this->load->model('m_core');
        $this->load->model('m_dashboard');
        $this->load->helper(['jwt', 'authorization']);
        $this->token = $this->verify_request();
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

    public function count_pengaduan_status_get()
    {
        if($this->token)
        {
            try{
                $data_pengaduan = $this->m_dashboard->count_pengaduan_status();
                $status = parent::HTTP_OK;
                $res['status'] = $status;
                $res['data']   = $data_pengaduan->result();
                $this->response($res, $status);
            }catch(Exception $e)
            {
                $status        = parent::HTTP_INTERNAL_SERVER_ERROR;
                $res['msg']    = 'Server Bermasalah';
                $res['status'] = $status;
                $this->response($res, $status);
            }
        }
    }

    public function count_disposisi_status_get()
    {
        if($this->token)
        {
            try{
                $data_disposisi = $this->m_dashboard->count_disposisi_status();
                $status = parent::HTTP_OK;
                $res['status'] = $status;
                $res['data']   = $data_disposisi->result();
                $this->response($res, $status);
            }catch(Exception $e)
            {
                $status        = parent::HTTP_INTERNAL_SERVER_ERROR;
                $res['msg']    = 'Server Bermasalah';
                $res['status'] = $status;
                $this->response($res, $status);
            }
        }
    }

}