<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
use Restserver\Libraries\REST_Controller;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

class Auth extends REST_Controller {

    public function __construct($config = 'rest'){
        parent::__construct($config);
        $this->t_user    = 'tbl_user';
        $this->t_petugas = 'tbl_petugas';

        $this->load->model('m_core');
        $this->load->helper(['jwt','authorization']);
        $this->load->helper('valid_form');
    }


    public function login_users_post()
    {
        $email    = $this->input->post('email');
        $password = $this->input->post('password');


        $where = array(
            'email' => $email,
            'password' => $password
        );

        $config = array(
            array(
                'field' => 'email',
                'label' => 'email',
                'rules' => 'required|valid_email|trim',
                'errors' => array(
                    'valid_email' => 'Email Tidak Valid',
                    'required'    => 'Email Tidak Boleh Kosong'
                )
            ),
            array(
                'field' => 'password',
                'label' => 'password',
                'rules' => 'required',
                'errors' => array(
                    'required' => 'Password Tidak Boleh Kosong'
                )
            )
        );

        $this->form_validation->set_rules($config);

        if($this->form_validation->run() === FALSE){
            $errors = $this->form_validation->error_array();
            $this->response(array(
                'errors' => $errors
            ), parent::HTTP_BAD_REQUEST);
            return;
        }

        

        $check_account = $this->m_core->get_where($this->t_user, $where);
        if($check_account->num_rows() === 1){

            if($check_account->result()[0]->status === 'false'){
                $status = parent::HTTP_CONFLICT;
                $res['msg'] = 'Maaf, Akun anda Di nonaktifkan';
                $res['status'] = $status;
                $this->response($res, $status);
                return;
            }


            $token = AUTHORIZATION::generateToken(array(
                'payload' => $check_account->result()
            ));

            $status = parent::HTTP_OK;
            $respose = ['status' => $status, 'token' => $token];
            $this->response($respose, $status);
        }else{
            $this->response(array(
                'msg' => 'Invalid Username and password'
            ), parent::HTTP_NOT_FOUND);
        }
    }

    public function login_petugas_post()
    {
        $email    = $this->input->post('email');
        $password = $this->input->post('password');
        $akses    = $this->input->post('akses');

        $where_login = array(
            'email_petugas' => $email,
            'password' => $password,
            'akses' => $akses
        );

        /**
         * cek email and password if empty
         */

        if(empty($email) || empty($password) || empty($akses) ){
            $this->response(array(
                'msg' => 'Email, Password , dan akses Tidak Boleh Kosong'
            ), parent::HTTP_NOT_FOUND);
            return;
        }

        /**
         *  cek to database if email anda password exists 
         */
        $cek = $this->m_core->get_where('tbl_petugas', $where_login);
        
        if($cek->num_rows() === 1){

            foreach($cek->result() as $k)
            {
                    $token = array(
                        'email'        => $k->email_petugas,
                        'nama_lengkap' => $k->nama_depan.' '.$k->nama_belakang,
                        'akses'        => $k->akses,
                    );

                    $generateToken = AUTHORIZATION::generateToken($token);

                    $status        = parent::HTTP_OK;

                    $this->response(array(
                        'status' => $status,
                        'token'  => $generateToken,
                        'akses'   => $akses
                    ));
            }    
        }else{
            $status = parent::HTTP_NOT_FOUND;
            $this->response(array(
                'msg'    => 'Email Dan Password Tidak Terdaftar',
                'status' => $cek->num_rows()
            ), $status);

        }

    }

    public function register_post()
    {
        $id_terdaftar  = $this->generateIdTerdaftar();
        $email         = $this->input->post('email');
        $password      = $this->input->post('password');
        $alamat        = $this->input->post('alamat');
        $nama_depan    = $this->input->post('nama_depan');
        $nama_belakang = $this->input->post('nama_belakang');
        $tgl_terdaftar = $this->input->post('tgl_terdaftar');
        

        $config = array(
            array(
                'field' => 'email',
                'label' => 'email',
                'rules' => 'required|valid_email|trim',
                'errors' => array(
                    'valid_email' => 'Email Tidak Valid',
                    'required' => 'Email Tidak Boleh Kosong'
                )
            ),
            array(
                'field' => 'password',
                'label' => 'password',
                'rules' => 'required',
                'errors' => array(
                    'required' => 'Password Harus Diisi'
                )
            ),
            array(
                'field' => 'alamat',
                'label' => 'alamat',
                'rules' => 'required',
                'errors' => array(
                    'required' => 'Alamat Tidak Boleh Kosong'
                )
            ) ,
            array(
                'field' => 'nama_depan',
                'label' => 'nama_depan',
                'rules' => 'required',
                'errors' => array(
                    'required' => 'Nama Depan Tidak Boleh Kosong'
                )
            ),

        );

        $this->form_validation->set_rules($config);

        if($this->form_validation->run() === FALSE){
            $erros  = $this->form_validation->error_array();
            $this->response(array(
                'errors' => $erros
            ), parent::HTTP_BAD_REQUEST);

        }else{

            $data = array(
                'id_terdaftar' => $id_terdaftar,
                'email' => $email,
                'password' => $password,
                'alamat' => $password,
                'nama_depan' => $nama_depan,
                'nama_belakang' => $nama_belakang,
                'tgl_terdaftar' => date('Y-m-d'),
                'status' => 'false'
            );

            $check_email = $this->m_core->get_where($this->t_user, array('email' => $email) );

            if($check_email->num_rows() > 0){
                $status = parent::HTTP_BAD_REQUEST;
                $this->response(array(
                    'msg' => 'Email Sudah Di gunakan',
                    'status' => $status
                ), $status );
                return;
            }


            $sendingemail =  $this->sending_email_verification($email, $id_terdaftar);

            if($sendingemail){
                $status = parent::HTTP_OK;
                $this->response(array(
                    'msg' => 'Kode Verifikasi Berhasil Dikirim',
                    'status' => $status,
                    'data' => $data 
                ),$status);
            }else{
                $status = parent::HTTP_BAD_REQUEST;
                $this->response(array(
                    'msg' => 'Email Gagal Dikirim',
                    'status' => $status
                ),$status);
            }

           
        }
    }

    function sending_email_verification($email, $code)
    {
         // prosess kirim email
        $config = [
            'useragent' => 'CodeIgniter',
            'protocol'  => 'smtp',
            'mailpath'  => '/usr/sbin/sendmail',
            'smtp_host' => 'ssl://smtp.gmail.com',
            'smtp_user' => 'pengaduanwartawan@gmail.com',   // Ganti dengan email gmail Anda.
            'smtp_pass' => 'wartawan123',             // Password gmail Anda.
            'smtp_port' => 465,
            'smtp_keepalive' => TRUE,
            'smtp_crypto' => 'SSL',
            'wordwrap'  => TRUE,
            'wrapchars' => 80,
            'mailtype'  => 'html',
            'charset'   => 'utf-8',
            'validate'  => TRUE,
            'crlf'      => "\r\n",
            'newline'   => "\r\n",
        ];

            $this->load->library('email', $config);
            $this->email->initialize($config);
            $this->email->to($email);
            $this->email->from('pengaduanwartawan@gmail.com','Pengaduan Wartawan | Dewan Pers');
            $this->email->subject('Kode Konfirmasi');
            $this->email->message('Silahkan Konfirmasi code ini '. $code);

            if($this->email->send() )
            {
                return 1;
            }else{
                return 0;
            }

    }

    public function insertnewusers_post()
    {
        $data = array(
            'id_terdaftar' => $this->input->post('id_terdaftar'),
            'email' => $this->input->post('email'),
            'password' => $this->input->post('password'),
            'alamat' => $this->input->post('alamat'),
            'nama_depan' => $this->input->post('nama_depan'),
            'nama_belakang' => $this->input->post('nama_belakang'),
            'tgl_terdaftar' => date('Y-m-d'),
            'status' => 'true'
        );

         $insert = $this->m_core->add_data($this->t_user, $data);

        if($insert){
            $status = parent::HTTP_OK;
            $this->response(array(
                'msg' => 'Berhasil Melakukan Registrasi',
                'status' => $status
            ),$status);
        }else{
            $status = parent::HTTP_BAD_REQUEST;
            $this->response(array(
                'msg' => 'Gagal Melakukan Registrasi',
                'status' => $status
            ),$status);
        }
        
    }

    public function who_i_m_get()
    {
        $data   = $this->verify_request();
        if(count($data) > 0){
            $status = parent::HTTP_OK;
            $respose = ['status' => $status, 'msg' => $data];
            $this->response($respose , $status);
        }else{
            $this->response(array(
                'msg' => 'no data'
            ), parent::HTTP_NOT_FOUND);
        }
    }

    public function generateIdTerdaftar()
    {
        $data   = $this->m_core->autoNumber('id_terdaftar', 'tbl_user');
        $kode   = $data->result()[0]->maxKode;
        $nourut = (int) substr($kode, 9, 9);
        $nourut++;
        
        $char  = 'PNG-'.date('Y').'-';
        $newID = $char . sprintf('%05s', $nourut);
        return $newID;
    }





















    public function hello_get()
    {
        $token_data = array(
            'name' => 'wahyu alfarisi',
            'password' => 123,
            'email' => 'wahyualfarisi30@gmail.com'
        );
        $token = AUTHORIZATION::generateToken($token_data);
        $status = parent::HTTP_OK;
        $respose = ['status' => $status, 'token' => $token];
        $this->response($respose, $status);
    }

    public function testlogin_post()
    {
        $dummy_user = array(
            'username' => 'wahyualfarisi',
            'password' => '123',
        );
        $username = $this->input->post('username');
        $password = $this->input->post('password');

        if($dummy_user['username'] === $username && $dummy_user['password'] === $password ){
            $token = AUTHORIZATION::generateToken(array(
                'username' => $username
            ));

            $status = parent::HTTP_OK;
            $respose = ['status' => $status, 'token' => $token];
            $this->response($respose, $status);
        }else{
            $this->response(array(
                'msg' => 'Invalid Username and password'
            ), parent::HTTP_NOT_FOUND);
        }
    }

    public function get_data_post()
    {
        $data   = $this->verify_request();
        if(count($data) > 0){
            $status = parent::HTTP_OK;
            $respose = ['status' => $status, 'msg' => $data];
            $this->response($respose , $status);
        }else{
            $this->response(array(
                'msg' => 'no data'
            ), parent::HTTP_NOT_FOUND);
        }
       
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