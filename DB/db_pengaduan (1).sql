-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 15, 2019 at 03:58 PM
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
('2019-08/PGD00001', 'e04bc3d7e4c76da3b901d67dc639b4ee.jpg'),
('2019-08/PGD00001', 'eba0a0390afa333e033b571ee4320d53.jpg'),
('2019-08/PGD00001', 'd144b7022a0cac86e8faf7495c82713f.jpg'),
('2019-08/PGD00002', '79540b6ed9e1e6ca63bbf6e5c0891d9d.jpg'),
('2019-08/PGD00003', '3cba7861995fcf2955161ae7b14ecd45.jpg'),
('2019-08/PGD00003', '8d94d06a4e1a3ab26b218c077d63f269.jpg'),
('2019-08/PGD00003', '4df068567580b63f38a20a2e83fffef7.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_detail_laporan`
--

CREATE TABLE `tbl_detail_laporan` (
  `no_laporan` varchar(25) NOT NULL,
  `no_surat_keputusan` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_detail_laporan`
--

INSERT INTO `tbl_detail_laporan` (`no_laporan`, `no_surat_keputusan`) VALUES
('2019-08/LAP00001', 'SRT/KEP/2019-08001'),
('2019-08/LAP00001', 'SRT/KEP/2019-08002');

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
('DSP-2019-0800001', '2019-08/PGD00001', '2019-08-15', 1, 'Monitor', 'ini adalah catatan disposisi', 'selesai', 'bagio@gmail.com'),
('DSP-2019-0800002', '2019-08/PGD00002', '2019-08-15', 2, 'TindakLanjuti', 'ini adalah catatan disposisi', 'selesai', 'bagio@gmail.com'),
('DSP-2019-0800003', '2019-08/PGD00003', '2019-08-15', 1, 'Monitor', 'ini adalah catatan disposisi', 'selesai', 'bagio@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_laporan`
--

CREATE TABLE `tbl_laporan` (
  `no_laporan` varchar(25) NOT NULL,
  `tgl_pembuatan` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_laporan`
--

INSERT INTO `tbl_laporan` (`no_laporan`, `tgl_pembuatan`) VALUES
('2019-08/LAP00001', '2019-08-15');

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
('2019-08/PGD00001', 'PNG-2019-00002', 'KOMPAS TV', 'Penyelewengan Wartawan', '2019-08-15', 'ini adalah catatan pengaduan', 'selesai', 'Pengaduan Telah Selesai', 'sudah'),
('2019-08/PGD00002', 'PNG-2019-00002', 'TRANS TV', 'Penyelewengan Wartawan ', '2019-08-15', 'ini adalah catatan pengaduan', 'selesai', 'Pengaduan Telah Selesai', 'sudah'),
('2019-08/PGD00003', 'PNG-2019-00001', 'KOMPAS TV', 'Penyelewengan wartawan', '2019-08-15', 'ini adalah catatan pengaduan', 'selesai', 'Pengaduan Telah Selesai', 'belum');

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
('sekre@gmail.com', '123', 'Sekretaris', 'Dewan Pers', 'SEKRETARIS'),
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
  `tgl_keputusan` date NOT NULL,
  `status_surat` enum('tidak','ya') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_surat_keputusan`
--

INSERT INTO `tbl_surat_keputusan` (`no_surat_keputusan`, `nomor_disposisi`, `lampiran`, `perihal`, `isi_agenda`, `tgl_keputusan`, `status_surat`) VALUES
('SRT/KEP/2019-08001', 'DSP-2019-0800001', 'lampiran keputusan ', 'mengenai keputusan pengaduan', '<p>1.&nbsp;&nbsp;Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur beatae sit, ipsa laborum voluptatibus vero accusantium asperiores, corporis ad illum sequi illo blanditiis et optio eaque. Atque nulla quis beatae.</p><p>&nbsp;</p><p>2,&nbsp;Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur beatae sit, ipsa laborum voluptatibus vero accusantium asperiores, corporis ad illum sequi illo blanditiis et optio eaque. Atque nulla quis beatae.</p><p>&nbsp;</p><p>3.Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur beatae sit, ipsa laborum voluptatibus vero accusantium asperiores, corporis ad illum sequi illo blanditiis et optio eaque. Atque nulla quis beatae.</p><p>&nbsp;</p><p>4.Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur beatae sit, ipsa laborum voluptatibus vero accusantium asperiores, corporis ad illum sequi illo blanditiis et optio eaque. Atque nulla quis beatae.</p>', '2019-08-15', 'ya'),
('SRT/KEP/2019-08002', 'DSP-2019-0800002', 'ini adalah lampiran', 'ini perihal keputusan', '<p>1.&nbsp;Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur beatae sit, ipsa laborum voluptatibus vero accusantium asperiores, corporis ad illum sequi illo blanditiis et optio eaque. Atque nulla quis beatae.</p><p>&nbsp;</p><p>2.Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur beatae sit, ipsa laborum voluptatibus vero accusantium asperiores, corporis ad illum sequi illo blanditiis et optio eaque. Atque nulla quis beatae.</p>', '2019-08-15', 'ya'),
('SRT/KEP/2019-08003', 'DSP-2019-0800003', 'lampiran keputusan', 'surat keputusan dari dewan per', '<p>1.&nbsp;Lorem ipsum dolor kepada<strong> Wahyu Alfarisi</strong>&nbsp;sit amet consectetur adipisicing elit. Consectetur beatae sit, ipsa laborum voluptatibus vero accusantium asperiores, corporis ad illum sequi illo blanditiis et optio eaque. <em>Atque nulla quis beatae.</em></p><p>&nbsp;</p><p>2.&nbsp;Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur beatae sit, ipsa laborum voluptatibus vero accusantium asperiores, corporis ad illum sequi illo blanditiis et optio eaque. Atque nulla quis beatae.</p><p>&nbsp;</p><p>3,Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur beatae sit, ipsa laborum voluptatibus vero accusantium asperiores, corporis ad illum sequi illo blanditiis et optio eaque. Atque nulla quis beatae.</p>', '2019-08-15', 'tidak');

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
('PNG-2019-00001', 'devtoolind@gmail.com', 'wahyuais', 'wahyuais', 'Dev', 'Tool', '2019-08-07', 'true'),
('PNG-2019-00002', 'wahyualfarisi30@gmail.com', 'wahyuais', 'wahyuais', 'wahyu', 'alfarisi', '2019-08-07', 'true'),
('PNG-2019-00003', 'jojo@gmail.com', 'jojo123', 'jakarta', 'jojo', 'suherman', '2019-08-07', 'true');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_bukti_pengaduan`
--
ALTER TABLE `tbl_bukti_pengaduan`
  ADD KEY `id_pengaduan` (`id_pengaduan`);

--
-- Indexes for table `tbl_detail_laporan`
--
ALTER TABLE `tbl_detail_laporan`
  ADD KEY `no_laporan` (`no_laporan`),
  ADD KEY `no_surat_keputusan` (`no_surat_keputusan`);

--
-- Indexes for table `tbl_disposisi`
--
ALTER TABLE `tbl_disposisi`
  ADD PRIMARY KEY (`nomor_disposisi`),
  ADD KEY `id_pengaduan` (`id_pengaduan`),
  ADD KEY `ditugaskan_kpd` (`id_petugas`),
  ADD KEY `email` (`email_petugas`);

--
-- Indexes for table `tbl_laporan`
--
ALTER TABLE `tbl_laporan`
  ADD PRIMARY KEY (`no_laporan`);

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
  MODIFY `id_petugas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_bukti_pengaduan`
--
ALTER TABLE `tbl_bukti_pengaduan`
  ADD CONSTRAINT `tbl_bukti_pengaduan_ibfk_1` FOREIGN KEY (`id_pengaduan`) REFERENCES `tbl_pengaduan` (`id_pengaduan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_detail_laporan`
--
ALTER TABLE `tbl_detail_laporan`
  ADD CONSTRAINT `tbl_detail_laporan_ibfk_1` FOREIGN KEY (`no_surat_keputusan`) REFERENCES `tbl_surat_keputusan` (`no_surat_keputusan`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_detail_laporan_ibfk_2` FOREIGN KEY (`no_laporan`) REFERENCES `tbl_laporan` (`no_laporan`) ON DELETE CASCADE ON UPDATE CASCADE;

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
