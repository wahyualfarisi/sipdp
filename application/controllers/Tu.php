<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tu extends CI_Controller {

    public function index()
    {
        $this->load->view('tu/root.html');
    }

}