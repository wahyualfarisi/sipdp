<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
       $this->load->view('users/root.html');
    }

    public function dashboard()
    {
        $this->load->view('users/pages/v_dashboard.html');
    }

    public function profile()
    {
        $this->load->view('users/pages/v_profile.html');
    }

    public function buatpengaduan()
    {
        $this->load->view('users/pages/v_buat_pengaduan.html');
    }

    public function listpengaduan()
    {
        $this->load->view('users/pages/v_list_pengaduan.html');
    }

    public function listkeputusan()
    {
        $this->load->view('users/pages/v_list_keputusan.html');
    }

   
}
