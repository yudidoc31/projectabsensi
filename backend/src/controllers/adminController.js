const pool = require('../database');

exports.getMahasiswaSummary = async (req, res) => {
    try {
        const summary = {};
        
        // query of all mahasiswa to logically manipulate then below there
        let sql = "SELECT * FROM mahasiswa";
        let result = await pool.query(sql);
        summary.mahasiswaList = result.rows;
        
        // query of count mahasiswa
        sql = "SELECT count(id) as mahasiswacount FROM mahasiswa";
        result = await pool.query(sql);
        summary.mahasiswaCount = result.rows[0].mahasiswacount;

        
        // const today = new Date(); // USE CURRENT_DATE INSTEAD IN SQL
        // query of counting hadir and tidak hadir
        sql = "SELECT * FROM kehadiran WHERE tanggal = CURRENT_DATE";
        result = await pool.query(sql);
        summary.kehadiranList = result.rows;
        // assuming more efficient is manipulating data here in backend, instead of querying
        // count pagi, hadir list (joining) but brute forcing in O(n^2) not efficient enough
        console.log("CHECK POINTOO 1 pagiii", summary.kehadiranList);
        let hadirList = summary.kehadiranList.filter((kehadiran) => kehadiran.status === "pagi");
        let mahasiswaHadirList = [];
        for (let index in hadirList) {
            const input = summary.mahasiswaList.find((mahasiswa) => mahasiswa.id == hadirList[index].mhs_id);
            mahasiswaHadirList.push(input);
        }
        console.log("CHECK POINTOO 2 pagiii", mahasiswaHadirList);
        summary.pagi = {
            hadirList,
            mahasiswaHadirList,
            countHadir:  hadirList.length,
            countTidakHadir: summary.mahasiswaCount - hadirList.length,
        }
        console.log("pagiii beress");

        // count sore
        console.log("CHECK POINTOO 1 soreee", summary.kehadiranList);
        hadirList = summary.kehadiranList.filter((kehadiran) => kehadiran.status === "sore");
        mahasiswaHadirList = [];
        for (let index in hadirList) {
            const input = summary.mahasiswaList.find((mahasiswa) => mahasiswa.id == hadirList[index].mhs_id);
            mahasiswaHadirList.push(input);
        }
        console.log("CHECK POINTOO 2 soreee", mahasiswaHadirList);
        summary.sore = {
            hadirList,
            mahasiswaHadirList,
            countHadir:  hadirList.length,
            countTidakHadir: summary.mahasiswaCount - hadirList.length,
        }
        console.log("soreee beress");

        console.log(summary);
        
        return res.json(summary);
    } catch (error) {

    }
}

exports.editMahasiswa = async (req, res) => {

}

exports.deleteMahasiswa = async (req, res) => {

}