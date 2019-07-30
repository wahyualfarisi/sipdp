<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
use Restserver\Libraries\REST_Controller;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

class Disposisi extends REST_Controller {

    public function __construct($config = 'rest'){
        parent::__construct($config);
        $this->t_disposisi     = 'tbl_disposisi';
        $this->primary         = 'nomor_disposisi';

        $this->t_pengaduan     = 'tbl_pengaduan';
        $this->t_pengaduan_pri = 'id_pengaduan';

        $this->load->model('m_core');
        $this->load->model('m_disposisi');
        $this->load->helper(['jwt', 'authorization']);
        $this->token = $this->verify_request();
    }

    public function index_get()
    {
        if($this->token){
            $data = $this->token;
            if($data->akses){
                try{
                    $query = '';
                    if($this->input->get('query') ){
                        $query = $this->input->get('query');
                    }
                    $data_disposisi = $this->m_disposisi->show_disposisi($query);
                    $status = parent::HTTP_OK;
                    $res['status']  = $status;
                    $res['data']    = $data_disposisi->result();
                    $this->response($res, $status);
                }catch(Exception $e){
                    $status        = parent::HTTP_INTERNAL_SERVER_ERROR;
                    $res['msg']    = 'Server Bermasalah';
                    $res['status'] = $status;
                    $this->response($res, $status);
                }
            }
        }
    }

    public function index_post()
    {
        if($this->token){
           try{
            $data = $this->token;
            $config = array(
                array(
                    'field' => 'id_pengaduan',
                    'label' => 'id_pengaduan',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'ID Pengaduan Tidak Boleh Kosong'
                    )
                ),
                array(
                    'field' => 'id_petugas',
                    'label' => 'id_petugas',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'ID Petugas Harus Diisi'
                    )
                    ),
                array(
                    'field' => 'jenis_tugas',
                    'label' => 'jenis_tugas',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Jenis Tugas Tidak Boleh Kosong'
                    )
                    ),
                array(
                    'field' => 'catatan_disposisi',
                    'label' => 'catatan_disposisi',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Catatan Disposisi Tidak Boleh Kosong'
                    )
                    )
            );
            $this->form_validation->set_rules($config);
            if($this->form_validation->run() === FALSE){
                $errors = $this->form_validation->error_array();
                $status = parent::HTTP_BAD_REQUEST;
                $res['errors'] = $errors;
                $res['status'] = $status;
                $this->response($res, $status);
                return;
            }

            $data_disposisi = array(
                'nomor_disposisi'   => $this->generateCodeDisposisi(),
                'id_pengaduan'      => $this->input->post('id_pengaduan'),
                'tgl_disposisi'     => date('Y-m-d'),
                'id_petugas'        => $this->input->post('id_petugas'),
                'jenis_tugas'       => $this->input->post('jenis_tugas'),
                'catatan_disposisi' => $this->input->post('catatan_disposisi'),
                'status_disposisi'  => 'proses',
                'email_petugas'     => $data->email
            );

            $create_disposisi = $this->m_core->add_data($this->t_disposisi, $data_disposisi);
            if($create_disposisi){
                $where_update = array(
                    $this->t_pengaduan_pri => $data_disposisi['id_pengaduan']
                );
                $data_update  = array(
                    'status_pengaduan' => 'diterima',
                    'deskripsi_status' => 'Permohonan Pengaduan Di terima, dan akan di tindak lanjuti',
                    'dilihat'          => 'belum'
                );
                $update_status_pengaduan = $this->m_core->update_table($this->t_pengaduan, $data_update, $where_update );
                    if($update_status_pengaduan){
                        $status = parent::HTTP_OK;
                        $res['msg']  = 'Berhasil Membuat Disposisi';
                        $res['data'] = $data_disposisi;
                        $res['status'] = $status;
                        $this->response($res, $status);
                    }else{
                        $status = parent::HTTP_INTERNAL_SERVER_ERROR;
                        $res['msg'] = 'Server Bermasalah';
                        $res['status'] = $status;
                        $this->response($res, $status);
                    }
            }else{
                $status = parent::HTTP_INTERNAL_SERVER_ERROR;
                $res['msg'] = 'Server Bermasalah';
                $res['status'] = $status;
                $this->response($res, $status);
            }
        
           }catch(Exception $e){
            $status = parent::HTTP_INTERNAL_SERVER_ERROR;
            $res['msg'] = 'Server Bermasalah';
            $res['status'] = $status;
            $this->response($res, $status);
           }
        }
    }

    public function show_jenis_tugas_get()
    {
        if($this->token){
            try{
                $data          = $this->token;
                $jenis_tugas   = $this->m_disposisi->get_jenistugas();
                $status        = parent::HTTP_OK;
                $res['data']   = $jenis_tugas;
                $res['status'] = $status;
                $this->response($res, $status);
            }catch(Exception $e){
                $status        = parent::HTTP_INTERNAL_SERVER_ERROR;
                $res['msg']    = 'Server Bermasalah';
                $res['status'] = $status;
                $this->response($res, $status);
            }   
        }
    }

    public function show_disposisi_proses_get()
    {
        if($this->token){
            try{
                $data_disposisi = $this->m_disposisi->show_disposisi_by_status('proses');
                $status         = parent::HTTP_OK;
                $res['status']  = $status;
                $res['data']    = $data_disposisi->result();
                $res['jumlah']  = $data_disposisi->num_rows();
                $this->response($res, $status);
            }catch(Exception $e){
                $status        = parent::HTTP_INTERNAL_SERVER_ERROR;
                $res['msg']    = 'Server Bermasalah';
                $res['status'] = $status;
                $this->response($res, $status);
            }
        }
    }

    public function show_disposisi_tindaklanjuti_get()
    {
        if($this->token)
        {
            try{
                $data_disposisi = $this->m_disposisi->show_disposisi_by_status('tindaklanjuti');
                $status         = parent::HTTP_OK;
                $res['status']  = $status;
                $res['data']    = $data_disposisi->result();
                $res['jumlah']  = $data_disposisi->num_rows();
                $this->response($res, $status);
            }catch(Exception $e)
            {
                $status        = parent::HTTP_INTERNAL_SERVER_ERROR;
                $res['msg']    = 'Server Bermasalah';
                $res['status'] = $status;
                $this->response($res, $status);
            }
        }
    }

    public function tindak_lanjut_disposisi_post()
    {
        if($this->token)
        {
            try{
                
                $config = array(
                    array(
                        'field' => 'nomor_disposisi',
                        'label' => 'nomor_disposisi',
                        'rules' => 'required',
                        'errors' => array(
                            'required' => 'Nomor Disposisi Tidak Boleh Kosong'
                        )
                        ),
                    array(
                        'field' => 'id_pengaduan',
                        'label' => 'id_pengaduan',
                        'rules' => 'required',
                        'errors' => array(
                            'required' => 'ID Pengaduan Tidak Boleh Kosong'
                        )
                    )
                );
                $this->form_validation->set_rules($config);
                if($this->form_validation->run() === FALSE)
                {
                    $errors['erros'] = $this->form_validation->error_array();
                    $status = parent::HTTP_BAD_REQUEST;
                    $this->response($errors, $status);
                    return;
                }
                //update tbl disposisi ---------------------------
                $data_update_disposisi = array('status_disposisi' => 'tindaklanjuti' );
                $where_update_disposisi = array('nomor_disposisi' => $this->input->post('nomor_disposisi'));
                $update_disposisi = $this->m_core->update_table($this->t_disposisi, $data_update_disposisi, $where_update_disposisi );
                //-------------------------------------------------

                    if($update_disposisi)
                    {
                        //update table pengaduan ------------------------
                        $where_update_pengaduan = array('id_pengaduan' => $this->input->post('id_pengaduan'));
                        $data_update_pengaduan = array(
                            'status_pengaduan' => 'proses',
                            'deskripsi_status' => 'Pengaduan Sedang Di Tindak Lanjuti'
                        );
                        $update_pengaduan = $this->m_core->update_table($this->t_pengaduan, $data_update_pengaduan, $where_update_pengaduan);
                        //------------------------------------------------

                            if($update_pengaduan){
                                $status = parent::HTTP_OK;
                                $res['status'] = $status;
                                $res['msg']    = 'Berhasil Melakukan Disposisi';
                                $this->response($res, $status);
                            }else{
                                $status        = parent::HTTP_INTERNAL_SERVER_ERROR;
                                $res['msg']    = 'Server Bermasalah';
                                $res['status'] = $status;
                                $this->response($res, $status);
                            }

                    }else{
                        $status        = parent::HTTP_INTERNAL_SERVER_ERROR;
                        $res['msg']    = 'Server Bermasalah';
                        $res['status'] = $status;
                        $this->response($res, $status);
                    }


            }catch(Exception $e)
            {
                $status        = parent::HTTP_INTERNAL_SERVER_ERROR;
                $res['msg']    = 'Server Bermasalah';
                $res['status'] = $status;
                $this->response($res, $status);
            }
        }
    }


    private function generateCodeDisposisi()
    {
        $data   = $this->m_core->autoNumber($this->primary, $this->t_disposisi);
        $kode   = $data->result()[0]->maxKode;
        $nourut = (int) substr($kode, 11, 11);
        $nourut++;
        
        $char  = 'DSP-'.date('Y').'-'.date('m');
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