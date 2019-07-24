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
            $data = $this->m_core->get_all($this->t_penugasan);
            $this->response(array(
                'data' => $data->result()
            ), parent::HTTP_OK);
        }else{
            $this->response(array(
                'msg' => 'No Authorize Denied'
            ), parent::HTTP_UNAUTHORIZED);
        }
    }


    public function index_post()
    {

    }

    public function index_delete()
    {

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