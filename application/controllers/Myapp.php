<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Myapp extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->login = true;
        if($this->login == true){
            redirect(base_url('User/'));
        }
    }


    public function index()
    {
        echo "hallo";
    }
}