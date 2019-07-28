<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ketua extends CI_Controller {

    public function index()
    {
        $this->load->view('ketua/root.html');
    }

    public function dashboard()
    {
        $this->load->view('ketua/pages/v_dashboard.html');
    }

}