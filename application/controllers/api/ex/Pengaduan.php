<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
use Restserver\Libraries\REST_Controller;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

class Pengaduan extends REST_Controller {

    public function __construct($config = 'rest'){
        parent::__construct($config);
        $this->t_pengaduan = 'tbl_pengaduan';
        $this->primary = 'id_pengaduan';
        $this->load->model('m_core');
        $this->load->model('m_pengaduan');
        $this->load->helper(['jwt', 'authorization']);
        $this->token = $this->verify_request();
    }

    public function index_post()
    {
        if($this->token){
            $data = $this->token;

            $config = array(
                array(
                    'field' => 'nama_perusahaan',
                    'label' => 'nama_perusahaan',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Nama Perusahaan Tidak Boleh Kosong'
                    )
                    ),
                array(
                    'field' => 'judul_berita',
                    'label' => 'judul_berita',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Judul Berita Tidak Boleh kosong'
                    )
                    ),
                array(
                    'field' => 'edisi_penerbitan',
                    'label' => 'edisi_penerbitan',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Edisi penerbitan tidak boleh kosong'
                    )
                    ),
                array(
                    'field' => 'catatan',
                    'label' => 'catatan',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Catatan Tidak Boleh Kosong'
                    )
                )
            );

            if(!empty($this->input->post('lampiran')) ){
                $this->form_validation->set_rules('lampiran[]', 'Lampiran', 'required');
            }
            $this->form_validation->set_rules($config);
            if($this->form_validation->run() === FALSE){
                $errors['errors'] = $this->form_validation->error_array();
                $status = parent::HTTP_BAD_REQUEST;
                $this->response($errors, $status);
                return;
            }

            try{
                $id_pengaduan = $this->generateCodePengaduan();
                $count = count($_FILES['lampiran']['name']) ? count($_FILES['lampiran']['name']) : 0;

                $data_pengaduan = array(
                    'id_pengaduan' => $id_pengaduan,
                    'id_terdaftar' => $data->payload[0]->id_terdaftar,
                    'nama_perusahaan_pers' => $this->input->post('nama_perusahaan'),
                    'judul_berita' => $this->input->post('judul_berita'),
                    'edisi_penerbitan' => $this->input->post('edisi_penerbitan'),
                    'catatan' => $this->input->post('catatan'),
                    'status_pengaduan' => 'terkirim',
                    'deskripsi_status' => 'Permohonan Pengaduan Terkirim'
                );
                $insert = $this->m_core->add_data($this->t_pengaduan, $data_pengaduan);
                
                if($insert){
                    for($i = 0; $i<$count; $i++)
                        {
                            if(!empty($_FILES['lampiran']['name'][$i]) ){

                                $_FILES['file']['name']     = $_FILES['lampiran']['name'][$i];
                                $_FILES['file']['type']     = $_FILES['lampiran']['type'][$i];
                                $_FILES['file']['tmp_name'] = $_FILES['lampiran']['tmp_name'][$i];
                                $_FILES['file']['error']    = $_FILES['lampiran']['error'][$i];
                                $_FILES['file']['size']      = $_FILES['lampiran']['size'][$i];

                                $config['upload_path']      = './lampiran/'; 
                                $config['allowed_types']    = 'gif|jpg|png|jpeg|bmp';
                                $config['encrypt_name']     = TRUE;
                                $config['file_name']        = $_FILES['lampiran']['name'][$i];
                                $this->load->library('upload',$config);

                                if($this->upload->do_upload('file') ){
                                  $uploadfile = $this->upload->data();
                                  $data_lampiran = array(
                                    'id_pengaduan' => $id_pengaduan,
                                    'bukti_pengaduan' => $uploadfile['file_name']
                                  );   
                                  $upload_bukti = $this->db->insert('tbl_bukti_pengaduan', $data_lampiran);                              
                                }
                            }
                        }
                        if($upload_bukti){
                            $status = parent::HTTP_OK;
                            $res['msg'] = 'Berhasil Menambahkan Pengaduan';
                            $res['status'] = $status;
                            $this->response($res, $status);
                        }else{
                            $status = parent::HTTP_BAD_REQUEST;
                            $res['msg'] = 'Gagal Menambahkan Pengaduan';
                            $res['status'] = $status;
                            $this->response($res, $status);
                        }
                }else{
                    $status = parent::HTTP_BAD_REQUEST;
                    $res['msg'] = 'Gagal Menambahkan Pengaduan';
                    $res['status'] = $status;
                    $this->response($res, $status);
                 }
            }catch(Exception $e){
                $status = parent::HTTP_INTERNAL_SERVER_ERROR;
                $res['msg'] = 'something wrong';
                $res['status'] = $status;
                $this->response($res, $status);
            }
        }
    }

    public function index_get()
    {
        if($this->token)
        {
            $data = $this->token;
            try{
                $yourID = $data->payload[0]->id_terdaftar;
                $query  = '';
                        if($this->input->get('query') )
                        {
                            $query = $this->input->get('query');
                        }
                        $data_pengaduan      = $this->m_pengaduan->show_pengaduan_user($yourID, $query);
                        $status              = parent::HTTP_OK;
                        $res['status']       = $status;
                        $res['jumlah']       = $data_pengaduan->num_rows();
                        $res['id_terdaftar'] = $yourID;
                        $res['data']         = $data_pengaduan->result();
                        $this->response($res, $status);
            }catch(Exception $e){
                        $status = parent::HTTP_INTERNAL_SERVER_ERROR;
                        $res['msg'] = 'something wrong';
                        $res['status'] = $status;
                        $this->response($res, $status);
            }
        }
    }

    public function showNotifPengaduan_get()
    {
        if($this->token)
        {
            try{
                $data     = $this->token;
                $yourID   = $data->payload[0]->id_terdaftar;
                $getNotif = $this->m_pengaduan->get_unread_pengaduan_user($yourID);
                $status   = parent::HTTP_OK;
                $res['data']   = $getNotif->result();
                $res['jumlah'] = $getNotif->num_rows();
                $res['status'] = $status;
                $this->response($res, $status);
            }catch(Exception $e)
            {
                $status = parent::HTTP_INTERNAL_SERVER_ERROR;
                $res['msg'] = 'something wrong';
                $res['status'] = $status;
                $this->response($res, $status);
            }
        }
    }

    

    private function generateCodePengaduan()
    {
        $data   = $this->m_core->autoNumber($this->primary, $this->t_pengaduan);
        $kode   = $data->result()[0]->maxKode;
        $nourut = (int) substr($kode, 11, 11);
        $nourut++;
        
        $char  = date('Y').'-'.date('m').'/PGD';
        $newID = $char . sprintf('%05s', $nourut);
        return $newID;
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