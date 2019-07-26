<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Myapp extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->login = false;
        if($this->login == true){
            redirect(base_url('User/'));
        }
    }


    public function index()
    {
        $this->load->view('auth/v_login.html');
    }

    public function register()
    {
        $this->load->view('auth/v_registrasi.html');
    }

    public function verifications()
    {
        $this->load->view('users/pages/v_verifications.html');
    }

    public function petugas_login()
    {
        $this->load->view('auth/petugas/v_login.html');
    }

}