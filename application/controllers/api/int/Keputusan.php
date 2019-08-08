<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
use Restserver\Libraries\REST_Controller;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

class Keputusan extends REST_Controller {

    public function __construct($config = 'rest'){
        parent::__construct($config);

        $this->t_keputusan     = 'tbl_surat_keputusan';
        $this->t_keputusan_pri = 'no_surat_keputusan';

        $this->load->model('m_core');
        $this->load->model('m_keputusan');
        $this->load->helper(['jwt', 'authorization']);
        $this->token = $this->verify_request();
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

    public function index_post()
    {
        if($this->token)
        {
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
                ),
                array(
                    'field' => 'lampiran',
                    'label' => 'lampiran',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Lampiran Tidak Boleh Kosong'
                    )
                    ),
                array(
                    'field' => 'perihal',
                    'label' => 'perihal',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Perihal Tidak Boleh Kosong'
                    )
                    ),
                array(
                    'field' => 'isi_agenda', 
                    'label' => 'isi_agenda',
                    'rules' => 'required',
                    'errors' => array(
                        'required' => 'Isi Agenda Tidak Boleh Kosong'
                    )
                    )
            );
            $this->form_validation->set_rules($config);
            if($this->form_validation->run() === FALSE )
            {
                $errors = $this->form_validation->error_array();
                $status = parent::HTTP_BAD_REQUEST;
                $res['errors'] = $errors;
                $res['status'] = $status;
                $this->response($res, $status);
                return;
            }

            try{
                $data_keputusan = array(
                    'no_surat_keputusan' => $this->generateCodeKeputusan(),
                    'nomor_disposisi'    => $this->input->post('nomor_disposisi'),
                    'lampiran'           => $this->input->post('lampiran'),
                    'perihal'            => $this->input->post('perihal'),
                    'isi_agenda'         => $this->input->post('isi_agenda'),
                    'tgl_keputusan'      => date('Y-m-d')
                );
                $buatKeputusan = $this->m_core->add_data($this->t_keputusan, $data_keputusan);
                if($buatKeputusan)
                {
                    //update status tbl disposisi 
                    $data_update_disposisi['status_disposisi'] = 'selesai';
                    $where_update_disposisi['nomor_disposisi'] = $data_keputusan['nomor_disposisi'];
                    $update_status_disposisi = $this->m_core->update_table('tbl_disposisi', $data_update_disposisi, $where_update_disposisi);

                        if($update_status_disposisi)
                        {
                            $data_update_pengaduan['status_pengaduan'] = 'selesai';
                            $data_update_pengaduan['deskripsi_status'] = 'Pengaduan Telah Selesai';
                            $where_update_pengaduan['id_pengaduan']    = $this->input->post('id_pengaduan');

                            $update_pengaduan = $this->m_core->update_table('tbl_pengaduan', $data_update_pengaduan, $where_update_pengaduan);

                            if($update_pengaduan)
                            {
                              $status = parent::HTTP_OK;
                              $res['status'] = $status;
                              $res['msg']    = 'Berhasil Membuat Keputusan';
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

    public function index_get()
    {
        if($this->token){
            try{
                $query = '';
                $from  = '1990-01-01';
                $to    = date('Y-m-d');
                
                if($this->input->get('query') ){
                    $query = $this->input->get('query');
                }else if($this->input->get('from') && $this->input->get('to') ){
                    $from = $this->input->get('from');
                    $to = $this->input->get('to');
                }
                /**
                 *search berdasarkan nama depan
                 *berdasrakan from adnd to
                 */
                $data = $this->m_keputusan->show_keputusan($query, $from, $to);
                $status = parent::HTTP_OK;
                $res['data'] = $data->result();
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

    private function generateCodeKeputusan()
    {
        $data   = $this->m_core->autoNumber($this->t_keputusan_pri, $this->t_keputusan);
        $kode   = $data->result()[0]->maxKode;
        $nourut = (int) substr($kode, 15, 15);
        $nourut++;
        
        $char  = 'SRT/KEP/'.date('Y').'-'.date('m');
        $newID = $char . sprintf('%03s', $nourut);
        return $newID;
    }


}