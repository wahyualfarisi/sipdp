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
    }

    public function login_petugas_post()
    {
        $email    = $this->input->post('email');
        $password = $this->input->post('password');
        $akses    = $this->input->post('akses');

        $where_login['email']    = $email;
        // $where_login['password'] = $password;

        /**
         * cek email and password if empty
         */

        if(empty($email) || empty($password) ){
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
                if(password_verify($password, $k->password ))
                {
                    $token = array(
                        'email'        => $k->email,
                        'nama_lengkap' => $k->nama_depan.' '.$k->nama_belakang,
                        'akses'        => $k->akses,
                    );

                    $generateToken = AUTHORIZATION::generateToken($token);

                    $status        = parent::HTTP_OK;

                    $this->response(array(
                        'status' => $status,
                        'token'  => $generateToken
                    ));

                }else{
                    $status = parent::HTTP_NOT_FOUND;

                    $this->response(array(
                        'status' => $status,
                        'msg' => 'Password Salah, Silahkan Ulangi Kembali'
                    ));
                }
            }    
        }else{
            $status = parent::HTTP_NOT_FOUND;
            $this->response(array(
                'msg'    => 'Email Dan Password Tidak Terdaftar',
                'status' => $cek->num_rows()
            ), $status);

        }

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

    function show_get()
    {
        $where_login['email']    = 'wahyualfarisi30@gmail.com';
        // $where_login['password'] = $password;

        $data = $this->m_core->get_where($this->t_petugas, $where_login);
        $this->response(array(
            'data' => $data->result()
        ), parent::HTTP_OK);
    }



}