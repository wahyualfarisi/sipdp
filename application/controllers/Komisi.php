<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Komisi extends CI_Controller {

    public function index()
    {
        $this->load->view('komisi/root.html');
    }

}