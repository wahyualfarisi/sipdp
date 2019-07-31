-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 31, 2019 at 04:08 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_pengaduan`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_bukti_pengaduan`
--

CREATE TABLE `tbl_bukti_pengaduan` (
  `id_pengaduan` varchar(25) NOT NULL,
  `bukti_pengaduan` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_bukti_pengaduan`
--

INSERT INTO `tbl_bukti_pengaduan` (`id_pengaduan`, `bukti_pengaduan`) VALUES
('2019-07/PGD00001', 'e469c4528ac1313d661c4e6eab4e76ae.jpg'),
('2019-07/PGD00002', 'f766ee8070dc7c8229a8bae957006741.jpeg'),
('2019-07/PGD00002', '4d6c0bd6611189adf7ce9ce272559506.jpeg'),
('2019-07/PGD00003', 'fe769de5de68d288864b40aaff7e2bb4.jpeg'),
('2019-07/PGD00004', 'cfe7866660297ffa3b314d769375f158.png'),
('2019-07/PGD00004', '77614403b36aca0d54213bf969fccda5.png'),
('2019-07/PGD00004', '46dc290fa69b9409543c5b3a636e7fc6.png'),
('2019-07/PGD00005', '1306d24f5df262ffd69ce467142516c4.png'),
('2019-07/PGD00006', '6e0f5f7806a443ffbe635cbdb80eabff.png'),
('2019-07/PGD00007', 'ff080cdbb68d3663c06226f38724d283.jpeg'),
('2019-07/PGD00008', 'be06258aca004c4654de35fff14c0a28.jpeg'),
('2019-07/PGD00008', '5b598eac2767f5f03553df7896a15c8d.jpeg'),
('2019-07/PGD00008', '2a56bce74fa25b1af58fd1c2698c8a93.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_disposisi`
--

CREATE TABLE `tbl_disposisi` (
  `nomor_disposisi` varchar(30) NOT NULL,
  `id_pengaduan` varchar(30) NOT NULL,
  `tgl_disposisi` date NOT NULL,
  `id_petugas` int(11) NOT NULL,
  `jenis_tugas` enum('Kordinasikan','Monitor','BeriPenjelasan','TindakLanjuti','Diketahui','Laksanakan','Tanggapi','Agendakan','File') NOT NULL,
  `catatan_disposisi` text NOT NULL,
  `status_disposisi` enum('','proses','tindaklanjuti','selesai') NOT NULL,
  `email_petugas` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_disposisi`
--

INSERT INTO `tbl_disposisi` (`nomor_disposisi`, `id_pengaduan`, `tgl_disposisi`, `id_petugas`, `jenis_tugas`, `catatan_disposisi`, `status_disposisi`, `email_petugas`) VALUES
('DSP-2019-0700001', '2019-07/PGD00001', '2019-07-29', 3, 'TindakLanjuti', 'good', 'selesai', 'bagio@gmail.com'),
('DSP-2019-0700002', '2019-07/PGD00002', '2019-07-29', 5, 'Diketahui', 'test', 'selesai', 'bagio@gmail.com'),
('DSP-2019-0700003', '2019-07/PGD00003', '2019-07-29', 5, 'Kordinasikan', 'TEST', 'selesai', 'bagio@gmail.com'),
('DSP-2019-0700004', '2019-07/PGD00004', '2019-07-30', 8, 'Monitor', 'ini catatan', 'selesai', 'bagio@gmail.com'),
('DSP-2019-0700005', '2019-07/PGD00005', '2019-07-30', 3, 'Monitor', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur dolorum neque temporibus, ea recusandae illo in sed, ducimus vel labore vero atque ipsum magnam eaque totam. Aut nihil vero odit!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur dolorum neque temporibus, ea recusandae illo in sed, ducimus vel labore vero atque ipsum magnam eaque totam. Aut nihil vero odit!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur dolorum neque temporibus, ea recusandae illo in sed, ducimus vel labore vero atque ipsum magnam eaque totam. Aut nihil vero odit!', 'selesai', 'bagio@gmail.com'),
('DSP-2019-0700006', '2019-07/PGD00006', '2019-07-30', 2, 'Kordinasikan', 'tyryr', 'selesai', 'bagio@gmail.com'),
('DSP-2019-0700007', '2019-07/PGD00007', '2019-07-31', 1, 'Kordinasikan', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'selesai', 'bagio@gmail.com'),
('DSP-2019-0700008', '2019-07/PGD00008', '2019-07-31', 2, 'Monitor', 'ini catatan', 'selesai', 'bagio@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pengaduan`
--

CREATE TABLE `tbl_pengaduan` (
  `id_pengaduan` varchar(25) NOT NULL,
  `id_terdaftar` varchar(30) NOT NULL,
  `nama_perusahaan_pers` varchar(50) NOT NULL,
  `judul_berita` varchar(100) NOT NULL,
  `edisi_penerbitan` date NOT NULL,
  `catatan` text NOT NULL,
  `status_pengaduan` enum('','terkirim','diterima','proses','selesai') NOT NULL,
  `deskripsi_status` text NOT NULL,
  `dilihat` enum('','sudah','belum') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_pengaduan`
--

INSERT INTO `tbl_pengaduan` (`id_pengaduan`, `id_terdaftar`, `nama_perusahaan_pers`, `judul_berita`, `edisi_penerbitan`, `catatan`, `status_pengaduan`, `deskripsi_status`, `dilihat`) VALUES
('2019-07/PGD00001', '2019/001', 'TRIBU NEWS', 'Penyelewengan Wartawan', '2019-09-09', 'Ini Catatan', 'selesai', 'Pengaduan Telah Selesai', 'belum'),
('2019-07/PGD00002', '2019-001', 'KOMPAS TV', 'Penyelewengan Wartawan', '2019-09-08', 'ini Catatan', 'selesai', 'Pengaduan Telah Selesai', 'sudah'),
('2019-07/PGD00003', '2019-001', 'KOMPAS TV', 'TEST', '2019-09-08', 'TEST', 'selesai', 'Pengaduan Telah Selesai', 'sudah'),
('2019-07/PGD00004', '2019-001', 'KOMPAS TV', 'Penyelewengan WArtawan ', '2019-09-09', 'Ini catatan', 'selesai', 'Pengaduan Telah Selesai', 'sudah'),
('2019-07/PGD00005', '2019-001', 'TRANS TV', 'Pelanggaran Yang menyagkut dengan Hak Asasi Manusia', '2019-09-18', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error vero quis unde veritatis iste, illo beatae. Labore, cupiditate fugit harum vero excepturi quo maiores beatae ab velit accusamus fuga dolor.\r\nLorem ipsum dolor sit amet consectetur adipisicing elit. Error vero quis unde veritatis iste, illo beatae. Labore, cupiditate fugit harum vero excepturi quo maiores beatae ab velit accusamus fuga dolor.', 'selesai', 'Pengaduan Telah Selesai', 'sudah'),
('2019-07/PGD00006', '2019-001', 'sdasd', 'dasd', '0000-00-00', 'asdas', 'selesai', 'Pengaduan Telah Selesai', 'sudah'),
('2019-07/PGD00007', 'a01', 'TRANS TV', 'penyelewengan Wartawan', '2019-07-31', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\r\n\r\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'selesai', 'Pengaduan Telah Selesai', 'sudah'),
('2019-07/PGD00008', '223', 'TRANS TV', 'Ini judul berita', '2019-07-31', 'ini catatan', 'selesai', 'Pengaduan Telah Selesai', 'sudah');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_penugasan`
--

CREATE TABLE `tbl_penugasan` (
  `id_petugas` int(11) NOT NULL,
  `bagian` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_penugasan`
--

INSERT INTO `tbl_penugasan` (`id_petugas`, `bagian`) VALUES
(1, 'Ketua Dewan Pers'),
(2, 'Wakil Ketua Dewan Pers'),
(3, 'Komisi Pengaduan & Penegakan Etika Pers'),
(4, 'Komisi Hukum & Perundang-undangan'),
(5, 'Komisi Hubungan Antar Lembaga & Luar Negri'),
(6, 'Komisi Penelitian, Pendataan & Ratifikasi Pers'),
(7, 'Komisi Pelatihan & Pengembangan Profesi'),
(8, 'Komisi Pemberdayaan Organisasi'),
(9, 'Komisi Pendanaan & Saranan Organisasi'),
(10, 'Kepala Sekretariat');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_petugas`
--

CREATE TABLE `tbl_petugas` (
  `email_petugas` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nama_depan` varchar(25) NOT NULL,
  `nama_belakang` varchar(25) NOT NULL,
  `akses` enum('','TU','KETUA','KOMISI','SEKRETARIS') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_petugas`
--

INSERT INTO `tbl_petugas` (`email_petugas`, `password`, `nama_depan`, `nama_belakang`, `akses`) VALUES
('bagio@gmail.com', '123', 'Subagi', 'Bagio', 'TU'),
('rudi@gmail.com', 'rudi', 'Rudi', 'Setiawan', 'KOMISI'),
('wahyualfarisi30@gmail.com', '123', 'Wahyu', 'Alfarisi', 'KETUA');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_surat_keputusan`
--

CREATE TABLE `tbl_surat_keputusan` (
  `no_surat_keputusan` varchar(50) NOT NULL,
  `nomor_disposisi` varchar(30) NOT NULL,
  `lampiran` varchar(30) NOT NULL,
  `perihal` varchar(30) NOT NULL,
  `isi_agenda` text NOT NULL,
  `tgl_keputusan` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_surat_keputusan`
--

INSERT INTO `tbl_surat_keputusan` (`no_surat_keputusan`, `nomor_disposisi`, `lampiran`, `perihal`, `isi_agenda`, `tgl_keputusan`) VALUES
('SRT/KEP/2019-07001', 'DSP-2019-0700001', 'ini lampiran', 'ini dae', 'rest', '2019-07-30'),
('SRT/KEP/2019-07002', 'DSP-2019-0700001', 'ini lampiran', 'ini dae', 'rest', '2019-07-30'),
('SRT/KEP/2019-07003', 'DSP-2019-0700001', 'ini lampiran', 'ini dae', 'rest', '2019-07-30'),
('SRT/KEP/2019-07004', 'DSP-2019-0700002', 'ini lampiran', 'ini perihal', 'ini isi agenda', '2019-07-30'),
('SRT/KEP/2019-07005', 'DSP-2019-0700003', 'ini lampiran', 'ini perihal', 'ini isi agenda', '2019-07-30'),
('SRT/KEP/2019-07006', 'DSP-2019-0700004', 'ini lampiran ', 'ini perihal', 'ini isi agenda', '2019-07-30'),
('SRT/KEP/2019-07007', 'DSP-2019-0700005', 'ini lampiran', 'ini perihal', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur dolorum neque temporibus, ea recusandae illo in sed, ducimus vel labore vero atque ipsum magnam eaque totam. Aut nihil vero odit!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur dolorum neque temporibus, ea recusandae illo in sed, ducimus vel labore vero atque ipsum magnam eaque totam. Aut nihil vero odit!', '2019-07-30'),
('SRT/KEP/2019-07008', 'DSP-2019-0700001', 'ss', 'ss', 'ss', '2019-07-30'),
('SRT/KEP/2019-07009', 'DSP-2019-0700001', 's', 's', 's', '2019-07-30'),
('SRT/KEP/2019-07010', 'DSP-2019-0700001', 's', 's', 's', '2019-07-30'),
('SRT/KEP/2019-07011', 'DSP-2019-0700001', 's', 's', 's', '2019-07-30'),
('SRT/KEP/2019-07012', 'DSP-2019-0700006', 'ini lampiran', 'ini perihal', 'ini agenda', '2019-07-31'),
('SRT/KEP/2019-07013', 'DSP-2019-0700007', 'ini lampiran', 'ini perihal', 'ini agenda', '2019-07-31'),
('SRT/KEP/2019-07014', 'DSP-2019-0700008', 'ini lampiran', 'ini perihal', 'ini isi agenda', '2019-07-31');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id_terdaftar` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `alamat` text NOT NULL,
  `nama_depan` varchar(25) NOT NULL,
  `nama_belakang` varchar(25) NOT NULL,
  `tgl_terdaftar` date NOT NULL,
  `status` enum('true','false') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id_terdaftar`, `email`, `password`, `alamat`, `nama_depan`, `nama_belakang`, `tgl_terdaftar`, `status`) VALUES
('2019-001', 'meyda@gmail.com', '123', 'jakarta', 'Meyda', '', '2019-07-07', 'true'),
('2019/001', 'rama@gmail.com', '12345', 'jl. Jakarta Pusat', 'Rama', 'Adhista', '2019-07-18', 'true'),
('223', 'mfrislian@gmail.com', '123', '123', 'Meyda', 'Mariam', '2019-07-31', 'true'),
('308', 'devtoolind@gmail.com', '123', '123', 'wahyu', 'alfarisi', '2019-07-30', 'true'),
('a01', 'zuhri@gmail.com', '123', 'Jakarta RAya', 'Xuhri', 'Amed', '2019-07-21', 'true'),
('a0122', 'hilan@gmail.com', '123', 'Bekasi Raya', 'Hilam', 'Nur', '2019-07-15', 'true');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_bukti_pengaduan`
--
ALTER TABLE `tbl_bukti_pengaduan`
  ADD KEY `id_pengaduan` (`id_pengaduan`);

--
-- Indexes for table `tbl_disposisi`
--
ALTER TABLE `tbl_disposisi`
  ADD PRIMARY KEY (`nomor_disposisi`),
  ADD KEY `id_pengaduan` (`id_pengaduan`),
  ADD KEY `ditugaskan_kpd` (`id_petugas`),
  ADD KEY `email` (`email_petugas`);

--
-- Indexes for table `tbl_pengaduan`
--
ALTER TABLE `tbl_pengaduan`
  ADD PRIMARY KEY (`id_pengaduan`),
  ADD KEY `email_pengadu` (`id_terdaftar`);

--
-- Indexes for table `tbl_penugasan`
--
ALTER TABLE `tbl_penugasan`
  ADD PRIMARY KEY (`id_petugas`);

--
-- Indexes for table `tbl_petugas`
--
ALTER TABLE `tbl_petugas`
  ADD PRIMARY KEY (`email_petugas`);

--
-- Indexes for table `tbl_surat_keputusan`
--
ALTER TABLE `tbl_surat_keputusan`
  ADD PRIMARY KEY (`no_surat_keputusan`),
  ADD KEY `nomor_disposisi` (`nomor_disposisi`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id_terdaftar`),
  ADD KEY `email_pengadu` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_penugasan`
--
ALTER TABLE `tbl_penugasan`
  MODIFY `id_petugas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_bukti_pengaduan`
--
ALTER TABLE `tbl_bukti_pengaduan`
  ADD CONSTRAINT `tbl_bukti_pengaduan_ibfk_1` FOREIGN KEY (`id_pengaduan`) REFERENCES `tbl_pengaduan` (`id_pengaduan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_disposisi`
--
ALTER TABLE `tbl_disposisi`
  ADD CONSTRAINT `tbl_disposisi_ibfk_1` FOREIGN KEY (`id_petugas`) REFERENCES `tbl_penugasan` (`id_petugas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_disposisi_ibfk_2` FOREIGN KEY (`id_pengaduan`) REFERENCES `tbl_pengaduan` (`id_pengaduan`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_disposisi_ibfk_3` FOREIGN KEY (`email_petugas`) REFERENCES `tbl_petugas` (`email_petugas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_pengaduan`
--
ALTER TABLE `tbl_pengaduan`
  ADD CONSTRAINT `tbl_pengaduan_ibfk_1` FOREIGN KEY (`id_terdaftar`) REFERENCES `tbl_user` (`id_terdaftar`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_surat_keputusan`
--
ALTER TABLE `tbl_surat_keputusan`
  ADD CONSTRAINT `tbl_surat_keputusan_ibfk_1` FOREIGN KEY (`nomor_disposisi`) REFERENCES `tbl_disposisi` (`nomor_disposisi`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
