<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

class Users extends REST_Controller {

    function __construct()
    {
        parent::__construct();
        header("Access-Control-Allow-Origin: *");
        $this->token = $this->input->get_request_header('X-API-KEY', TRUE);
        // $this->where = array('token' => $this->get_request_header('X-API-KEY', TRUE) );
    }

    function users_get()
    {
         $VERIFY = '123456';
        

        if($this->token === $VERIFY){
            $this->response(array('msg' => 'getusers'), REST_Controller::HTTP_OK);
        }
        
    }


}