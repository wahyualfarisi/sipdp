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
}
