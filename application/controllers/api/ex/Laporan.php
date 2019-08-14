<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
use Restserver\Libraries\REST_Controller;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

class Laporan extends REST_Controller {

    public function __construct($config = 'rest'){
        parent::__construct($config);
        $this->load->model(['m_core','m_keputusan']);    
        $this->load->helper(['jwt', 'authorization']);
        $this->token = $this->verify_request();
    }

    public function index_get()
    {
        if($this->token)
        {
            try{
                $data = $this->m_core->get_all('tbl_laporan');
                $laporan = array();

                foreach($data->result() as $key)
                {
                    $json = array();

                    $json['no_laporan'] = $key->no_laporan;
                    $json['tgl_pembuatan'] = $key->tgl_pembuatan;

                    $json['laporan_detail'] = array();
                    

                    $where_laporan['no_laporan'] = $key->no_laporan;
                    $data_detail_laporan         = $this->m_core->get_where('tbl_detail_laporan', $where_laporan);

                    foreach($data_detail_laporan->result() as $key2)
                    {
                        $json_detail = array();
                        
                        $json_detail['no_surat_keputusan'] = $key2->no_surat_keputusan;
                        $json_detail['detail_surat'] = array();

                        $where_surat['no_surat_keputusan'] = $key2->no_surat_keputusan;
                        $data_surat = $this->m_core->get_where('tbl_surat_keputusan', $where_surat);


                        foreach($data_surat->result() as $key3)
                        {
                            $json_surat = array();
                            $json_surat['nomor_disposisi'] = $key3->nomor_disposisi;
                            $json_surat['lampiran'] = $key3->lampiran;
                            $json_surat['perihal']  = $key3->perihal;
                            $json_surat['isi_agenda'] = $key3->isi_agenda;
                            $json_surat['tgl_keputusan'] = $key3->tgl_keputusan;
                            $json_surat['status_surat'] = $key3->status_surat;

                            $json_detail['detail_surat'][] = $json_surat;
                        }

                    
                        $json['laporan_detail'][] = $json_detail;
                       
                    }

                    $laporan[] = $json;

                }
                $this->response(array('status' => parent::HTTP_OK, 'data' => $laporan));

            }catch(Exception $e){
                $status = parent::HTTP_INTERNAL_SERVER_ERROR;
                $res['status'] = $status;
                $res['msg']    = 'Internal Server Error';
                $this->response($res, $status);
            }
        }
    }

    public function index_post()
    {
        if(!$this->token)
            return $this->response(array('msg' => 'Authorized Denied'), parent::HTTP_BAD_REQUEST);
        
            $config = array(
                array(
                    'field' => 'tgl_pembuatan',
                    'label' => 'tgl_pembuatan',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'no_surat_keputusan[]',
                    'label' => 'no_surat_keputusan',
                    'rules' => 'required|trim'
                )
            );

            $this->form_validation->set_rules($config);
          
            if($this->form_validation->run() === FALSE) 
                return $this->response(array('errors' => $this->form_validation->error_array()), parent::HTTP_BAD_REQUEST);

            try{
                $no_laporan = $this->generateCodeLaporan();
                $data_laporan = array(
                    'no_laporan' => $no_laporan,
                    'tgl_pembuatan' => $this->input->post('tgl_pembuatan')
                );

                //insert data laporan
                $insert_laporan = $this->m_core->add_data('tbl_laporan', $data_laporan);
                     if(!$insert_laporan) return $this->response(array('msg' => 'Gagal Menambahkan Laporan', 'status' => parent::HTTP_BAD_REQUEST), parent::HTTP_BAD_REQUEST );


                //each surat keputusan and then insert to database
                $count = count($this->input->post('no_surat_keputusan')) ? count($this->input->post('no_surat_keputusan')) : 0 ;
               
                for($i = 0; $i<$count; $i++)
                {
                    $data_detail = array(
                        'no_laporan' => $no_laporan,
                        'no_surat_keputusan' => $this->input->post('no_surat_keputusan')[$i]
                    );
                    $this->m_core->add_data('tbl_detail_laporan', $data_detail);
                    $where['no_surat_keputusan'] = $data_detail['no_surat_keputusan'];
                    $final = $this->m_core->update_table('tbl_surat_keputusan', array('status_surat' => 'ya'), $where );
                }

                if(!$final) return $this->response(array('msg' => 'Gagal Menambahkan Laporan', 'status' => parent::HTTP_BAD_REQUEST), parent::HTTP_BAD_REQUEST );

                $status = parent::HTTP_OK;
                $res['status'] = $status;
                $res['msg']    = 'Berhasil Menambahkan Laporan';
                $this->response($res, $status);
                

            }catch(Exception $e){
                $status = parent::HTTP_INTERNAL_SERVER_ERROR;
                $res['status'] = $status;
                $res['msg']    = 'Internal Server Error';
                $this->response($res, $status);
            }
    }

    private function generateCodeLaporan()
    {
        $data   = $this->m_core->autoNumber('no_laporan', 'tbl_laporan');
        $kode   = $data->result()[0]->maxKode;
        $nourut = (int) substr($kode, 11, 11);
        $nourut++;
        
        $char  = date('Y').'-'.date('m').'/LAP';
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